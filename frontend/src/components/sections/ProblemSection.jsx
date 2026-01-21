/**
 * Problem Section - Explains the challenge of finding similar anime
 * Requirements: 3.2, 4.1
 */
const ProblemSection = () => {
  return (
    <section 
      id="problem" 
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-near-black"
      aria-labelledby="problem-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 
          id="problem-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-8 text-center"
        >
          The Problem
        </h2>
        <div className="text-lg md:text-xl text-slate-300 space-y-6">
          <p className="text-center">
            Finding anime similar to your favorites is challenging...
          </p>
          {/* Content will be added in future tasks */}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
