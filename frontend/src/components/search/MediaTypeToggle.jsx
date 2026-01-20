import { motion } from 'framer-motion'

const MediaTypeToggle = ({ selected, onChange }) => {
  const options = [
    { value: 'tv', label: 'TV Series', icon: '📺' },
    { value: 'movie', label: 'Movie', icon: '🎬' }
  ]

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-slate-300">Media Type:</span>
      
      <div className="relative flex bg-slate-700 rounded-lg p-1">
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
        />
        
        {options.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              relative z-10 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
              flex items-center space-x-2 min-w-[100px] justify-center
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
            role="radio"
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
            >
              {option.icon}
            </motion.span>
            <span>{option.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default MediaTypeToggle