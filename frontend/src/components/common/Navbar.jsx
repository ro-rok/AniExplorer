import { useState, useRef, useEffect } from 'react'
import { useScrollspy } from '../../hooks'

/**
 * Sticky navigation bar with scrollspy functionality
 * Highlights the active section based on scroll position
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const sectionIds = [
    'hero',
    'live-search',
    'showcase',
    'interactive-demo',
    'how-it-works'
  ]

  const activeSection = useScrollspy(sectionIds, 100)

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'live-search', label: 'Search' },
    { id: 'showcase', label: 'Showcase' },
    { id: 'interactive-demo', label: 'Demo' },
    { id: 'how-it-works', label: 'How It Works' }
  ]

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    setIsMenuOpen(false) // Close menu when nav item is clicked
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Handle outside click to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMenuOpen])

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  return (
    <nav 
      className="sticky top-0 z-50 bg-true-black/90 backdrop-blur-sm border-b border-slate-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand with Favicon */}
          <div className="flex-shrink-0">
            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, 'hero')}
              className="flex items-center gap-2 text-xl font-bold text-off-white hover:text-accent-blue transition-colors duration-200"
              aria-label="AniExplorer home"
            >
              <img 
                src="/favicon.ico" 
                alt="AniExplorer" 
                className="w-8 h-8 object-contain"
              />
              <span className="hidden sm:inline">AniExplorer</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-accent-blue/20 text-accent-blue'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-off-white'
                    }`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-off-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-blue transition-colors duration-200 min-h-[44px] min-w-[44px]"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden bg-near-black border-t border-slate-800"
        >
          <ul className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 min-h-[44px] flex items-center ${
                    activeSection === item.id
                      ? 'bg-accent-blue/20 text-accent-blue'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-off-white'
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
