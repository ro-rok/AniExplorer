import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * ConnectionLines Component
 * Renders SVG lines from query anime to genre nodes with thickness proportional to weight
 */
const ConnectionLines = ({ queryPosition, genreNodes, weights }) => {
  if (!queryPosition || !genreNodes || genreNodes.length === 0) {
    return null;
  }

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    >
      {genreNodes.map((node) => {
        const weight = weights[node.genreGroup] || 1.0;
        const strokeWidth = Math.max(1, weight * 3); // Scale thickness: 0-6px
        const opacity = Math.max(0.2, weight / 2); // Scale opacity: 0.2-1.0

        return (
          <motion.line
            key={node.genreGroup}
            x1={queryPosition.x}
            y1={queryPosition.y}
            x2={node.position.x}
            y2={node.position.y}
            stroke="#00D9FF"
            strokeWidth={strokeWidth}
            opacity={opacity}
            strokeLinecap="round"
            initial={{ strokeWidth: 1, opacity: 0.2 }}
            animate={{ strokeWidth, opacity }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        );
      })}
    </svg>
  );
};

ConnectionLines.propTypes = {
  queryPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  genreNodes: PropTypes.arrayOf(
    PropTypes.shape({
      genreGroup: PropTypes.string.isRequired,
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
  weights: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default ConnectionLines;
