import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Solution Section - High-level overview of the ML approach
 * Requirements: 3.2, 4.3, 8.1, 8.8
 */
const SolutionSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)
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

      // Fade in content
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      id="solution" 
      className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-true-black"
      aria-labelledby="solution-heading"
    >
      <div className="container mx-auto max-w-4xl lg:max-w-6xl xl:max-w-7xl">
        <h2 
          ref={headingRef}
          id="solution-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-off-white mb-6 sm:mb-8 lg:mb-10 text-center"
        >
          The Solution
        </h2>
        <div ref={contentRef} className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 space-y-4 sm:space-y-6">
          <p className="text-center">
            Machine learning powered recommendations using embeddings...
          </p>
          {/* Content will be added in future tasks */}
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
