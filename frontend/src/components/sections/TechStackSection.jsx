import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Tech Stack Section - List of technologies used
 * Requirements: 3.2, 8.1, 8.8
 */
const TechStackSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const itemsRef = useRef([])
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

      // Stagger animation for tech stack items
      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
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
      id="tech-stack" 
      className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-near-black"
      aria-labelledby="tech-stack-heading"
    >
      <div className="container mx-auto max-w-6xl lg:max-w-7xl">
        <h2 
          ref={headingRef}
          id="tech-stack-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-off-white mb-8 sm:mb-10 lg:mb-12 text-center"
        >
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 text-slate-300">
          <div ref={el => itemsRef.current[0] = el}>
            <h3 className="text-xl sm:text-2xl font-semibold text-accent-blue mb-3 sm:mb-4">Frontend</h3>
            <ul className="space-y-2 text-base sm:text-lg">
              <li>• React 18</li>
              <li>• Vite</li>
              <li>• Tailwind CSS</li>
              <li>• GSAP</li>
              <li>• Framer Motion</li>
            </ul>
          </div>
          <div ref={el => itemsRef.current[1] = el}>
            <h3 className="text-xl sm:text-2xl font-semibold text-accent-blue mb-3 sm:mb-4">Backend</h3>
            <ul className="space-y-2 text-base sm:text-lg">
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
