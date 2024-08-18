import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [animeName, setAnimeName] = useState('');
  const [similarAnimes, setSimilarAnimes] = useState([]);
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [pageLoad, setPageLoading] = useState()


  useEffect(() => {
    console.log("page loading");
  }, [pageLoad])

  const handleSearch = async () => {
    setPageLoading(true)
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
        setPageLoading(false)
        setSearchedAnime(data['anime_searched'])
        setSimilarAnimes(data['similar_animes']);
      } else {
        alert(data.error);
        setPageLoading(false)
        setSimilarAnimes([]);
      }
    } catch (error) {
      setPageLoading(false)
      console.error('Error:', error);
    }
  };

  return (
    <div id='anime-recommender'>
      <h1 id="page-title">Anime Recommendation System</h1>
      <input
        type="text"
        value={animeName}
        id="anime-input"
        onChange={(e) => setAnimeName(e.target.value)}
        placeholder="Enter anime name"
      />
      {pageLoad ? <p>Model is running</p> :
        <div id="button" onClick={handleSearch}>
          <p>Find Similar Animes</p>
          <div id="button-bg"><p>Run the model</p></div>
        </div>
      }

      {similarAnimes.length > 0 && (
        <div id="anime-recom-wrapper">
          <h1>Anime searched for:</h1>
          <div id="searched-anime-wrapper">
            <SearchedAnime animeDetails={searchedAnime.anime_details} />
          </div>

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

function SearchedAnime({ animeDetails }) {
  console.log(animeDetails);
  return <div id="searched-anime-details">
    <div id='image-wrapper'>
      <img src={animeDetails.main_picture.medium} alt={animeDetails.title} />
    </div>
    <div id="anime-details">
      <h1>{animeDetails.title}</h1>
      <h4 className="label">Synopsis</h4>
      <p>{animeDetails.synopsis}</p>
      {
        animeDetails.background ?
          <div id="background">
            <h4 className='label'>Background</h4>
            <p>{animeDetails.background}</p> </div> : ''
      }

      <h4 className='label'>Genres</h4>
      <div id="genres">
        {animeDetails.genres.map((genre, index) => {
          return <div key={index} id="genre">
            <p>{genre.name}&nbsp;&nbsp;</p>
          </div>
        })}
      </div>
      <div id='footer'>
        <div>
          <h4 className='label'>Rank</h4>
          <p>{animeDetails.rank}</p>
        </div>
        <div>
          <h4 className='label'>Popularity </h4>
          <p>{animeDetails.rank}</p>
        </div>
        <div>
          <h4 className='label'>Rating </h4>
          <p>{animeDetails.rating}</p>
        </div>
      </div>
    </div>
  </div>
}

function AnimeChild({ animeDetails, sim }) {
  return <div id="anime-details">
    <div id="anime-headings">
      <h2 id="anime-title">{animeDetails.title}</h2>
      <h5>similarity percent - {(sim * 100).toFixed(2)}%</h5>
    </div>
    <div id="image-wrapper">
      <img src={animeDetails.main_picture.medium} />
    </div>
  </div>
}

export default App;
