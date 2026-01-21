import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * GenreNode Component
 * Displays a genre group with an adjustable weight slider
 */
const GenreNode = ({ genreGroup, weight, onChange, position }) => {
  const handleSliderChange = (e) => {
    const newWeight = parseFloat(e.target.value);
    onChange(genreGroup, newWeight);
  };

  return (
    <motion.div
      className="genre-node flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-near-black border border-gray-800 rounded-lg hover:border-accent-blue transition-colors w-full"
      style={{
        position: position ? 'absolute' : 'relative',
        left: position?.x,
        top: position?.y,
        minHeight: '44px', // Ensure minimum touch target height
      }}
      whileHover={{ scale: position ? 1.05 : 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Genre Label and Weight Display */}
      <div className="flex items-center justify-between sm:justify-start sm:flex-col sm:items-start mb-2 sm:mb-0 sm:mr-4">
        <label
          htmlFor={`slider-${genreGroup}`}
          className="text-off-white font-medium text-sm sm:text-base text-left"
        >
          {genreGroup}
        </label>

        {/* Weight Display */}
        <div className="text-accent-blue text-lg sm:text-xl font-bold">
          {weight.toFixed(1)}
        </div>
      </div>

      {/* Weight Slider - Full width on mobile */}
      <div className="flex-1 flex items-center">
        <input
          id={`slider-${genreGroup}`}
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={weight}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{ minHeight: '44px' }} // Ensure minimum touch target height
          aria-label={`Adjust weight for ${genreGroup} (current: ${weight.toFixed(1)})`}
          aria-valuemin="0"
          aria-valuemax="2"
          aria-valuenow={weight}
        />
      </div>

      {/* Slider styling */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #00D9FF;
          cursor: pointer;
          border-radius: 50%;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #00D9FF;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }

        .slider:focus {
          outline: 2px solid #00D9FF;
          outline-offset: 2px;
        }

        /* Increase touch target size on mobile */
        @media (max-width: 640px) {
          .slider::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
          }

          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </motion.div>
  );
};

GenreNode.propTypes = {
  genreGroup: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default GenreNode;
