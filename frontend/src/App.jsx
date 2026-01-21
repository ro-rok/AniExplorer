import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useLenis } from './hooks'
import { preloadCriticalImages } from './utils/imagePreloader'
import { 
  ErrorBoundary, 
  AnimationErrorBoundary, 
  Navbar,
  LazySection
} from './components/common'
import HeroSection from './components/hero/HeroSection'
import {
  ProblemSection,
  SolutionSection,
  ShowcaseSection,
  LiveSearchSection,
  HowItWorksSection,
  FooterSection
} from './components/sections'
import { EmbeddingNetwork } from './components/embedding'

function App() {
  // Initialize smooth scrolling
  useLenis()

  useEffect(() => {
    // Preload critical images
    preloadCriticalImages()
      .catch((error) => {
        console.warn('Some critical images failed to preload:', error)
      })

    // Wake up the backend server
    fetch('http://127.0.0.1:5000/')
      .catch(() => {
        // Silently handle the wake-up call
      })
  }, [])

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
        {/* Hero Section - Above the fold, load immediately */}
        <ErrorBoundary componentName="Hero Section">
          <AnimationErrorBoundary componentName="Hero">
            <HeroSection />
          </AnimationErrorBoundary>
        </ErrorBoundary>

        {/* Problem Section - Lazy load */}
        <LazySection>
          <ErrorBoundary componentName="Problem Section">
            <AnimationErrorBoundary componentName="Problem">
              <ProblemSection />
            </AnimationErrorBoundary>
          </ErrorBoundary>
        </LazySection>

        {/* Solution Section - Lazy load */}
        <LazySection>
          <ErrorBoundary componentName="Solution Section">
            <AnimationErrorBoundary componentName="Solution">
              <SolutionSection />
            </AnimationErrorBoundary>
          </ErrorBoundary>
        </LazySection>

        {/* Showcase Section - Lazy load */}
        <LazySection>
          <ErrorBoundary componentName="Showcase Section">
            <AnimationErrorBoundary componentName="Showcase">
              <ShowcaseSection />
            </AnimationErrorBoundary>
          </ErrorBoundary>
        </LazySection>

        {/* Interactive Embedding Network Section - Lazy load */}
        <LazySection>
          <section 
            id="interactive-demo" 
            className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-true-black"
            aria-labelledby="interactive-demo-heading"
          >
            <div className="container mx-auto max-w-7xl">
              <h2 
                id="interactive-demo-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-6 sm:mb-8 md:mb-10 text-center font-heading"
              >
                Interactive Embedding Network
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 text-center mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto">
                Explore how genre weights affect anime recommendations in real-time. 
                This is a frontend simulation for educational purposes—adjust the sliders to see the embedding vector, similarity scores, and recommendations update instantly.
              </p>
              
              <ErrorBoundary componentName="Embedding Network">
                <AnimationErrorBoundary componentName="Embedding Network">
                  <EmbeddingNetwork />
                </AnimationErrorBoundary>
              </ErrorBoundary>
            </div>
          </section>
        </LazySection>

        {/* Live Search Section - Lazy load (includes Results merged) */}
        <LazySection>
          <ErrorBoundary componentName="Live Search Section">
            <AnimationErrorBoundary componentName="Live Search">
              <LiveSearchSection />
            </AnimationErrorBoundary>
          </ErrorBoundary>
        </LazySection>

        {/* How the AI Works Section - Finale, Lazy load */}
        <LazySection>
          <ErrorBoundary componentName="How It Works Section">
            <AnimationErrorBoundary componentName="How It Works">
              <HowItWorksSection />
            </AnimationErrorBoundary>
          </ErrorBoundary>
        </LazySection>
      </main>

      {/* Footer Section */}
      <ErrorBoundary componentName="Footer Section">
        <FooterSection />
      </ErrorBoundary>
    </div>
  )
}

export default App
