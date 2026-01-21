import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * ErrorState component - Display error message with retry button
 * Provides user-friendly error handling with retry functionality
 * Validates Requirements: 6.3
 */
const ErrorState = ({ 
  message = 'Something went wrong. Please try again.',
  onRetry,
  className = '' 
}) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`.trim()}
      role="alert"
      aria-live="polite"
    >
      {/* Error Icon */}
      <div className="mb-4">
        <svg
          className="w-16 h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Error Message */}
      <h3 className="text-xl font-semibold text-off-white mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-off-white/70 mb-6 max-w-md">
        {message}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <Button 
          variant="primary" 
          onClick={onRetry}
          aria-label="Retry the failed operation"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

ErrorState.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
  className: PropTypes.string,
};

export default ErrorState;
