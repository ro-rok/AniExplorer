import React, { useState, useEffect } from 'react';

function App() {
  const [animeName, setAnimeName] = useState('');
  const [similarAnimes, setSimilarAnimes] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/find_similar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ anime_name: animeName }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data['similar_animes']);
        setSimilarAnimes(data['similar_animes']);
      } else {
        alert(data.error);
        setSimilarAnimes([]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Anime Recommendation System</h1>
      <input
        type="text"
        value={animeName}
        onChange={(e) => setAnimeName(e.target.value)}
        placeholder="Enter anime name"
      />
      <button onClick={handleSearch}>
        Find Similar Animes
      </button>

      {similarAnimes.length > 0 && (
        <div id="anime-recom-wrapper">
          <h2>Similar Animes</h2>
          <div id="anime-recom">
            {similarAnimes.map((anime, index) => {
              return <div id='anime-wrapper' key={index}>
                <AnimeChild animeDetails={anime.anime_details} sim={anime.similarity} />
              </div>
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function AnimeChild({ animeDetails, sim }) {
  return <div id="anime-details">
    <h2 id="anime-title">{animeDetails.title} - {(sim * 100).toFixed(2)}%</h2>
    <div id="image-wrapper">
      <img src={animeDetails.main_picture.medium} />
    </div>
  </div>
}

export default App;
