import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component - Reusable card layout for anime and content
 * Provides consistent styling for content containers
 * Validates Requirements: 6.5
 */
const Card = ({ 
  children, 
  className = '',
  hover = false,
  onClick,
  ...props 
}) => {
  const baseStyles = `
    bg-near-black/80 backdrop-blur-sm
    border border-off-white/10
    rounded-lg overflow-hidden
    transition-all duration-300
  `;

  const hoverStyles = hover ? `
    hover:border-accent-blue/50 hover:shadow-glow
    hover:transform hover:scale-105
    cursor-pointer
  ` : '';

  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
