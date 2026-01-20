import { motion, AnimatePresence } from 'framer-motion'
import AnimeCard from './AnimeCard'

const ResultsGrid = ({ similarAnimes }) => {
  if (!similarAnimes || similarAnimes.length === 0) return null

  const containerVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
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
        duration: 0.5,
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
        duration: 0.5,
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
          className="text-2xl font-bold mb-6 text-center text-slate-100"
          variants={titleVariants}
        >
          Similar Anime
          <motion.span 
            className="text-slate-400 text-lg font-normal ml-2"
            variants={titleVariants}
          >
            ({similarAnimes.length} found)
          </motion.span>
        </motion.h2>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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

        {/* Loading more indicator (for future pagination) */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-400 text-sm">
            Showing top {similarAnimes.length} similar anime
          </p>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  )
}

export default ResultsGrid