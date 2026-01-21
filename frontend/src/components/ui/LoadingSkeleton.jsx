import PropTypes from 'prop-types';

/**
 * LoadingSkeleton component - Animated skeleton for loading states
 * Provides visual feedback during data fetching
 * Validates Requirements: 6.2
 */
const LoadingSkeleton = ({ 
  variant = 'card',
  count = 1,
  className = '' 
}) => {
  const baseStyles = `
    bg-gradient-to-r from-near-black via-off-white/10 to-near-black
    bg-[length:200%_100%]
    animate-[shimmer_2s_ease-in-out_infinite]
    rounded
  `;

  const variants = {
    card: 'h-96 w-full',
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    circle: 'h-12 w-12 rounded-full',
    button: 'h-12 w-32',
  };

  const variantStyles = variants[variant] || variants.card;

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${baseStyles} ${variantStyles} ${className}`.trim()}
          role="status"
          aria-label="Loading..."
        />
      ))}
    </>
  );
};

LoadingSkeleton.propTypes = {
  variant: PropTypes.oneOf(['card', 'text', 'title', 'circle', 'button']),
  count: PropTypes.number,
  className: PropTypes.string,
};

export default LoadingSkeleton;
