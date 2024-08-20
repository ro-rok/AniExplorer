import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [animeName, setAnimeName] = useState('');
  const [similarAnimes, setSimilarAnimes] = useState([]);
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [pageLoad, setPageLoading] = useState()
  const [mediaType, setMediaType] = useState('tv');


  useEffect(() => {
    console.log("page loading");
  }, [pageLoad])

  const handleRadioClick = async (e) => {
    setMediaType(e.target.id);

    var radios = e.target.offsetParent.querySelectorAll('.radio');
    console.log(radios);
    radios.forEach(radio => {
      radio.classList.remove('selected');
    });

    e.target.classList.add('selected');

  }

  const handleSearch = async () => {
    setPageLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:5000/find_similar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ anime_name: animeName, media_type: mediaType }),
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
      <div id="background">
        <div id="bg-screen">

        </div>
        <img src="https://images5.alphacoders.com/118/1184726.jpg" />
      </div>
      <h1 id="page-title">AnieXplorer</h1>
      <h1>Discover Your Next Anime Adventure</h1>
      <input
        type="text"
        value={animeName}
        id="anime-input"
        onChange={(e) => setAnimeName(e.target.value)}
        placeholder="Enter anime name"
      />
      <div id="media-type">
        {/* <div onClick={handleRadioClick} id="tv" className='radio selected'>
          <h1>TV</h1>
        </div> */}
        <button id='tv' className='radio selected' onClick={handleRadioClick}>
          <span>TV</span>
        </button>
        <button id='movie' className='radio' onClick={handleRadioClick}>
          <span>Movie</span>
        </button>
        {/* <div onClick={handleRadioClick} id="movie" className='radio'>
          <h1>Movie</h1>
        </div> */}
      </div>
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
          <div id="background-data">
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
        <div>
          <h4 className='label'>Media Type </h4>
          <p>{animeDetails.media_type.charAt(0).toUpperCase() + animeDetails.media_type.slice(1)}</p>
        </div>
      </div>
    </div>
  </div>
}

function AnimeChild({ animeDetails, sim }) {
  console.log(animeDetails)
  return <div id="sug-anime-wrapper">
    <div id="anime-headings">
      <h2 id="anime-title">{animeDetails.title}</h2>
      <h5>Similarity : {(sim * 100).toFixed(2)}%</h5>
    </div>
    <div id="anime-details">
      <div id="image-wrapper">
        <img src={animeDetails.main_picture.medium} />
      </div>

      <div id="anime-data">
        <div id="anime-data-wrapper">
          <div id="alt-titles">
            {animeDetails['alternative_titles']['en'] ? <h3>{animeDetails['alternative_titles']['en']}</h3> : <h3>{animeDetails.title}</h3>}
          </div>
          <div id="synopsis">
            <h4 className='label'>Synopsis</h4>
            <p>{animeDetails.synopsis}</p>
          </div>
          <div id="genres">
            <h4 className='label'>Genres</h4>
            <span>
              {animeDetails.genres.map((genre, index) => {
                return <p key={index}>{genre.name}&nbsp;</p>
              })}
            </span>
          </div>
          <div id="extra-data">
            <div>
              <h4 className='label'>Rating</h4>
              <p>{animeDetails.mean}</p>
            </div>
            <div>
              <h4 className='label'>Popularity</h4>
              <p>{animeDetails.popularity}</p>
            </div>
            <div>
              <h4 className='label'>Rank</h4>
              <p>{animeDetails.rank}</p>
            </div>
            <div>
              <h4 className='label'>Media Type</h4>
              <p>{animeDetails.media_type.charAt(0).toUpperCase() + animeDetails.media_type.slice(1)}</p>
            </div>

          </div>
          <div id="link">
            <a target='blank' href={`https://myanimelist.net/anime/${animeDetails['id']}`}>Read more on My Anime List</a>
          </div>
        </div>

      </div>
    </div>

  </div>

}

export default App;
