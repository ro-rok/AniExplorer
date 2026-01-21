import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * SimilarityMeter Component
 * Displays similarity score with animated progress bar
 */
const SimilarityMeter = ({ score, maxScore = 1.0, label = 'Similarity Score' }) => {
  const percentage = (score / maxScore) * 100;
  const displayScore = score.toFixed(3);
  const displayPercentage = percentage.toFixed(1);

  return (
    <div className="similarity-meter bg-near-black border border-gray-800 rounded-lg p-4">
      <h3 className="text-off-white text-sm font-semibold mb-3">
        {label}
      </h3>

      {/* Numeric Score Display */}
      <div className="flex items-baseline justify-between mb-2">
        <motion.span
          className="text-accent-blue text-3xl font-bold"
          key={displayScore}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayScore}
        </motion.span>
        <span className="text-gray-400 text-sm">
          {displayPercentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-accent-blue rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            opacity: Math.max(0.5, score), // Vary opacity based on score
          }}
        />
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between mt-1 text-gray-500 text-xs">
        <span>0.0</span>
        <span>{maxScore.toFixed(1)}</span>
      </div>
    </div>
  );
};

SimilarityMeter.propTypes = {
  score: PropTypes.number.isRequired,
  maxScore: PropTypes.number,
  label: PropTypes.string,
};

export default SimilarityMeter;
