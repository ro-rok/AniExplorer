from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import requests
import tensorflow as tf

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Your MAL API client ID
client_id = 'API_ID'

headers = {
    'X-MAL-CLIENT-ID': client_id
}

# # Load the pre-trained model
# model = tf.keras.models.load_model('./not_for_git/trained_models/epoch_25.h5')

# def extract_weights(name, model):
#     weight_layer = model.get_layer(name)
#     weights = weight_layer.get_weights()[0]
#     weights = weights / np.linalg.norm(weights, axis=1).reshape((-1, 1))
#     return weights

# Load mappings
with open('./id_weights.pkl', 'rb') as file:
    id_weights = pickle.load(file)

anime_ids = list(id_weights.keys())

# Extract weights
# anime_weights = extract_weights('anime_embedding', model)
@app.route('/')
def hello():
    return 'Hello World'

def get_anime_details(anime_id):
    
    try:
        anime_details = f'https://api.myanimelist.net/v2/anime/{anime_id}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,status,genres,my_list_status,num_episodes,start_season,rating,pictures,background,media_type'
        response = requests.get(anime_details, headers=headers)
        
        if response.status_code == 200:
            anime_result = response.json()
    except:
        print(f'Error fetching anime details:')

    
    return anime_result
    

@app.route('/find_similar', methods=['POST'])
def find_similar():
    mal_id = ""
    data = request.json
    anime_name = data.get('anime_name')
    media_type = data.get('media_type').lower()
    
    print(media_type)    
    # Search for the anime on MAL to get the ID
    search_url = f"https://api.myanimelist.net/v2/anime?q={anime_name}&limit=10&fields=media_type,id"

    response = requests.get(search_url, headers=headers)
    
    if response.status_code == 200:
        search_results = response.json()
        if len(search_results['data']) == 0:
            return jsonify({"error": "Anime not found"}), 404
        
        for node in search_results['data']:
            print(node)
            if node['node']['media_type'] == media_type:
                mal_id = node['node']['id']
                print(node)
                break
            
        
        # Find similar animes using the model
        if not mal_id:
            mal_id = search_results['data'][0]['node']['id']
        encoded_index = id_weights.get(mal_id)
        if encoded_index is None:
            return jsonify({"error": "Anime not found in the model"}), 404
        
        dists = np.dot(list(id_weights.values()), id_weights[mal_id])
        sorted_dists = np.argsort(dists)[-10:]  # Top 10 similar animes
        closest_animes = []
        
        for i in sorted_dists:
            closest_animes.append({
                    "anime_details": get_anime_details(anime_ids[i]), 
                    "similarity": float(dists[i])
            })
            
        closest_animes = sorted(closest_animes, key=lambda x: x['similarity'], reverse=True)
        [print(anime['anime_details']['id']) for anime in closest_animes]
        return jsonify({"similar_animes": closest_animes[1:], "anime_searched": closest_animes[0]})
    else:
        return jsonify({"error": "Failed to search anime on MAL"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
