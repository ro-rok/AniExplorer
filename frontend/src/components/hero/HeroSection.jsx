import React from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '../../hooks/useGSAP'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  // GSAP animations for hero section
  const heroRef = useGSAP((element) => {
    const tl = gsap.timeline()
    
    // Parallax background animation
    gsap.fromTo(element.querySelector('.hero-bg'), 
      { scale: 1.1 },
      { 
        scale: 1, 
        duration: 2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    )
    
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

    // Scroll-triggered animations for background parallax
    gsap.to(element.querySelector('.hero-bg img'), {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })

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
      {/* Background Image with Overlay */}
      <div className="hero-bg absolute inset-0">
        <img 
          src="/bg.jpg" 
          alt="Anime Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>
      
      {/* Hero Content */}
      <div className="hero-content relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* AniExplorer Branding with Gradient Text */}
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            AniExplorer
          </h1>
          
          {/* Engaging Tagline */}
          <p className="hero-tagline text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 font-light leading-relaxed">
            Discover Your Next Anime Adventure with AI-Powered Recommendations
          </p>
          
          {/* Call-to-Action */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
              className="border-2 border-white/30 hover:border-white/50 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
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
          <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <p className="text-white/70 text-sm mt-2">Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection