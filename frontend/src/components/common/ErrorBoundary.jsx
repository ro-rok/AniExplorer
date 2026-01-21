import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI based on the component type
      const { fallback, componentName = 'Component' } = this.props
      
      if (fallback) {
        return fallback
      }

      // Default fallback UI
      return (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 m-4" role="alert">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <h3 className="text-red-400 font-semibold">
              {componentName} Error
            </h3>
          </div>
          <p className="text-gray-300 mb-4">
            Something went wrong while loading this component. The application will continue to work normally.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Retry loading component"
          >
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 text-xs text-gray-400">
              <summary className="cursor-pointer hover:text-gray-300">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 p-2 bg-gray-800 rounded overflow-auto">
                {this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary