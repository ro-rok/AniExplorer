import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * EmbeddingVector Component
 * Displays a bar chart showing embedding dimensions with animated height changes
 */
const EmbeddingVector = ({ vector, maxDimensions = 12 }) => {
  // Limit to maxDimensions for display
  const displayVector = vector.slice(0, maxDimensions);
  
  // Find max value for scaling
  const maxValue = Math.max(...displayVector, 0.1); // Avoid division by zero

  return (
    <div className="embedding-vector bg-near-black border border-gray-800 rounded-lg p-4">
      <h3 className="text-off-white text-sm font-semibold mb-3">
        Embedding Vector
      </h3>
      
      <div className="flex items-end justify-between gap-1 h-32">
        {displayVector.map((value, index) => {
          const heightPercent = (value / maxValue) * 100;
          
          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center justify-end"
              title={`Dimension ${index}: ${value.toFixed(2)}`}
            >
              <motion.div
                className="w-full bg-accent-blue rounded-t"
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ minHeight: value > 0 ? '2px' : '0' }}
              />
              <span className="text-gray-500 text-xs mt-1">{index}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-2 text-gray-400 text-xs text-center">
        Showing {displayVector.length} dimensions
      </div>
    </div>
  );
};

EmbeddingVector.propTypes = {
  vector: PropTypes.arrayOf(PropTypes.number).isRequired,
  maxDimensions: PropTypes.number,
};

export default EmbeddingVector;
