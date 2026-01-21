/**
 * Tech Stack Section - List of technologies used
 * Requirements: 3.2
 */
const TechStackSection = () => {
  return (
    <section 
      id="tech-stack" 
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-near-black"
      aria-labelledby="tech-stack-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 
          id="tech-stack-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-12 text-center"
        >
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300">
          <div>
            <h3 className="text-2xl font-semibold text-accent-blue mb-4">Frontend</h3>
            <ul className="space-y-2 text-lg">
              <li>• React 18</li>
              <li>• Vite</li>
              <li>• Tailwind CSS</li>
              <li>• GSAP</li>
              <li>• Framer Motion</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-accent-blue mb-4">Backend</h3>
            <ul className="space-y-2 text-lg">
              <li>• FastAPI</li>
              <li>• TensorFlow</li>
              <li>• NumPy</li>
              <li>• MyAnimeList API</li>
            </ul>
          </div>
          {/* Detailed content will be added in future tasks */}
        </div>
      </div>
    </section>
  )
}

export default TechStackSection
