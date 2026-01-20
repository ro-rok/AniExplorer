import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const SearchInput = ({ value, onChange, onSubmit, isLoading = false }) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      onSubmit()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div className="relative">
      <label 
        htmlFor="anime-search" 
        className="block text-sm font-medium text-slate-300 mb-2"
      >
        Enter an anime name
      </label>
      
      <motion.div
        className="relative"
        initial={false}
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
      >
        <input
          ref={inputRef}
          id="anime-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 bg-slate-700 border-2 rounded-lg text-white 
            placeholder-slate-400 transition-all duration-300 ease-out
            focus:outline-none focus:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed
            ${isFocused 
              ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
              : 'border-slate-600 hover:border-slate-500'
            }
          `}
          placeholder="e.g., Attack on Titan, Naruto, One Piece..."
          aria-describedby="search-help"
        />
        
        {/* Focus ring effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={false}
          animate={{
            boxShadow: isFocused 
              ? '0 0 0 3px rgba(59, 130, 246, 0.1)' 
              : '0 0 0 0px rgba(59, 130, 246, 0.1)'
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
        />
        
        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </motion.div>
      
      <p id="search-help" className="text-xs text-slate-400 mt-1">
        Press Enter to search or use the search button below
      </p>
    </div>
  )
}

export default SearchInput