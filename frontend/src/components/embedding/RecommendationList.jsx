import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * RecommendationList Component
 * Displays top recommendations with animated reordering
 * Validates Requirements: 5.6, 8.2, 8.8
 */
const RecommendationList = ({ recommendations, maxItems = 10, similarityScores = {} }) => {
  const displayRecommendations = recommendations.slice(0, maxItems);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="recommendation-list bg-near-black border border-gray-800 rounded-lg p-3 sm:p-4">
      <h3 className="text-off-white text-sm sm:text-base font-semibold mb-2 sm:mb-3">
        Top Recommendations
      </h3>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {displayRecommendations.map((anime, index) => {
            const score = similarityScores[anime.id] || 0;
            
            return (
              <motion.div
                key={anime.id}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : {
                        layout: { duration: 0.4, ease: 'easeInOut' },
                        opacity: { duration: 0.2 },
                      }
                }
                className="flex items-center justify-between p-2 sm:p-3 bg-gray-900 rounded hover:bg-gray-800 transition-colors"
              >
                {/* Rank and Title */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <span className="text-accent-blue font-bold text-xs sm:text-sm flex-shrink-0">
                    #{index + 1}
                  </span>
                  <span className="text-off-white text-xs sm:text-sm truncate">
                    {anime.title}
                  </span>
                </div>

                {/* Similarity Score */}
                <motion.span
                  className="text-gray-400 text-xs font-mono flex-shrink-0 ml-2"
                  key={`${anime.id}-${score}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
                >
                  {score.toFixed(3)}
                </motion.span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {recommendations.length > maxItems && (
        <div className="mt-3 text-gray-500 text-xs text-center">
          Showing top {maxItems} of {recommendations.length} recommendations
        </div>
      )}
    </div>
  );
};

RecommendationList.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  maxItems: PropTypes.number,
  similarityScores: PropTypes.objectOf(PropTypes.number),
};

export default RecommendationList;
