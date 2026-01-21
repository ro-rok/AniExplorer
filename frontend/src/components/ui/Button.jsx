import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button component with multiple variants and focus indicators
 * Supports primary, secondary, and ghost variants
 * Validates Requirements: 7.3
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseStyles = `
    px-6 py-3 rounded-lg font-medium transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-near-black
    disabled:opacity-50 disabled:cursor-not-allowed
    transform hover:scale-105 active:scale-95
  `;

  const variants = {
    primary: `
      bg-accent-blue text-near-black
      hover:bg-accent-blue/90 hover:shadow-glow
      focus:ring-accent-blue
    `,
    secondary: `
      bg-accent-purple text-off-white
      hover:bg-accent-purple/90 hover:shadow-glow
      focus:ring-accent-purple
    `,
    ghost: `
      bg-transparent text-off-white border-2 border-off-white/30
      hover:border-accent-blue hover:text-accent-blue
      focus:ring-accent-blue
    `,
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
