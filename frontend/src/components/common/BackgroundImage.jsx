import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const BackgroundImage = ({
  src,
  alt = '',
  className = '',
  overlayClassName = '',
  priority = true,
  children,
  onLoad,
  onError,
  ...props
}) => {
  const [imageState, setImageState] = useState('loading') // 'loading', 'loaded', 'error'
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    // Preload the background image
    const img = new Image()
    
    img.onload = () => {
      setImageSrc(src)
      setImageState('loaded')
      if (onLoad) onLoad()
    }
    
    img.onerror = () => {
      setImageState('error')
      if (onError) onError()
    }

    // Start loading immediately for priority images
    if (priority) {
      img.src = src
    } else {
      // For non-priority images, add a small delay
      const timer = setTimeout(() => {
        img.src = src
      }, 100)
      
      return () => clearTimeout(timer)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, priority, onLoad, onError])

  const backgroundVariants = {
    loading: { 
      opacity: 0,
      scale: 1.1 
    },
    loaded: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }
    },
    error: { 
      opacity: 1,
      scale: 1 
    }
  }

  const placeholderVariants = {
    loading: { opacity: 1 },
    loaded: { 
      opacity: 0,
      transition: { duration: 0.8, delay: 0.4 }
    },
    error: { opacity: 0 }
  }

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      {/* Loading Placeholder */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
        variants={placeholderVariants}
        animate={imageState}
        initial="loading"
      >
        {imageState === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="loading-spinner animate-spin rounded-full h-12 w-12 border-3 border-blue-500 border-t-transparent"></div>
              <div className="text-slate-300 text-lg font-medium">Loading background...</div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Error State */}
      {imageState === 'error' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-lg font-medium">Background image unavailable</p>
              <p className="text-sm text-slate-500 mt-2">Using fallback background</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Background Image */}
      {imageSrc && imageState === 'loaded' && (
        <motion.div
          className="absolute inset-0 z-0"
          variants={backgroundVariants}
          animate={imageState}
          initial="loading"
          style={{ 
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* Overlay */}
      {overlayClassName && (
        <div className={`absolute inset-0 z-[1] ${overlayClassName}`} />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}

export default BackgroundImage