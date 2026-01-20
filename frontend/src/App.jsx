import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Lenis from 'lenis'

function App() {
  const [animeName, setAnimeName] = useState('')
  const [similarAnimes, setSimilarAnimes] = useState([])
  const [searchedAnime, setSearchedAnime] = useState(null)
  const [mediaType, setMediaType] = useState('tv')

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Wake up the backend server
    fetch('http://127.0.0.1:5000/')
      .catch(() => {
        // Silently handle the wake-up call
      })

    // Cleanup function to destroy Lenis instance
    return () => {
      lenis.destroy()
    }
  }, [])

  const handleSearch = async () => {
    if (!animeName.trim()) return

    try {
      const response = await fetch('http://127.0.0.1:5000/find_similar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          anime_name: animeName,
          media_type: mediaType
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSimilarAnimes(data.similar_animes || [])
        setSearchedAnime(data.anime_searched || null)
      } else {
        console.error('Failed to fetch similar animes')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Toaster position="top-right" />
      
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            AniExplorer
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Discover anime similar to your favorites using machine learning
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <div className="space-y-4">
              <div>
                <label htmlFor="anime-search" className="block text-sm font-medium text-slate-300 mb-2">
                  Enter an anime name
                </label>
                <input
                  id="anime-search"
                  type="text"
                  value={animeName}
                  onChange={(e) => setAnimeName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Attack on Titan, Naruto, One Piece..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-300">Media Type:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setMediaType('tv')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mediaType === 'tv'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    TV Series
                  </button>
                  <button
                    onClick={() => setMediaType('movie')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mediaType === 'movie'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Movie
                  </button>
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={!animeName.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                Find Similar Anime
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {searchedAnime && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Search Result</h2>
            <div className="max-w-md mx-auto bg-slate-800 rounded-lg overflow-hidden shadow-xl">
              <img
                src={searchedAnime.anime_details.main_picture?.medium}
                alt={searchedAnime.anime_details.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{searchedAnime.anime_details.title}</h3>
                <p className="text-slate-300 text-sm mb-2">
                  Rating: {searchedAnime.anime_details.mean || 'N/A'}/10
                </p>
                <a
                  href={`https://myanimelist.net/anime/${searchedAnime.anime_details.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  View on MyAnimeList
                </a>
              </div>
            </div>
          </div>
        )}

        {similarAnimes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Similar Anime</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarAnimes.map((anime) => (
                <div key={anime.anime_details.id} className="bg-slate-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                  <img
                    src={anime.anime_details.main_picture?.medium}
                    alt={anime.anime_details.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{anime.anime_details.title}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-400 font-medium">
                        {(anime.similarity * 100).toFixed(1)}% match
                      </span>
                      <span className="text-slate-300 text-sm">
                        {anime.anime_details.mean || 'N/A'}/10
                      </span>
                    </div>
                    <a
                      href={`https://myanimelist.net/anime/${anime.anime_details.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App