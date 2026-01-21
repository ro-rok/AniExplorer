import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * QueryTabs Component
 * Tab interface for selecting between One Piece, Your Lie in April, and Terror in Resonance queries
 */
const QueryTabs = ({ selectedQuery, onQueryChange }) => {
  const queries = [
    { id: 'one-piece', label: 'One Piece', value: 'One Piece' },
    { id: 'your-lie', label: 'Your Lie in April', value: 'Your Lie in April' },
    { id: 'terror', label: 'Terror in Resonance', value: 'Terror in Resonance' },
  ];

  return (
    <div className="query-tabs w-full">
      <div className="flex gap-2 border-b border-hairline pb-2">
        {queries.map((query) => {
          const isActive = selectedQuery === query.value;
          return (
            <button
              key={query.id}
              onClick={() => onQueryChange(query.value)}
              className={`
                relative px-6 py-3 text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'text-accent' 
                  : 'text-slate-400 hover:text-off-white'
                }
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-true-black
              `}
              aria-label={`Select ${query.label} as query`}
              aria-pressed={isActive}
            >
              {query.label}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

QueryTabs.propTypes = {
  selectedQuery: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};

export default QueryTabs;
