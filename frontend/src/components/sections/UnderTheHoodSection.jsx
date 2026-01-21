import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Under the Hood Section - Finale explanation of how the AI works
 * 3-step explanation: Embeddings → Similarity → Genre Weighting
 * Requirements: 3.2, 4.1, 4.3, 4.4, 8.1, 8.8
 */
const UnderTheHoodSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const stepsRef = useRef([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Fade in heading
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })

      // Stagger animation for steps
      gsap.from(stepsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      id="under-the-hood" 
      className="py-20 sm:py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-near-black"
      aria-labelledby="under-the-hood-heading"
    >
      <div className="container mx-auto max-w-6xl lg:max-w-7xl">
        <h2 
          ref={headingRef}
          id="under-the-hood-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-off-white mb-12 sm:mb-16 lg:mb-20 text-center font-heading"
        >
          Under the Hood
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Step 1: Embeddings */}
          <div 
            ref={el => stepsRef.current[0] = el} 
            className="bg-true-black rounded-card border border-hairline p-6 sm:p-8 shadow-soft"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-xl font-bold font-heading">1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-accent font-heading">
                Embeddings
              </h3>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Each anime is represented as a 12-dimensional vector. Each dimension corresponds to a genre. 
              When a genre is present, that dimension gets a value based on its weight.
            </p>
            <div className="mt-4 p-4 bg-near-black rounded-lg border border-hairline">
              <div className="text-xs text-slate-400 mb-2">Example Vector:</div>
              <div className="flex gap-1">
                {[1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0].map((val, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-8 rounded text-xs flex items-center justify-center ${
                      val > 0 ? 'bg-accent/40 text-accent' : 'bg-gray-800 text-slate-500'
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Step 2: Similarity */}
          <div 
            ref={el => stepsRef.current[1] = el} 
            className="bg-true-black rounded-card border border-hairline p-6 sm:p-8 shadow-soft"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-xl font-bold font-heading">2</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-accent font-heading">
                Similarity
              </h3>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cosine similarity measures how close two vectors are. It's the normalized dot product—higher values mean more similar anime.
            </p>
            <div className="mt-4 p-4 bg-near-black rounded-lg border border-hairline">
              <div className="text-xs text-slate-400 mb-2">Formula:</div>
              <div className="text-accent text-sm font-mono">
                similarity = (A · B) / (||A|| × ||B||)
              </div>
            </div>
          </div>
          
          {/* Step 3: Genre Weighting */}
          <div 
            ref={el => stepsRef.current[2] = el} 
            className="bg-true-black rounded-card border border-hairline p-6 sm:p-8 shadow-soft"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-xl font-bold font-heading">3</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-accent font-heading">
                Genre Weighting
              </h3>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Adjusting genre weights changes the embedding vector. Higher weights boost certain genres, shifting similarity scores and re-ranking recommendations.
            </p>
            <div className="mt-4 p-4 bg-near-black rounded-lg border border-hairline">
              <div className="text-xs text-slate-400 mb-2">Weight Range:</div>
              <div className="text-accent text-sm">
                0.0 (diminish) → 1.0 (neutral) → 2.0 (boost)
              </div>
            </div>
          </div>
        </div>

        {/* Small diagram matching Interactive Network */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-block bg-true-black rounded-card border border-hairline p-6 sm:p-8 shadow-soft">
            <div className="text-slate-400 text-sm mb-4">Visual Flow:</div>
            <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-2">
                  <span className="text-accent text-xs font-bold">Query</span>
                </div>
                <div className="text-xs text-slate-400">Anime</div>
              </div>
              <div className="text-accent text-2xl">→</div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-2">
                  <span className="text-accent text-xs font-bold">Genres</span>
                </div>
                <div className="text-xs text-slate-400">6 Groups</div>
              </div>
              <div className="text-accent text-2xl">→</div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-2">
                  <span className="text-accent text-xs font-bold">Vector</span>
                </div>
                <div className="text-xs text-slate-400">12 Dims</div>
              </div>
              <div className="text-accent text-2xl">→</div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-2">
                  <span className="text-accent text-xs font-bold">Score</span>
                </div>
                <div className="text-xs text-slate-400">Similarity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UnderTheHoodSection
