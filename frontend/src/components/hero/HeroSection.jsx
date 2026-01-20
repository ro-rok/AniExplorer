import { motion } from 'framer-motion'
import { useGSAP } from '../../hooks/useGSAP'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BackgroundImage from '../common/BackgroundImage'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  // GSAP animations for hero section
  const heroRef = useGSAP((element) => {
    const tl = gsap.timeline()
    
    // Staggered text animations for title and tagline
    tl.fromTo(element.querySelector('.hero-title'),
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(element.querySelector('.hero-tagline'),
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6"
    )
    .fromTo(element.querySelector('.hero-cta'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4"
    )
    .fromTo(element.querySelector('.scroll-indicator'),
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2"
    )

    // Fade out hero content on scroll
    gsap.to(element.querySelector('.hero-content'), {
      opacity: 0,
      y: -100,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: element,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    })

    return tl
  })

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Optimized Background Image with Overlay */}
      <BackgroundImage
        src="/bg.jpg"
        alt="Anime Background"
        className="absolute inset-0"
        overlayClassName="bg-gradient-to-b from-black/50 via-black/30 to-black/70"
        priority={true}
      />
      
      {/* Hero Content */}
      <div className="hero-content relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* AniExplorer Branding with Gradient Text */}
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            AniExplorer
          </h1>
          
          {/* Engaging Tagline */}
          <p className="hero-tagline text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-6 sm:mb-8 font-light leading-relaxed px-4">
            Discover Your Next Anime Adventure with AI-Powered Recommendations
          </p>
          
          {/* Call-to-Action */}
          <div className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <motion.button
              className="w-full sm:w-auto btn-primary font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Scroll to search section
                const searchSection = document.querySelector('#search-section')
                if (searchSection) {
                  searchSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Start Exploring
            </motion.button>
            
            <motion.button
              className="w-full sm:w-auto border-2 border-white/30 hover:border-white/50 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Scroll to model showcase section
                const modelSection = document.querySelector('#model-section')
                if (modelSection) {
                  modelSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Learn About Our AI
            </motion.button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="scroll-indicator absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <p className="text-white/70 text-xs sm:text-sm mt-2">Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection