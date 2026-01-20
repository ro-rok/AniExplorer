import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const OptimizedImage = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  errorClassName = '',
  lazy = true,
  priority = false,
  onLoad,
  onError,
  ...props
}) => {
  const [imageState, setImageState] = useState('loading') // 'loading', 'loaded', 'error'
  const [imageSrc, setImageSrc] = useState(priority ? src : null)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || imageSrc) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
      observerRef.current = observer
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [src, lazy, priority, imageSrc])

  const handleImageLoad = (event) => {
    setImageState('loaded')
    if (onLoad) onLoad(event)
  }

  const handleImageError = (event) => {
    setImageState('error')
    if (onError) onError(event)
  }

  const imageVariants = {
    loading: { opacity: 0 },
    loaded: { 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    error: { opacity: 1 }
  }

  const placeholderVariants = {
    loading: { opacity: 1 },
    loaded: { 
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    error: { opacity: 0 }
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Loading Placeholder */}
      <motion.div
        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 ${placeholderClassName}`}
        variants={placeholderVariants}
        animate={imageState}
        initial="loading"
      >
        {imageState === 'loading' && (
          <div className="flex flex-col items-center space-y-3">
            <div className="loading-spinner animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
            <div className="text-slate-400 text-sm font-medium">Loading...</div>
          </div>
        )}
      </motion.div>

      {/* Error State */}
      {imageState === 'error' && (
        <motion.div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 ${errorClassName}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">Image not available</p>
            <p className="text-xs text-slate-500 mt-1">Failed to load image</p>
          </div>
        </motion.div>
      )}

      {/* Actual Image */}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
          variants={imageVariants}
          animate={imageState}
          initial="loading"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={lazy && !priority ? 'lazy' : 'eager'}
        />
      )}
    </div>
  )
}

export default OptimizedImage