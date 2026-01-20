import { motion } from 'framer-motion'
import { useState } from 'react'

const AnimeCard = ({ anime, similarity, index, variant = 'similar' }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
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

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
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
        className="relative overflow-hidden"
        variants={hoverVariants}
      >
        {/* Image container with loading state */}
        <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-slate-700">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="loading-spinner animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2"></div>
            </div>
          )}
          
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
              <div className="text-center text-slate-400">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">Image not available</p>
              </div>
            </div>
          ) : (
            <motion.img
              src={anime.anime_details.main_picture?.medium}
              alt={anime.anime_details.title}
              className="w-full h-48 sm:h-56 lg:h-64 object-cover"
              variants={imageVariants}
              initial="hidden"
              animate={imageLoaded ? "visible" : "hidden"}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          )}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          <motion.h3 
            id={`anime-title-${anime.anime_details.id}`}
            className={`font-semibold mb-2 line-clamp-2 text-slate-100 ${isSearchedVariant ? 'text-lg sm:text-xl' : 'text-sm sm:text-base lg:text-lg'}`}
            whileHover={{ color: '#60a5fa' }}
            transition={{ duration: 0.2 }}
          >
            {anime.anime_details.title}
          </motion.h3>

          {/* Rating and similarity info */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-2 sm:space-y-0">
            {similarity !== undefined && (
              <motion.span 
                className="text-green-400 font-medium text-xs sm:text-sm bg-green-400/10 px-2 py-1 rounded-full w-fit"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {(similarity * 100).toFixed(1)}% match
              </motion.span>
            )}
            
            <div className="flex items-center space-x-2">
              {anime.anime_details.mean && (
                <span className="text-slate-300 text-xs sm:text-sm flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {anime.anime_details.mean}/10
                </span>
              )}
              
              {anime.anime_details.media_type && (
                <span className="text-slate-400 text-xs bg-slate-700 px-2 py-1 rounded capitalize">
                  {anime.anime_details.media_type}
                </span>
              )}
            </div>
          </div>

          {/* Synopsis preview for searched anime */}
          {isSearchedVariant && anime.anime_details.synopsis && (
            <p className="text-slate-300 text-xs sm:text-sm mb-3 line-clamp-3">
              {anime.anime_details.synopsis}
            </p>
          )}

          {/* Genres */}
          {anime.anime_details.genres && anime.anime_details.genres.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {anime.anime_details.genres.slice(0, isSearchedVariant ? 4 : 3).map((genre) => (
                  <span
                    key={genre.id}
                    className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
                {anime.anime_details.genres.length > (isSearchedVariant ? 4 : 3) && (
                  <span className="text-xs text-slate-400 px-2 py-1">
                    +{anime.anime_details.genres.length - (isSearchedVariant ? 4 : 3)} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action button */}
          <motion.a
            href={`https://myanimelist.net/anime/${anime.anime_details.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block btn-primary px-3 sm:px-4 py-2 rounded text-xs sm:text-sm transition-colors font-medium ${isSearchedVariant ? 'w-full text-center' : ''}`}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#1d4ed8'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label={`View ${anime.anime_details.title} on MyAnimeList`}
          >
            {isSearchedVariant ? 'View on MyAnimeList' : 'View Details'}
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AnimeCard