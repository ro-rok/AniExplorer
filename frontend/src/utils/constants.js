// API Configuration
export const API_BASE_URL = 'http://127.0.0.1:5000'

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: 0.6,
  ease: 'easeOut',
  stagger: 0.1,
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

// Accessibility
export const ARIA_LABELS = {
  searchInput: 'Enter anime name to search for recommendations',
  mediaTypeToggle: 'Select media type: TV series or movie',
  searchButton: 'Find similar anime recommendations',
  animeCard: 'Anime recommendation card',
  externalLink: 'Opens in new tab',
}