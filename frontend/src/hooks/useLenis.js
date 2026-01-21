import { useEffect } from 'react'
import Lenis from 'lenis'
import { lenisConfig } from '../utils/animations'

/**
 * Custom hook to initialize Lenis smooth scroll
 * Respects user's prefers-reduced-motion preference
 * Validates Requirements: 8.3, 8.8
 */
export const useLenis = () => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Don't initialize smooth scroll if user prefers reduced motion
    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis(lenisConfig)

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}