import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Preset configurations based on 6 grouped genre categories
// Using real anime examples from the recommendation system
const PRESETS = [
  {
    name: 'One Piece Style',
    description: 'Action-packed adventures like One Piece, Naruto, Bleach',
    weights: {
      'Action/Adventure': 2.0,
      'Fantasy/Sci-Fi': 1.5,
      'Drama/Romance': 0.5,
      'Comedy/Slice of Life': 0.8,
      'Psychological/Thriller': 0.7,
      'Horror/Mystery': 0.6,
    },
  },
  {
    name: 'Your Lie in April',
    description: 'Emotional dramas like Your Lie in April, Your Name, A Silent Voice',
    weights: {
      'Drama/Romance': 2.0,
      'Comedy/Slice of Life': 1.3,
      'Action/Adventure': 0.5,
      'Fantasy/Sci-Fi': 0.6,
      'Psychological/Thriller': 0.8,
      'Horror/Mystery': 0.4,
    },
  },
  {
    name: 'Terror in Resonance',
    description: 'Dark psychological thrillers like Terror in Resonance, ERASED, Psycho-Pass',
    weights: {
      'Psychological/Thriller': 2.0,
      'Horror/Mystery': 1.5,
      'Drama/Romance': 1.2,
      'Action/Adventure': 0.8,
      'Fantasy/Sci-Fi': 0.7,
      'Comedy/Slice of Life': 0.3,
    },
  },
];

/**
 * PresetControls Component
 * Provides preset buttons to quickly apply genre weight configurations
 */
const PresetControls = ({ onPresetSelect, currentWeights }) => {
  const handlePresetClick = (preset) => {
    onPresetSelect(preset.weights);
  };

  // Check if current weights match a preset (for highlighting)
  const isPresetActive = (preset) => {
    if (!currentWeights) return false;
    
    return Object.entries(preset.weights).every(
      ([genre, weight]) => Math.abs((currentWeights[genre] || 1.0) - weight) < 0.1
    );
  };

  return (
    <div className="preset-controls">
      <h3 className="text-off-white text-sm font-semibold mb-3">
        Quick Presets
      </h3>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        {PRESETS.map((preset) => {
          const isActive = isPresetActive(preset);
          
          return (
            <motion.button
              key={preset.name}
              onClick={() => handlePresetClick(preset)}
              className={`
                px-4 py-3 rounded-lg font-medium text-sm sm:text-base
                transition-all duration-200 w-full sm:w-auto
                min-h-[44px] flex items-center justify-center
                ${
                  isActive
                    ? 'bg-accent-blue text-near-black'
                    : 'bg-gray-800 text-off-white hover:bg-gray-700'
                }
                focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-near-black
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Apply ${preset.name} preset: ${preset.description}`}
              title={preset.description}
            >
              {preset.name}
            </motion.button>
          );
        })}
      </div>

      <p className="text-gray-400 text-xs mt-3">
        Click a preset to instantly adjust all genre weights
      </p>
    </div>
  );
};

PresetControls.propTypes = {
  onPresetSelect: PropTypes.func.isRequired,
  currentWeights: PropTypes.objectOf(PropTypes.number),
};

export default PresetControls;
export { PRESETS };
