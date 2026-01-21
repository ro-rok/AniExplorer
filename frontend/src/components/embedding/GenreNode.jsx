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
      className="genre-node flex flex-col items-center p-4 bg-near-black border border-gray-800 rounded-lg hover:border-accent-blue transition-colors"
      style={{
        position: position ? 'absolute' : 'relative',
        left: position?.x,
        top: position?.y,
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Genre Label */}
      <label
        htmlFor={`slider-${genreGroup}`}
        className="text-off-white font-medium text-sm mb-2 text-center"
      >
        {genreGroup}
      </label>

      {/* Weight Display */}
      <div className="text-accent-blue text-lg font-bold mb-2">
        {weight.toFixed(1)}
      </div>

      {/* Weight Slider */}
      <input
        id={`slider-${genreGroup}`}
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={weight}
        onChange={handleSliderChange}
        className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        aria-label={`Adjust weight for ${genreGroup} (current: ${weight.toFixed(1)})`}
        aria-valuemin="0"
        aria-valuemax="2"
        aria-valuenow={weight}
      />

      {/* Slider styling */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #00D9FF;
          cursor: pointer;
          border-radius: 50%;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #00D9FF;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }

        .slider:focus {
          outline: 2px solid #00D9FF;
          outline-offset: 2px;
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
