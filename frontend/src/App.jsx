import { useEffect } from 'react'
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
  LiveSearchSection,
  TechStackSection,
  ResultsSection,
  FooterSection
} from './components/sections'
import ModelShowcase from './components/model/ModelShowcase'
import { EmbeddingNetwork } from './components/embedding'

function App() {
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

        {/* Interactive Demo Section */}
        <section 
          id="interactive-demo" 
          className="min-h-screen flex items-center justify-center py-20 px-4 bg-true-black"
          aria-labelledby="interactive-demo-heading"
        >
          <div className="container mx-auto max-w-7xl">
            <h2 
              id="interactive-demo-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-12 text-center"
            >
              Interactive Embedding Demo
            </h2>
            <p className="text-lg md:text-xl text-slate-300 text-center mb-12 max-w-3xl mx-auto">
              Explore how genre weights affect anime recommendations in real-time. 
              Adjust the sliders to see the embedding vector, similarity scores, and recommendations update instantly.
            </p>
            
            <ErrorBoundary componentName="Embedding Network">
              <AnimationErrorBoundary componentName="Embedding Network">
                <EmbeddingNetwork />
              </AnimationErrorBoundary>
            </ErrorBoundary>
          </div>
        </section>

        {/* Live Search Section */}
        <ErrorBoundary componentName="Live Search Section">
          <AnimationErrorBoundary componentName="Live Search">
            <LiveSearchSection />
          </AnimationErrorBoundary>
        </ErrorBoundary>

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
