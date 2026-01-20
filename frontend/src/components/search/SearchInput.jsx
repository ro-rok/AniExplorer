import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SearchInput = ({ value, onChange, onSubmit, isLoading = false }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(null)
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

  const handleChange = (newValue) => {
    onChange(newValue)
    
    // Set typing state
    setIsTyping(true)
    
    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    
    // Set new timeout to clear typing state
    const timeout = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
    
    setTypingTimeout(timeout)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
    }
  }, [typingTimeout])

  // Character count and validation
  const characterCount = value.length
  const maxCharacters = 100
  const isNearLimit = characterCount > maxCharacters * 0.8
  const isOverLimit = characterCount > maxCharacters

  return (
    <div className="relative">
      <label 
        htmlFor="anime-search" 
        className="block text-sm sm:text-base font-medium text-slate-300 mb-2"
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
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isLoading}
          maxLength={maxCharacters}
          className={`
            w-full px-3 sm:px-4 py-3 sm:py-4 form-input rounded-lg text-sm sm:text-base
            transition-all duration-300 ease-out
            focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
            ${isFocused 
              ? isOverLimit 
                ? 'border-red-500 shadow-lg shadow-red-500/20' 
                : 'border-blue-500 shadow-lg shadow-blue-500/20'
              : 'border-slate-600 hover:border-slate-500'
            }
            ${isOverLimit ? 'border-red-500' : ''}
          `}
          placeholder="e.g., Attack on Titan, Naruto, One Piece..."
          aria-describedby="search-help search-feedback"
          aria-invalid={isOverLimit}
          aria-label="Enter anime name to search for similar recommendations"
        />
        
        {/* Focus ring effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={false}
          animate={{
            boxShadow: isFocused 
              ? isOverLimit
                ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
                : '0 0 0 3px rgba(59, 130, 246, 0.1)' 
              : '0 0 0 0px rgba(59, 130, 246, 0.1)'
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        />
        
        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && !isLoading && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex space-x-1">
                <motion.div
                  className="w-1 h-1 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-1 h-1 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-1 h-1 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Loading indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-5 h-5 loading-spinner border-2 rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 space-y-1 sm:space-y-0">
        <p id="search-help" className="text-xs sm:text-sm text-slate-400">
          Press Enter to search or use the search button below
        </p>
        
        {/* Character count and feedback */}
        <AnimatePresence>
          {(isFocused || characterCount > 0) && (
            <motion.div
              id="search-feedback"
              className="text-xs flex items-center space-x-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Character count */}
              <span className={`
                ${isOverLimit ? 'text-red-400' : isNearLimit ? 'text-yellow-400' : 'text-slate-400'}
              `}>
                {characterCount}/{maxCharacters}
              </span>
              
              {/* Validation feedback */}
              {isOverLimit && (
                <motion.span
                  className="text-red-400 flex items-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Too long
                </motion.span>
              )}
              
              {/* Typing feedback */}
              {isTyping && !isOverLimit && (
                <motion.span
                  className="text-blue-400 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Typing...
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SearchInput