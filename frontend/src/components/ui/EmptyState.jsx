import React from 'react';
import PropTypes from 'prop-types';

/**
 * EmptyState component - Display helpful message when no results
 * Provides user-friendly feedback for empty search results
 * Validates Requirements: 6.4
 */
const EmptyState = ({ 
  title = 'No results found',
  message = 'Try adjusting your search or filters to find what you\'re looking for.',
  icon = 'search',
  className = '' 
}) => {
  const icons = {
    search: (
      <svg
        className="w-16 h-16 text-off-white/30"
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
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    inbox: (
      <svg
        className="w-16 h-16 text-off-white/30"
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
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    ),
    folder: (
      <svg
        className="w-16 h-16 text-off-white/30"
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
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    ),
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="mb-4">
        {icons[icon] || icons.search}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-off-white mb-2">
        {title}
      </h3>

      {/* Message */}
      <p className="text-off-white/60 max-w-md">
        {message}
      </p>
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.oneOf(['search', 'inbox', 'folder']),
  className: PropTypes.string,
};

export default EmptyState;
