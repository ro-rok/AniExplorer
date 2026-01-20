import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useLenis } from './hooks'
import HeroSection from './components/hero/HeroSection'
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

  const handleClearSearch = () => {
    setAnimeName('')
    setSimilarAnimes([])
    setSearchedAnime(null)
    setMediaType('tv')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Toaster position="top-right" />
      
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Hero Section */}
      <HeroSection />

      <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Search Section */}
        <section id="search-section" className="mb-12 lg:mb-16">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Find Your Next Anime
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-6 lg:mb-8 max-w-3xl mx-auto">
              Discover anime similar to your favorites using machine learning
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8 lg:mb-12">
            <div className="card-dark rounded-lg p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 lg:space-y-6">
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
        </section>

        {/* Results Section */}
        <SearchedAnime 
          searchedAnime={searchedAnime} 
          onClearSearch={handleClearSearch}
        />
        <ResultsGrid 
          similarAnimes={similarAnimes} 
          searchedAnime={searchedAnime}
          onClearSearch={handleClearSearch}
        />
      </main>
    </div>
  )
}

export default App