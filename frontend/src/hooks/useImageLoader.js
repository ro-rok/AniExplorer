import { useState, useEffect, useRef } from 'react'
import { preloadImage, isImageCached } from '../utils/imagePreloader'

/**
 * Hook for managing image loading with lazy loading and error handling
 * @param {string} src - Image source URL
 * @param {Object} options - Loading options
 * @returns {Object} - Loading state and handlers
 */
export const useImageLoader = (src, options = {}) => {
  const {
    lazy = true,
    priority = false,
    threshold = 0.1,
    rootMargin = '50px',
    timeout = 10000
  } = options

  const [imageState, setImageState] = useState(() => {
    // Check if image is already cached
    if (isImageCached(src)) {
      return 'loaded'
    }
    return priority ? 'loading' : 'idle'
  })
  
  const [imageSrc, setImageSrc] = useState(() => {
    if (priority || isImageCached(src)) {
      return src
    }
    return null
  })

  const elementRef = useRef(null)
  const observerRef = useRef(null)

  // Handle intersection observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || imageSrc || imageState === 'loaded') {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageState('loading')
            setImageSrc(src)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin,
        threshold
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
      observerRef.current = observer
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [src, lazy, priority, imageSrc, imageState, rootMargin, threshold])

  // Handle image preloading
  useEffect(() => {
    if (!imageSrc || imageState === 'loaded' || imageState === 'error') {
      return
    }

    let isMounted = true

    preloadImage(imageSrc, { priority, timeout })
      .then(() => {
        if (isMounted) {
          setImageState('loaded')
        }
      })
      .catch(() => {
        if (isMounted) {
          setImageState('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [imageSrc, priority, timeout, imageState])

  // Handle immediate loading for priority images
  useEffect(() => {
    if (priority && !imageSrc) {
      setImageState('loading')
      setImageSrc(src)
    }
  }, [src, priority, imageSrc])

  const retry = () => {
    setImageState('loading')
    setImageSrc(null)
    // Small delay before retrying
    setTimeout(() => {
      setImageSrc(src)
    }, 100)
  }

  return {
    imageState,
    imageSrc,
    elementRef,
    retry,
    isLoading: imageState === 'loading',
    isLoaded: imageState === 'loaded',
    isError: imageState === 'error',
    isIdle: imageState === 'idle'
  }
}

/**
 * Hook for managing multiple image loading states
 * Note: This hook is currently disabled due to React hooks rules violations
 * (calling hooks inside map). Consider refactoring if needed in the future.
 * @param {Array} sources - Array of image sources
 * @param {Object} options - Loading options
 * @returns {Object} - Combined loading state
 */
/* eslint-disable no-unused-vars */
export const useMultipleImageLoader = (sources, options = {}) => {
  // This implementation violates React hooks rules by calling useImageLoader in a map
  // Disabled for now - refactor if needed
  throw new Error('useMultipleImageLoader is currently disabled. Use useImageLoader for individual images instead.')
}
/* eslint-enable no-unused-vars */

export default useImageLoader