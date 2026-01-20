// API Configuration
export const API_BASE_URL = 'http://127.0.0.1:5000'

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: 0.6,
  ease: 'easeOut',
  stagger: 0.1,
  reducedMotionDuration: 0.01,
}

// GSAP Configuration
export const GSAP_CONFIG = {
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
  parallax: {
    speed: 0.5,
    ease: 'none',
  }
}

// Media Types
export const MEDIA_TYPES = {
  TV: 'tv',
  MOVIE: 'movie',
}

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Theme Configuration
export const THEME_CONFIG = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a',
    },
    dark: {
      50: '#f8fafc',
      100: '#f1f5f9',
      800: '#1e293b',
      900: '#0f172a',
    }
  }
}

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  imageLoading: {
    lazy: true,
    placeholder: 'blur',
    quality: 85,
  },
  animation: {
    targetFPS: 60,
    maxDuration: 2000, // 2 seconds max for any animation
  }
}

// Accessibility
export const ARIA_LABELS = {
  searchInput: 'Enter anime name to search for recommendations',
  mediaTypeToggle: 'Select media type: TV series or movie',
  searchButton: 'Find similar anime recommendations',
  animeCard: 'Anime recommendation card',
  externalLink: 'Opens in new tab',
  heroSection: 'AniExplorer hero section with background image',
  modelShowcase: 'Machine learning model showcase section',
  skipToContent: 'Skip to main content',
}

// Z-Index Scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
}