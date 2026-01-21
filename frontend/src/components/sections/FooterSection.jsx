/**
 * Footer Section - Links and copyright information
 * Requirements: 3.2
 */
const FooterSection = () => {
  return (
    <footer 
      id="footer" 
      className="bg-true-black border-t border-slate-800 py-12 px-4"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-off-white mb-4">AniExplorer</h3>
            <p className="text-slate-400">
              ML-powered anime recommendations
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-off-white mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-accent-blue transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-accent-blue transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-accent-blue transition-colors duration-200"
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
              className="text-slate-400 hover:text-accent-blue transition-colors duration-200 flex items-center space-x-2"
              aria-label="Back to top"
            >
              <svg 
                className="w-5 h-5" 
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
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500">
            © {new Date().getFullYear()} AniExplorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
