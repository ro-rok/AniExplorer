import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Card component - Reusable card layout for anime and content
 * Provides consistent styling for content containers
 * Validates Requirements: 6.5, 8.2, 8.8
 */
const Card = ({ 
  children, 
  className = '',
  hover = false,
  onClick,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();

  const baseStyles = `
    bg-near-black/80 backdrop-blur-sm
    border border-off-white/10
    rounded-lg overflow-hidden
    transition-all duration-300
  `;

  const hoverStyles = hover ? `
    hover:border-accent-blue/50 hover:shadow-glow
    cursor-pointer
  ` : '';

  const clickableStyles = onClick ? 'cursor-pointer' : '';

  // Animation variants
  const animationVariants = prefersReducedMotion
    ? {}
    : hover
    ? {
        whileHover: { scale: 1.03, y: -4 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2, ease: 'easeOut' },
      }
    : {};

  return (
    <motion.div
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`.trim()}
      onClick={onClick}
      {...animationVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
