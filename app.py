from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import requests
import tensorflow as tf

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3000/"}})
# df = pd.read_csv('../anime_data/anime.csv', low_memory=True)
# df = df.replace("Unknown", np.nan)

# def getAnimeName(anime_id):
#     try:
#         name = df[df.anime_id == anime_id].eng_version.values[0]
#         if name is np.nan:
#             name = df[df.anime_id == anime_id].Name.values[0]
#     except:
#         print('error')
#     return name

# df['anime_id'] = df['MAL_ID']
# df["eng_version"] = df['English name']
# df['eng_version'] = df.anime_id.apply(lambda x: getAnimeName(x))

# df.sort_values(by=['Score'], 
#                inplace=True,
#                ascending=False, 
#                kind='quicksort',
#                na_position='last')

# df = df[["anime_id", "eng_version", 
#          "Score", "Genres", "Episodes", 
#          "Type", "Premiered", "Members"]]

# def getAnimeFrame(anime):
#     if isinstance(anime, int):
#         return df[df.anime_id == anime]
#     if isinstance(anime, str):
#         return df[df.eng_version == anime]

# cols = ["MAL_ID", "Name", "Genres", "sypnopsis"]
# sypnopsis_df = pd.read_csv('../anime_data/anime_with_synopsis.csv', usecols=cols)

# def getSypnopsis(anime):
#     if isinstance(anime, int):
#         return sypnopsis_df[sypnopsis_df.MAL_ID == anime].sypnopsis.values[0]
#     if isinstance(anime, str):
#         return sypnopsis_df[sypnopsis_df.Name == anime].sypnopsis.values[0]
    
# Your MAL API client ID
client_id = 'e57008af22cb2ae7d66b2147334d9ba9'

headers = {
    'X-MAL-CLIENT-ID': client_id
}

# Load the pre-trained model
model = tf.keras.models.load_model('./not_for_git/trained_models/epoch_25.h5')

def extract_weights(name, model):
    weight_layer = model.get_layer(name)
    weights = weight_layer.get_weights()[0]
    weights = weights / np.linalg.norm(weights, axis=1).reshape((-1, 1))
    return weights

# Load mappings
with open('./id_weights.pkl', 'rb') as file:
    id_weights = pickle.load(file)

anime_ids = list(id_weights.keys())

# Extract weights
anime_weights = extract_weights('anime_embedding', model)
@app.route('/')
def hello():
    return 'Hello World'

def get_anime_details(anime_id):
    
    try:
        anime_details = f'https://api.myanimelist.net/v2/anime/{anime_id}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,status,genres,my_list_status,num_episodes,start_season,rating,pictures,background'
        response = requests.get(anime_details, headers=headers)
        
        if response.status_code == 200:
            anime_result = response.json()
    except:
        print(f'Error fetching anime details:')

    
    return anime_result
    

@app.route('/find_similar', methods=['POST'])
def find_similar():
    data = request.json
    anime_name = data.get('anime_name')

    # Search for the anime on MAL to get the ID
    search_url = f"https://api.myanimelist.net/v2/anime?q={anime_name}&limit=1"

    response = requests.get(search_url, headers=headers)
    
    if response.status_code == 200:
        search_results = response.json()
        if len(search_results['data']) == 0:
            return jsonify({"error": "Anime not found"}), 404

        mal_id = search_results['data'][0]['node']['id']
        
        # Find similar animes using the model
        encoded_index = id_weights.get(mal_id)
        if encoded_index is None:
            return jsonify({"error": "Anime not found in the model"}), 404

        dists = np.dot(anime_weights, id_weights[mal_id])
        sorted_dists = np.argsort(dists)[-11:]  # Top 10 similar animes
        closest_animes = [
            {
                "anime_details": get_anime_details(anime_ids[i]), 
                "similarity": float(dists[i])
             }
            for i in sorted_dists if anime_ids[i] != mal_id
        ]
        
        closest_animes = sorted(closest_animes, key=lambda x: x['similarity'], reverse=True)
        return jsonify({"similar_animes": closest_animes})
    else:
        return jsonify({"error": "Failed to search anime on MAL"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
