import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useLenis } from './hooks'
import { preloadCriticalImages } from './utils/imagePreloader'
import { 
  ErrorBoundary, 
  AnimationErrorBoundary, 
  Navbar 
} from './components/common'
import HeroSection from './components/hero/HeroSection'
import {
  ProblemSection,
  SolutionSection,
  HowItWorksSection,
  TechStackSection,
  ResultsSection,
  FooterSection
} from './components/sections'
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
    <div className="min-h-screen bg-true-black text-slate-100">
      <Toaster position="top-right" />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-blue focus:text-white focus:rounded"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Navigation Bar */}
      <ErrorBoundary componentName="Navigation">
        <Navbar />
      </ErrorBoundary>

      {/* Main Content */}
      <main id="main-content" role="main">
        {/* Hero Section */}
        <ErrorBoundary componentName="Hero Section">
          <AnimationErrorBoundary componentName="Hero">
            <HeroSection />
          </AnimationErrorBoundary>
        </ErrorBoundary>

        {/* Problem Section */}
        <ErrorBoundary componentName="Problem Section">
          <AnimationErrorBoundary componentName="Problem">
            <ProblemSection />
          </AnimationErrorBoundary>
        </ErrorBoundary>

        {/* Solution Section */}
        <ErrorBoundary componentName="Solution Section">
          <AnimationErrorBoundary componentName="Solution">
            <SolutionSection />
          </AnimationErrorBoundary>
        </ErrorBoundary>

        {/* How It Works Section */}
        <ErrorBoundary componentName="How It Works Section">
          <AnimationErrorBoundary componentName="How It Works">
            <HowItWorksSection />
          </AnimationErrorBoundary>
        </ErrorBoundary>

        {/* Interactive Demo Section - Placeholder for future implementation */}
        <section 
          id="interactive-demo" 
          className="min-h-screen flex items-center justify-center py-20 px-4 bg-true-black"
          aria-labelledby="interactive-demo-heading"
        >
          <div className="container mx-auto max-w-6xl">
            <h2 
              id="interactive-demo-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-12 text-center"
            >
              Interactive Demo
            </h2>
            <p className="text-lg md:text-xl text-slate-300 text-center">
              Interactive embedding visualization coming soon...
            </p>
          </div>
        </section>

        {/* Live Search Section */}
        <section 
          id="live-search"
          className="min-h-screen flex items-center justify-center py-20 px-4 bg-near-black"
          aria-labelledby="live-search-heading"
        >
          <div className="container mx-auto max-w-6xl w-full">
            <div className="text-center mb-12">
              <h2 
                id="live-search-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-6"
              >
                Try It Live
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                Search for any anime and discover similar recommendations powered by our ML model
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
              <div className="card-dark rounded-lg p-6 lg:p-8 transition-all duration-300 hover:shadow-2xl">
                <div className="space-y-6">
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

            {/* Results */}
            <div 
              className="transition-all duration-500 ease-in-out"
              aria-live="polite"
              aria-atomic="false"
            >
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
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <ErrorBoundary componentName="Tech Stack Section">
          <AnimationErrorBoundary componentName="Tech Stack">
            <TechStackSection />
          </AnimationErrorBoundary>
        </ErrorBoundary>

        {/* Results Section */}
        <ErrorBoundary componentName="Results Section">
          <AnimationErrorBoundary componentName="Results">
            <ResultsSection />
          </AnimationErrorBoundary>
        </ErrorBoundary>

        {/* Model Showcase Section - Keeping existing implementation */}
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
      </main>

      {/* Footer Section */}
      <ErrorBoundary componentName="Footer Section">
        <FooterSection />
      </ErrorBoundary>
    </div>
  )
}

export default App
