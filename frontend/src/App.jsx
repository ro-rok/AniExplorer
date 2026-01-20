import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useLenis } from './hooks'
import { preloadCriticalImages } from './utils/imagePreloader'
import ErrorBoundary from './components/common/ErrorBoundary'
import AnimationErrorBoundary from './components/common/AnimationErrorBoundary'
import HeroSection from './components/hero/HeroSection'
import SearchInput from './components/search/SearchInput'
import MediaTypeToggle from './components/search/MediaTypeToggle'
import SearchButton from './components/search/SearchButton'
import SearchedAnime from './components/results/SearchedAnime'
import ResultsGrid from './components/results/ResultsGrid'
import ModelShowcase from './components/model/ModelShowcase'

function App() {
  const [animeName, setAnimeName] = useState('')
  const [similarAnimes, setSimilarAnimes] = useState([])
  const [searchedAnime, setSearchedAnime] = useState(null)
  const [mediaType, setMediaType] = useState('tv')
  const [isLoading, setIsLoading] = useState(false)

  // Initialize smooth scrolling
  useLenis()

  useEffect(() => {
    // Preload critical images
    preloadCriticalImages()
      .then(() => {
        console.log('Critical images preloaded successfully')
      })
      .catch((error) => {
        console.warn('Some critical images failed to preload:', error)
      })

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
      <a 
        href="#main-content" 
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Hero Section with Error Boundary */}
      <ErrorBoundary componentName="Hero Section">
        <AnimationErrorBoundary componentName="Hero">
          <HeroSection />
        </AnimationErrorBoundary>
      </ErrorBoundary>

      {/* Smooth transition between hero and main content */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-gray-900 transition-all duration-1000">
        <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Search Section */}
          <section 
            id="search-section" 
            className="mb-12 lg:mb-16 transition-all duration-500 ease-in-out"
            aria-labelledby="search-heading"
          >
            <div className="text-center mb-8 lg:mb-12">
              <h2 
                id="search-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white"
              >
                Find Your Next Anime
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-6 lg:mb-8 max-w-3xl mx-auto">
                Discover anime similar to your favorites using machine learning
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-8 lg:mb-12">
              <div className="card-dark rounded-lg p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-2xl">
                <div className="space-y-4 lg:space-y-6">
                  <ErrorBoundary componentName="Search Input">
                    <SearchInput
                      value={animeName}
                      onChange={setAnimeName}
                      onSubmit={handleSearch}
                      isLoading={isLoading}
                    />
                  </ErrorBoundary>

                  <ErrorBoundary componentName="Media Type Toggle">
                    <MediaTypeToggle
                      selected={mediaType}
                      onChange={setMediaType}
                    />
                  </ErrorBoundary>

                  <ErrorBoundary componentName="Search Button">
                    <SearchButton
                      onClick={handleSearch}
                      isLoading={isLoading}
                      disabled={!animeName.trim()}
                    />
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          </section>

          {/* Results Section with smooth transitions and error boundaries */}
          <section 
            className="transition-all duration-500 ease-in-out"
            aria-labelledby="results-heading"
            aria-live="polite"
            aria-atomic="false"
          >
            <h2 id="results-heading" className="sr-only">
              Search Results
            </h2>
            
            <ErrorBoundary componentName="Search Results">
              <AnimationErrorBoundary componentName="Search Results">
                <SearchedAnime 
                  searchedAnime={searchedAnime} 
                  onClearSearch={handleClearSearch}
                />
                <ResultsGrid 
                  similarAnimes={similarAnimes} 
                  searchedAnime={searchedAnime}
                  onClearSearch={handleClearSearch}
                />
              </AnimationErrorBoundary>
            </ErrorBoundary>
          </section>
        </main>
      </div>

      {/* Model Showcase Section with smooth transition and error boundary */}
      <section 
        className="transition-all duration-1000 ease-in-out"
        aria-labelledby="model-showcase-heading"
      >
        <h2 id="model-showcase-heading" className="sr-only">
          AI Model Information
        </h2>
        
        <ErrorBoundary componentName="Model Showcase">
          <AnimationErrorBoundary componentName="Model Showcase">
            <ModelShowcase />
          </AnimationErrorBoundary>
        </ErrorBoundary>
      </section>
    </div>
  )
}

export default App