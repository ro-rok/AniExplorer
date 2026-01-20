import ErrorBoundary from './ErrorBoundary'

const AnimationErrorBoundary = ({ children, componentName = 'Animation' }) => {
  const fallback = (
    <div className="transition-opacity duration-300 ease-in-out" role="alert">
      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 m-2">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-black text-xs font-bold">⚠</span>
          </div>
          <span className="text-yellow-400 text-sm font-medium">
            Animation Disabled
          </span>
        </div>
        <p className="text-gray-300 text-sm">
          {componentName} animations are temporarily disabled due to an error. 
          Content is still fully functional.
        </p>
      </div>
    </div>
  )

  return (
    <ErrorBoundary 
      fallback={fallback} 
      componentName={`${componentName} Animation`}
    >
      {children}
    </ErrorBoundary>
  )
}

export default AnimationErrorBoundary