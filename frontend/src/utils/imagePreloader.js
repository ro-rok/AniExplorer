/**
 * Image preloader utility for optimizing critical image loading
 */

class ImagePreloader {
  constructor() {
    this.cache = new Map()
    this.loadingPromises = new Map()
  }

  /**
   * Preload a single image
   * @param {string} src - Image source URL
   * @param {Object} options - Preload options
   * @returns {Promise} - Promise that resolves when image is loaded
   */
  preload(src, options = {}) {
    const { priority = false, timeout = 10000 } = options

    // Return cached result if available
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src))
    }

    // Return existing loading promise if in progress
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)
    }

    const loadPromise = new Promise((resolve, reject) => {
      const img = new Image()
      let timeoutId

      const cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId)
        img.onload = null
        img.onerror = null
        this.loadingPromises.delete(src)
      }

      img.onload = () => {
        cleanup()
        const result = { src, loaded: true, error: null, image: img }
        this.cache.set(src, result)
        resolve(result)
      }

      img.onerror = (error) => {
        cleanup()
        const result = { src, loaded: false, error, image: null }
        this.cache.set(src, result)
        reject(result)
      }

      // Set timeout for loading
      if (timeout > 0) {
        timeoutId = setTimeout(() => {
          cleanup()
          const result = { src, loaded: false, error: new Error('Timeout'), image: null }
          this.cache.set(src, result)
          reject(result)
        }, timeout)
      }

      // Set priority hint if supported
      if (priority && 'fetchPriority' in img) {
        img.fetchPriority = 'high'
      }

      img.src = src
    })

    this.loadingPromises.set(src, loadPromise)
    return loadPromise
  }

  /**
   * Preload multiple images
   * @param {Array} sources - Array of image sources or objects with src and options
   * @param {Object} globalOptions - Global options for all images
   * @returns {Promise} - Promise that resolves when all images are processed
   */
  preloadMultiple(sources, globalOptions = {}) {
    const promises = sources.map(source => {
      if (typeof source === 'string') {
        return this.preload(source, globalOptions).catch(error => error)
      } else {
        const { src, ...options } = source
        return this.preload(src, { ...globalOptions, ...options }).catch(error => error)
      }
    })

    return Promise.allSettled(promises)
  }

  /**
   * Preload critical images that should load immediately
   * @param {Array} sources - Array of critical image sources
   * @returns {Promise} - Promise that resolves when critical images are loaded
   */
  preloadCritical(sources) {
    return this.preloadMultiple(sources, { priority: true, timeout: 5000 })
  }

  /**
   * Check if an image is cached
   * @param {string} src - Image source URL
   * @returns {boolean} - Whether the image is cached
   */
  isCached(src) {
    return this.cache.has(src) && this.cache.get(src).loaded
  }

  /**
   * Get cached image result
   * @param {string} src - Image source URL
   * @returns {Object|null} - Cached result or null
   */
  getCached(src) {
    return this.cache.get(src) || null
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear()
    this.loadingPromises.clear()
  }

  /**
   * Get cache size
   * @returns {number} - Number of cached images
   */
  getCacheSize() {
    return this.cache.size
  }

  /**
   * Remove specific image from cache
   * @param {string} src - Image source URL
   */
  removeFromCache(src) {
    this.cache.delete(src)
    this.loadingPromises.delete(src)
  }
}

// Create singleton instance
const imagePreloader = new ImagePreloader()

// Preload critical images on app initialization
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/bg.jpg', // Hero background image
  ]

  return imagePreloader.preloadCritical(criticalImages)
}

// Utility functions
export const preloadImage = (src, options) => imagePreloader.preload(src, options)
export const preloadImages = (sources, options) => imagePreloader.preloadMultiple(sources, options)
export const isImageCached = (src) => imagePreloader.isCached(src)
export const getCachedImage = (src) => imagePreloader.getCached(src)
export const clearImageCache = () => imagePreloader.clearCache()

export default imagePreloader