import { ANIMATION_CONFIG } from './constants'

// Framer Motion animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: ANIMATION_CONFIG.duration, ease: ANIMATION_CONFIG.ease }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: ANIMATION_CONFIG.duration, ease: ANIMATION_CONFIG.ease }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: ANIMATION_CONFIG.duration, ease: ANIMATION_CONFIG.ease }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
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

export const slideInFromBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
  transition: { duration: 0.4, ease: "easeOut" }
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

// GSAP animation utilities
export const gsapAnimations = {
  fadeInUp: (element, delay = 0) => ({
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.6, delay, ease: "power2.out" }
  }),
  
  staggerFadeIn: (elements, stagger = 0.1) => ({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.5, stagger, ease: "power2.out" }
  }),
  
  parallaxBackground: (element, speed = 0.5) => ({
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  })
}

// Accessibility: Reduced motion variants
export const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.01 }
}

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get appropriate animation variant based on user preference
export const getAnimationVariant = (normalVariant, reducedVariant = reducedMotionVariants) => {
  return prefersReducedMotion() ? reducedVariant : normalVariant
}