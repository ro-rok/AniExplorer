import {
  API_BASE_URL,
  ANIMATION_CONFIG,
  GSAP_CONFIG,
  MEDIA_TYPES,
  BREAKPOINTS,
  THEME_CONFIG,
  PERFORMANCE_CONFIG,
  ARIA_LABELS,
  Z_INDEX
} from './constants'

describe('Constants Configuration', () => {
  describe('API Configuration', () => {
    test('API_BASE_URL should be defined', () => {
      expect(API_BASE_URL).toBeDefined()
      expect(typeof API_BASE_URL).toBe('string')
    })
  })

  describe('Animation Configuration', () => {
    test('ANIMATION_CONFIG should have required properties', () => {
      expect(ANIMATION_CONFIG).toHaveProperty('duration')
      expect(ANIMATION_CONFIG).toHaveProperty('ease')
      expect(ANIMATION_CONFIG).toHaveProperty('stagger')
      expect(ANIMATION_CONFIG).toHaveProperty('reducedMotionDuration')
      
      expect(typeof ANIMATION_CONFIG.duration).toBe('number')
      expect(typeof ANIMATION_CONFIG.ease).toBe('string')
      expect(typeof ANIMATION_CONFIG.stagger).toBe('number')
      expect(typeof ANIMATION_CONFIG.reducedMotionDuration).toBe('number')
    })
  })

  describe('GSAP Configuration', () => {
    test('GSAP_CONFIG should have scrollTrigger and parallax settings', () => {
      expect(GSAP_CONFIG).toHaveProperty('scrollTrigger')
      expect(GSAP_CONFIG).toHaveProperty('parallax')
      
      expect(GSAP_CONFIG.scrollTrigger).toHaveProperty('start')
      expect(GSAP_CONFIG.scrollTrigger).toHaveProperty('end')
      expect(GSAP_CONFIG.scrollTrigger).toHaveProperty('toggleActions')
      
      expect(GSAP_CONFIG.parallax).toHaveProperty('speed')
      expect(GSAP_CONFIG.parallax).toHaveProperty('ease')
    })
  })

  describe('Media Types', () => {
    test('MEDIA_TYPES should have TV and MOVIE', () => {
      expect(MEDIA_TYPES).toHaveProperty('TV')
      expect(MEDIA_TYPES).toHaveProperty('MOVIE')
      expect(MEDIA_TYPES.TV).toBe('tv')
      expect(MEDIA_TYPES.MOVIE).toBe('movie')
    })
  })

  describe('Breakpoints', () => {
    test('BREAKPOINTS should match Tailwind CSS breakpoints', () => {
      expect(BREAKPOINTS).toHaveProperty('sm')
      expect(BREAKPOINTS).toHaveProperty('md')
      expect(BREAKPOINTS).toHaveProperty('lg')
      expect(BREAKPOINTS).toHaveProperty('xl')
      expect(BREAKPOINTS).toHaveProperty('2xl')
      
      expect(BREAKPOINTS.sm).toBe(640)
      expect(BREAKPOINTS.md).toBe(768)
      expect(BREAKPOINTS.lg).toBe(1024)
      expect(BREAKPOINTS.xl).toBe(1280)
      expect(BREAKPOINTS['2xl']).toBe(1536)
    })
  })

  describe('Theme Configuration', () => {
    test('THEME_CONFIG should have colors defined', () => {
      expect(THEME_CONFIG).toHaveProperty('colors')
      expect(THEME_CONFIG.colors).toHaveProperty('primary')
      expect(THEME_CONFIG.colors).toHaveProperty('dark')
      
      expect(THEME_CONFIG.colors.primary).toHaveProperty('50')
      expect(THEME_CONFIG.colors.primary).toHaveProperty('500')
      expect(THEME_CONFIG.colors.dark).toHaveProperty('50')
      expect(THEME_CONFIG.colors.dark).toHaveProperty('900')
    })
  })

  describe('Performance Configuration', () => {
    test('PERFORMANCE_CONFIG should have image and animation settings', () => {
      expect(PERFORMANCE_CONFIG).toHaveProperty('imageLoading')
      expect(PERFORMANCE_CONFIG).toHaveProperty('animation')
      
      expect(PERFORMANCE_CONFIG.imageLoading).toHaveProperty('lazy')
      expect(PERFORMANCE_CONFIG.imageLoading).toHaveProperty('quality')
      
      expect(PERFORMANCE_CONFIG.animation).toHaveProperty('targetFPS')
      expect(PERFORMANCE_CONFIG.animation).toHaveProperty('maxDuration')
      
      expect(PERFORMANCE_CONFIG.animation.targetFPS).toBe(60)
    })
  })

  describe('Accessibility', () => {
    test('ARIA_LABELS should have all required labels', () => {
      expect(ARIA_LABELS).toHaveProperty('searchInput')
      expect(ARIA_LABELS).toHaveProperty('mediaTypeToggle')
      expect(ARIA_LABELS).toHaveProperty('searchButton')
      expect(ARIA_LABELS).toHaveProperty('animeCard')
      expect(ARIA_LABELS).toHaveProperty('heroSection')
      expect(ARIA_LABELS).toHaveProperty('modelShowcase')
      expect(ARIA_LABELS).toHaveProperty('skipToContent')
      
      // All labels should be non-empty strings
      Object.values(ARIA_LABELS).forEach(label => {
        expect(typeof label).toBe('string')
        expect(label.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Z-Index Scale', () => {
    test('Z_INDEX should have proper layering hierarchy', () => {
      expect(Z_INDEX).toHaveProperty('dropdown')
      expect(Z_INDEX).toHaveProperty('modal')
      expect(Z_INDEX).toHaveProperty('toast')
      
      // Toast should be highest
      expect(Z_INDEX.toast).toBeGreaterThan(Z_INDEX.modal)
      expect(Z_INDEX.modal).toBeGreaterThan(Z_INDEX.dropdown)
      
      // All values should be numbers
      Object.values(Z_INDEX).forEach(value => {
        expect(typeof value).toBe('number')
        expect(value).toBeGreaterThan(0)
      })
    })
  })
})