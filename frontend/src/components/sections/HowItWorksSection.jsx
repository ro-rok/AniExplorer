/**
 * How It Works Section - Step-by-step explanation of the ML approach
 * Requirements: 3.2, 4.1, 4.3, 4.4
 */
const HowItWorksSection = () => {
  return (
    <section 
      id="how-it-works" 
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-near-black"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 
          id="how-it-works-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-12 text-center"
        >
          How It Works
        </h2>
        <div className="text-lg md:text-xl text-slate-300 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-accent-blue mb-4">
              Step 1: Embeddings
            </h3>
            <p>User and anime are represented as 128-dimensional vectors...</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-accent-blue mb-4">
              Step 2: Similarity
            </h3>
            <p>Dot product similarity measures how close vectors are...</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-accent-blue mb-4">
              Step 3: Genre Weighting
            </h3>
            <p>Multi-hot genre vectors with exponential decay weights...</p>
          </div>
          {/* Detailed content will be added in future tasks */}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
