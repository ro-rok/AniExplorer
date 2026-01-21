import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * LazySection Component
 * Lazy loads sections below the fold for better performance
 * Uses Intersection Observer API to detect when section enters viewport
 * Validates Requirements: 8.5, 8.6
 */
const LazySection = ({ children, threshold = 0.1, rootMargin = '200px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={sectionRef}>
      {isVisible ? children : <div style={{ minHeight: '100vh' }} />}
    </div>
  );
};

LazySection.propTypes = {
  children: PropTypes.node.isRequired,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
};

export default LazySection;
