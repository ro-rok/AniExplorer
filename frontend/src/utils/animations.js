import { ANIMATION_CONFIG } from './constants'

// GSAP animation utilities
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: ANIMATION_CONFIG.duration, ease: ANIMATION_CONFIG.ease }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger
    }
  }
}

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
}

// Lenis smooth scroll configuration
export const lenisConfig = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
}

// Reduced motion variants
export const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.01 }
}