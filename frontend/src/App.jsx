import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useLenis } from './hooks'
import SearchInput from './components/search/SearchInput'
import MediaTypeToggle from './components/search/MediaTypeToggle'
import SearchButton from './components/search/SearchButton'
import SearchedAnime from './components/results/SearchedAnime'
import ResultsGrid from './components/results/ResultsGrid'

function App() {
  const [animeName, setAnimeName] = useState('')
  const [similarAnimes, setSimilarAnimes] = useState([])
  const [searchedAnime, setSearchedAnime] = useState(null)
  const [mediaType, setMediaType] = useState('tv')
  const [isLoading, setIsLoading] = useState(false)

  // Initialize smooth scrolling
  useLenis()

  useEffect(() => {
    // Wake up the backend server
    fetch('http://127.0.0.1:5000/')
      .catch(() => {
        // Silently handle the wake-up call
      })
  }, [])

  const handleSearch = async () => {
    if (!animeName.trim()) return

    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
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
              <SearchInput
                value={animeName}
                onChange={setAnimeName}
                onSubmit={handleSearch}
                isLoading={isLoading}
              />

              <MediaTypeToggle
                selected={mediaType}
                onChange={setMediaType}
              />

              <SearchButton
                onClick={handleSearch}
                isLoading={isLoading}
                disabled={!animeName.trim()}
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <SearchedAnime searchedAnime={searchedAnime} />
        <ResultsGrid similarAnimes={similarAnimes} />
      </main>
    </div>
  )
}

export default App