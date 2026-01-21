import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Problem Section - Explains the challenge of finding similar anime
 * Requirements: 3.2, 4.1, 8.1, 8.8
 */
const ProblemSection = () => {
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
      id="problem" 
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-near-black"
      aria-labelledby="problem-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 
          ref={headingRef}
          id="problem-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-8 text-center"
        >
          The Problem
        </h2>
        <div ref={contentRef} className="text-lg md:text-xl text-slate-300 space-y-6">
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
