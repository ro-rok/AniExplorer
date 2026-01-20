import { motion, AnimatePresence } from 'framer-motion'
import AnimeCard from './AnimeCard'

const ResultsGrid = ({ similarAnimes, searchedAnime, onClearSearch }) => {
  // Show empty state when no results and a search was performed
  const showEmptyState = searchedAnime && (!similarAnimes || similarAnimes.length === 0)
  
  // Popular anime suggestions for empty state
  const popularSuggestions = [
    "Attack on Titan",
    "Demon Slayer",
    "One Piece", 
    "Naruto",
    "Death Note",
    "My Hero Academia",
    "Spirited Away",
    "Your Name"
  ]

  const containerVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const gridVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  }

  const emptyStateVariants = {
    hidden: { 
      opacity: 0,
      y: 40
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const suggestionVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  // Empty state component
  if (showEmptyState) {
    return (
      <AnimatePresence mode="wait">
        <motion.section
          key="empty-state"
          className="mb-8 text-center"
          variants={emptyStateVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="max-w-2xl mx-auto"
            variants={emptyStateVariants}
          >
            {/* Empty state icon */}
            <motion.div
              className="mb-6"
              variants={suggestionVariants}
            >
              <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>

            {/* Empty state message */}
            <motion.h3 
              className="text-2xl font-bold text-slate-200 mb-4"
              variants={suggestionVariants}
            >
              No Similar Anime Found
            </motion.h3>
            
            <motion.p 
              className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base"
              variants={suggestionVariants}
            >
              We couldn't find any anime similar to "{searchedAnime?.title}". 
              Try searching for a different anime or check out these popular suggestions:
            </motion.p>

            {/* Popular suggestions */}
            <motion.div
              className="mb-6 sm:mb-8"
              variants={suggestionVariants}
            >
              <h4 className="text-base sm:text-lg font-semibold text-slate-300 mb-3 sm:mb-4">Popular Anime to Try:</h4>
              <motion.div 
                className="flex flex-wrap justify-center gap-2"
                variants={gridVariants}
              >
                {popularSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    className="px-3 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-full text-xs sm:text-sm transition-colors duration-200 hover:text-white"
                    variants={suggestionVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // This would trigger a new search with the suggestion
                      // For now, we'll just show the suggestion was clicked
                      console.log(`Suggested search: ${suggestion}`)
                    }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Clear search button */}
            <motion.button
              className="px-4 sm:px-6 py-2 sm:py-3 btn-primary rounded-lg font-medium text-sm sm:text-base transition-colors duration-200"
              variants={suggestionVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClearSearch}
            >
              Try Another Search
            </motion.button>
          </motion.div>
        </motion.section>
      </AnimatePresence>
    )
  }

  // Results grid (existing functionality)
  if (!similarAnimes || similarAnimes.length === 0) return null

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="results-grid"
        className="mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        aria-labelledby="similar-anime-heading"
      >
        <motion.h2 
          id="similar-anime-heading"
          className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center text-slate-100"
          variants={titleVariants}
        >
          Similar Anime
          <motion.span 
            className="text-slate-400 text-base sm:text-lg font-normal ml-2"
            variants={titleVariants}
          >
            ({similarAnimes.length} found)
          </motion.span>
        </motion.h2>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6"
          variants={gridVariants}
        >
          <AnimatePresence>
            {similarAnimes.map((anime, index) => (
              <motion.div
                key={`${anime.anime_details.id}-${index}`}
                variants={itemVariants}
                layout
                layoutId={`anime-card-${anime.anime_details.id}`}
              >
                <AnimeCard
                  anime={anime}
                  similarity={anime.similarity}
                  index={index}
                  variant="similar"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Results summary */}
        <motion.div
          className="text-center mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-400 text-xs sm:text-sm">
            Showing top {similarAnimes.length} similar anime
          </p>
          
          {/* Clear search button */}
          <motion.button
            className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm underline transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearSearch}
          >
            Clear Search
          </motion.button>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  )
}

export default ResultsGrid