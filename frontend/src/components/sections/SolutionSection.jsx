import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Solution Section - High-level overview of the ML approach
 * Requirements: 3.2, 4.3, 8.1, 8.8
 */
const SolutionSection = () => {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Scroll-based parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="solution" 
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-true-black relative overflow-hidden"
      aria-labelledby="solution-heading"
    >
      <motion.div 
        className="container mx-auto max-w-4xl lg:max-w-6xl xl:max-w-7xl"
        style={prefersReducedMotion ? {} : { opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h2 
          id="solution-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-off-white mb-8 sm:mb-10 lg:mb-12 text-center font-heading"
          variants={itemVariants}
          style={prefersReducedMotion ? {} : { y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
        >
          The Solution
        </motion.h2>
        <motion.div 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 space-y-4 sm:space-y-6"
          variants={itemVariants}
        >
          <motion.p 
            className="text-center"
            variants={itemVariants}
          >
            Machine learning powered recommendations using embeddings...
          </motion.p>
          {/* Content will be added in future tasks */}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default SolutionSection
