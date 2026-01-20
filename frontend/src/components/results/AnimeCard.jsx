import { motion } from 'framer-motion'
import { useState } from 'react'
import OptimizedImage from '../common/OptimizedImage'

const AnimeCard = ({ anime, similarity, index, variant = 'similar' }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const cardVariants = {
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
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const hoverVariants = {
    hover: {
      y: -12,
      scale: 1.03,
      rotateY: 2,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleHoverStart = () => {
    setIsHovered(true)
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
  }

  const isSearchedVariant = variant === 'searched'
  const cardWidth = isSearchedVariant ? 'max-w-sm sm:max-w-md mx-auto w-full' : 'w-full'

  return (
    <motion.div
      className={`bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl border border-gray-700 hover:border-gray-600 transition-all duration-500 ${cardWidth}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      custom={index}
      role="article"
      aria-labelledby={`anime-title-${anime.anime_details.id}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <motion.div 
        className="relative overflow-hidden group"
        variants={hoverVariants}
      >
        {/* Optimized image with loading states */}
        <OptimizedImage
          src={anime.anime_details.main_picture?.medium}
          alt={anime.anime_details.title}
          className="w-full h-48 sm:h-56 lg:h-64 transition-transform duration-500 group-hover:scale-110"
          placeholderClassName="bg-gradient-to-br from-slate-700 to-slate-800"
          errorClassName="bg-gradient-to-br from-slate-700 to-slate-800"
          lazy={index > 2} // Load first 3 images immediately, lazy load the rest
          priority={index <= 2}
        />

        {/* Enhanced similarity score badge */}
        {similarity !== undefined && (
          <motion.div 
            className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm z-10"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{(similarity * 100).toFixed(1)}%</span>
            </div>
          </motion.div>
        )}

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Enhanced content section with better typography hierarchy */}
        <div className="p-6 space-y-4">
          {/* Title with enhanced typography */}
          <motion.h3 
            id={`anime-title-${anime.anime_details.id}`}
            className={`font-bold mb-3 text-white leading-tight ${isSearchedVariant ? 'text-2xl' : 'text-xl'}`}
            whileHover={{ 
              color: '#60a5fa',
              scale: 1.02
            }}
            transition={{ duration: 0.2 }}
          >
            <span className={isExpanded || !isSearchedVariant ? '' : 'line-clamp-2'}>
              {anime.anime_details.title}
            </span>
          </motion.h3>

          {/* Enhanced rating and media type section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {anime.anime_details.mean && (
                <motion.div 
                  className="flex items-center space-x-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{anime.anime_details.mean}/10</span>
                </motion.div>
              )}
              
              {anime.anime_details.media_type && (
                <span className="text-slate-400 text-xs bg-slate-700/50 px-3 py-1 rounded-full capitalize font-medium border border-slate-600">
                  {anime.anime_details.media_type}
                </span>
              )}
            </div>

            {/* Additional info for searched variant */}
            {isSearchedVariant && anime.anime_details.rank && (
              <span className="text-slate-400 text-sm font-medium">
                Rank #{anime.anime_details.rank}
              </span>
            )}
          </div>

          {/* Enhanced synopsis with expand/collapse functionality */}
          {isSearchedVariant && anime.anime_details.synopsis && (
            <div className="space-y-2">
              <motion.p 
                className={`text-slate-300 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}
                initial={false}
                animate={{ 
                  height: isExpanded ? 'auto' : 'auto',
                  opacity: 1 
                }}
                transition={{ duration: 0.3 }}
              >
                {anime.anime_details.synopsis}
              </motion.p>
              
              {anime.anime_details.synopsis.length > 150 && (
                <motion.button
                  onClick={toggleExpanded}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{isExpanded ? 'Show less' : 'Read more'}</span>
                  <motion.svg 
                    className="w-4 h-4"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>
              )}
            </div>
          )}

          {/* Enhanced genres section */}
          {anime.anime_details.genres && anime.anime_details.genres.length > 0 && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {anime.anime_details.genres.slice(0, isExpanded ? anime.anime_details.genres.length : 3).map((genre) => (
                  <motion.span
                    key={genre.id}
                    className="text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 font-medium"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(59, 130, 246, 0.3)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {genre.name}
                  </motion.span>
                ))}
                {!isExpanded && anime.anime_details.genres.length > 3 && (
                  <motion.button
                    onClick={toggleExpanded}
                    className="text-xs text-slate-400 hover:text-slate-300 px-3 py-1 rounded-full border border-slate-600 hover:border-slate-500 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    +{anime.anime_details.genres.length - 3} more
                  </motion.button>
                )}
              </div>
            </div>
          )}

          {/* Enhanced action button */}
          <motion.a
            href={`https://myanimelist.net/anime/${anime.anime_details.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${isSearchedVariant ? 'w-full' : ''}`}
            whileHover={{ 
              scale: 1.02,
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            aria-label={`View ${anime.anime_details.title} on MyAnimeList`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>{isSearchedVariant ? 'View on MyAnimeList' : 'View Details'}</span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AnimeCard