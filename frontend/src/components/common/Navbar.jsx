import { useScrollspy } from '../../hooks'

/**
 * Sticky navigation bar with scrollspy functionality
 * Highlights the active section based on scroll position
 */
const Navbar = () => {
  const sectionIds = [
    'hero',
    'problem',
    'solution',
    'how-it-works',
    'interactive-demo',
    'live-search',
    'tech-stack',
    'results'
  ]

  const activeSection = useScrollspy(sectionIds, 100)

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'interactive-demo', label: 'Demo' },
    { id: 'live-search', label: 'Search' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'results', label: 'Results' }
  ]

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav 
      className="sticky top-0 z-50 bg-true-black/90 backdrop-blur-sm border-b border-slate-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, 'hero')}
              className="text-xl font-bold text-off-white hover:text-accent-blue transition-colors duration-200"
              aria-label="AniExplorer home"
            >
              AniExplorer
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
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-off-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-blue transition-colors duration-200"
              aria-expanded="false"
              aria-label="Open main menu"
            >
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (hidden by default - can be enhanced with state management) */}
      <div className="md:hidden hidden" id="mobile-menu">
        <ul className="px-2 pt-2 pb-3 space-y-1 bg-near-black border-t border-slate-800">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
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
    </nav>
  )
}

export default Navbar
