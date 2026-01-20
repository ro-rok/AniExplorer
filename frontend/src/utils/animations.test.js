import { 
  fadeInUp, 
  fadeInDown, 
  fadeInLeft, 
  fadeInRight,
  staggerContainer,
  scaleOnHover,
  slideInFromBottom,
  lenisConfig,
  gsapAnimations,
  reducedMotionVariants,
  prefersReducedMotion,
  getAnimationVariant
} from './animations'

// Mock window.matchMedia for testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('Animation Utilities', () => {
  describe('Framer Motion Variants', () => {
    test('fadeInUp should have correct initial and animate states', () => {
      expect(fadeInUp.initial).toEqual({ opacity: 0, y: 30 })
      expect(fadeInUp.animate).toEqual({ opacity: 1, y: 0 })
      expect(fadeInUp.transition).toBeDefined()
    })

    test('fadeInDown should have correct initial and animate states', () => {
      expect(fadeInDown.initial).toEqual({ opacity: 0, y: -30 })
      expect(fadeInDown.animate).toEqual({ opacity: 1, y: 0 })
    })

    test('fadeInLeft should have correct initial and animate states', () => {
      expect(fadeInLeft.initial).toEqual({ opacity: 0, x: -30 })
      expect(fadeInLeft.animate).toEqual({ opacity: 1, x: 0 })
    })

    test('fadeInRight should have correct initial and animate states', () => {
      expect(fadeInRight.initial).toEqual({ opacity: 0, x: 30 })
      expect(fadeInRight.animate).toEqual({ opacity: 1, x: 0 })
    })

    test('staggerContainer should have stagger transition', () => {
      expect(staggerContainer.animate.transition).toHaveProperty('staggerChildren')
    })

    test('scaleOnHover should have hover and tap states', () => {
      expect(scaleOnHover.whileHover).toEqual({ scale: 1.05 })
      expect(scaleOnHover.whileTap).toEqual({ scale: 0.95 })
    })

    test('slideInFromBottom should have initial, animate, and exit states', () => {
      expect(slideInFromBottom.initial).toEqual({ opacity: 0, y: 50 })
      expect(slideInFromBottom.animate).toEqual({ opacity: 1, y: 0 })
      expect(slideInFromBottom.exit).toEqual({ opacity: 0, y: 50 })
    })
  })

  describe('Lenis Configuration', () => {
    test('lenisConfig should have required properties', () => {
      expect(lenisConfig).toHaveProperty('duration')
      expect(lenisConfig).toHaveProperty('easing')
      expect(lenisConfig).toHaveProperty('direction')
      expect(lenisConfig).toHaveProperty('smooth')
      expect(lenisConfig.smooth).toBe(true)
    })
  })

  describe('GSAP Animations', () => {
    test('gsapAnimations should have fadeInUp function', () => {
      const mockElement = document.createElement('div')
      const animation = gsapAnimations.fadeInUp(mockElement, 0.5)
      
      expect(animation).toHaveProperty('from')
      expect(animation).toHaveProperty('to')
      expect(animation.from).toEqual({ opacity: 0, y: 50 })
      expect(animation.to.delay).toBe(0.5)
    })

    test('gsapAnimations should have staggerFadeIn function', () => {
      const mockElements = [document.createElement('div'), document.createElement('div')]
      const animation = gsapAnimations.staggerFadeIn(mockElements, 0.2)
      
      expect(animation).toHaveProperty('from')
      expect(animation).toHaveProperty('to')
      expect(animation.to.stagger).toBe(0.2)
    })

    test('gsapAnimations should have parallaxBackground function', () => {
      const mockElement = document.createElement('div')
      const animation = gsapAnimations.parallaxBackground(mockElement, 0.3)
      
      expect(animation).toHaveProperty('yPercent')
      expect(animation).toHaveProperty('scrollTrigger')
      expect(animation.yPercent).toBe(-15) // -50 * 0.3
    })
  })

  describe('Accessibility Features', () => {
    test('reducedMotionVariants should have minimal animation', () => {
      expect(reducedMotionVariants.initial).toEqual({ opacity: 0 })
      expect(reducedMotionVariants.animate).toEqual({ opacity: 1 })
      expect(reducedMotionVariants.transition.duration).toBe(0.01)
    })

    test('prefersReducedMotion should return boolean', () => {
      const result = prefersReducedMotion()
      expect(typeof result).toBe('boolean')
    })

    test('getAnimationVariant should return reduced motion variant when preferred', () => {
      // Mock reduced motion preference
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))

      const normalVariant = fadeInUp
      const result = getAnimationVariant(normalVariant)
      
      expect(result).toEqual(reducedMotionVariants)
    })

    test('getAnimationVariant should return normal variant when not preferred', () => {
      // Mock no reduced motion preference
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))

      const normalVariant = fadeInUp
      const result = getAnimationVariant(normalVariant)
      
      expect(result).toEqual(normalVariant)
    })
  })
})