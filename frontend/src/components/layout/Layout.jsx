const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <main id="main-content" className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout