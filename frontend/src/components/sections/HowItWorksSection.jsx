import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * How It Works Section - Step-by-step explanation of the ML approach
 * Requirements: 3.2, 4.1, 4.3, 4.4, 8.1, 8.8
 */
const HowItWorksSection = () => {
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
        stagger: 0.15,
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
      id="how-it-works" 
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-near-black"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={headingRef}
          id="how-it-works-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-12 text-center"
        >
          How It Works
        </h2>
        <div className="text-lg md:text-xl text-slate-300 space-y-8">
          <div ref={el => stepsRef.current[0] = el} className="text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-accent-blue mb-4">
              Step 1: Embeddings
            </h3>
            <p>User and anime are represented as 128-dimensional vectors...</p>
          </div>
          
          <div ref={el => stepsRef.current[1] = el} className="text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-accent-blue mb-4">
              Step 2: Similarity
            </h3>
            <p>Dot product similarity measures how close vectors are...</p>
          </div>
          
          <div ref={el => stepsRef.current[2] = el} className="text-center">
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
