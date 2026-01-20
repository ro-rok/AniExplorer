import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const SearchButton = ({ onClick, isLoading = false, disabled = false }) => {
  const buttonRef = useRef(null)
  const rippleRef = useRef(null)

  useEffect(() => {
    if (isLoading) {
      // GSAP loading animation for the button content
      gsap.to(buttonRef.current, {
        scale: 0.98,
        duration: 0.1,
        ease: "power2.out"
      })
    } else {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.7)"
      })
    }
  }, [isLoading])

  const handleClick = (e) => {
    if (disabled || isLoading) return

    // Create ripple effect
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    // GSAP ripple animation
    if (rippleRef.current) {
      gsap.set(rippleRef.current, {
        width: size,
        height: size,
        left: x,
        top: y,
        scale: 0,
        opacity: 0.6
      })

      gsap.to(rippleRef.current, {
        scale: 1,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      })
    }

    onClick()
  }

  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.3)"
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.4)"
    },
    tap: {
      scale: 0.98
    },
    disabled: {
      scale: 1,
      boxShadow: "0 2px 8px 0 rgba(71, 85, 105, 0.2)"
    }
  }

  const iconVariants = {
    idle: { rotate: 0 },
    loading: { 
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`
        relative overflow-hidden w-full font-semibold py-3 px-6 rounded-lg 
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800
        ${disabled || isLoading
          ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer'
        }
      `}
      variants={buttonVariants}
      initial="idle"
      animate={disabled || isLoading ? "disabled" : "idle"}
      whileHover={!disabled && !isLoading ? "hover" : undefined}
      whileTap={!disabled && !isLoading ? "tap" : undefined}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      {/* Ripple effect */}
      <div
        ref={rippleRef}
        className="absolute bg-white rounded-full pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Button content */}
      <div className="flex items-center justify-center space-x-2">
        <motion.div
          variants={iconVariants}
          animate={isLoading ? "loading" : "idle"}
        >
          {isLoading ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </motion.div>
        
        <motion.span
          initial={false}
          animate={{
            opacity: isLoading ? 0.7 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {isLoading ? 'Searching...' : 'Find Similar Anime'}
        </motion.span>
      </div>
      
      {/* Loading progress bar */}
      {isLoading && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  )
}

export default SearchButton