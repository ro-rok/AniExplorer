/**
 * Footer Section - Links and copyright information
 * Requirements: 3.2
 */
const FooterSection = () => {
  return (
    <footer 
      id="footer" 
      className="bg-true-black border-t border-slate-800 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto max-w-6xl lg:max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-3 sm:mb-4">AniExplorer</h3>
            <p className="text-sm sm:text-base text-slate-400">
              ML-powered anime recommendations
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-off-white mb-3 sm:mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/ro-rok/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-slate-400 hover:text-accent-blue focus:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-true-black rounded px-2 py-1 transition-all duration-200 inline-block min-h-[44px] flex items-center"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/rorok/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-slate-400 hover:text-accent-blue focus:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-true-black rounded px-2 py-1 transition-all duration-200 inline-block min-h-[44px] flex items-center"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="http://ro-port.vercel.app/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-slate-400 hover:text-accent-blue focus:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-true-black rounded px-2 py-1 transition-all duration-200 inline-block min-h-[44px] flex items-center"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Back to Top */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm sm:text-base text-slate-400 hover:text-accent-blue transition-colors duration-200 flex items-center space-x-2 min-h-[44px]"
              aria-label="Back to top"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
              </svg>
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            © {new Date().getFullYear()} AniExplorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
