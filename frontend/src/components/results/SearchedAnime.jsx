import { motion } from 'framer-motion'
import AnimeCard from './AnimeCard'

const SearchedAnime = ({ searchedAnime, onClearSearch }) => {
  if (!searchedAnime) return null

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.section
      className="mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-labelledby="search-result-heading"
    >
      <motion.div
        className="text-center mb-6"
        variants={titleVariants}
      >
        <h2 
          id="search-result-heading"
          className="text-2xl font-bold text-slate-100 mb-2"
        >
          Search Result
        </h2>
        <motion.p 
          className="text-slate-400 text-sm"
          variants={titleVariants}
        >
          Found: "{searchedAnime.title}"
        </motion.p>
      </motion.div>
      
      <motion.div
        variants={cardVariants}
        className="flex justify-center mb-6"
      >
        <AnimeCard
          anime={searchedAnime}
          index={0}
          variant="searched"
        />
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="flex justify-center space-x-4"
        variants={titleVariants}
      >
        <motion.button
          className="px-4 py-2 text-blue-400 hover:text-blue-300 text-sm underline transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearSearch}
        >
          Search Different Anime
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default SearchedAnime