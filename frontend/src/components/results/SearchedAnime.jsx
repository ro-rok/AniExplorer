import { motion } from 'framer-motion'
import AnimeCard from './AnimeCard'

const SearchedAnime = ({ searchedAnime }) => {
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

  return (
    <motion.section
      className="mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-labelledby="search-result-heading"
    >
      <motion.h2 
        id="search-result-heading"
        className="text-2xl font-bold mb-6 text-center text-slate-100"
        variants={titleVariants}
      >
        Search Result
      </motion.h2>
      
      <motion.div
        variants={titleVariants}
        className="flex justify-center"
      >
        <AnimeCard
          anime={searchedAnime}
          index={0}
          variant="searched"
        />
      </motion.div>
    </motion.section>
  )
}

export default SearchedAnime