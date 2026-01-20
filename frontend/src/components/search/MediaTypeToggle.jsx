import { motion } from 'framer-motion'

const MediaTypeToggle = ({ selected, onChange }) => {
  const options = [
    { value: 'tv', label: 'TV Series', icon: '📺' },
    { value: 'movie', label: 'Movie', icon: '🎬' }
  ]

  const handleKeyDown = (e, value) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onChange(value)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      const currentIndex = options.findIndex(opt => opt.value === selected)
      const nextIndex = e.key === 'ArrowLeft' 
        ? (currentIndex - 1 + options.length) % options.length
        : (currentIndex + 1) % options.length
      onChange(options[nextIndex].value)
    }
  }

  return (
    <fieldset className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <legend className="text-sm sm:text-base font-medium text-slate-300">
        Media Type:
      </legend>
      
      <div 
        className="relative flex bg-slate-700 rounded-lg p-1 w-full sm:w-auto"
        role="radiogroup"
        aria-labelledby="media-type-legend"
      >
        {/* Background slider */}
        <motion.div
          className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md"
          initial={false}
          animate={{
            left: selected === 'tv' ? '4px' : '50%',
            width: selected === 'tv' ? 'calc(50% - 4px)' : 'calc(50% - 4px)'
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          aria-hidden="true"
        />
        
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, option.value)}
            className={`
              relative z-10 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
              flex items-center justify-center space-x-1 sm:space-x-2 flex-1 sm:flex-none sm:min-w-[100px]
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-700
              ${selected === option.value
                ? 'text-white'
                : 'text-slate-300 hover:text-white'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
            aria-pressed={selected === option.value}
            aria-checked={selected === option.value}
            role="radio"
            tabIndex={selected === option.value ? 0 : -1}
            aria-label={`Select ${option.label} media type`}
          >
            <motion.span
              initial={false}
              animate={{
                scale: selected === option.value ? 1.1 : 1,
                rotate: selected === option.value ? [0, -10, 10, 0] : 0
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
              className="text-base sm:text-lg"
              aria-hidden="true"
            >
              {option.icon}
            </motion.span>
            <span className="text-xs sm:text-sm">{option.label}</span>
          </motion.button>
        ))}
      </div>
    </fieldset>
  )
}

export default MediaTypeToggle