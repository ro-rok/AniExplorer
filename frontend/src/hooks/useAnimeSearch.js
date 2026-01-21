import { useState, useCallback } from 'react';
import { findSimilarAnime } from '../utils/api';

/**
 * Custom hook to manage anime search state and API calls
 * Handles loading, error, and results states with retry functionality
 * 
 * @returns {Object} - { loading, error, results, search, retry }
 */
export const useAnimeSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  /**
   * Search for similar anime
   * @param {string} animeName - Name of the anime to search for
   * @param {string} mediaType - Type of media (tv, movie, ova, etc.)
   */
  const search = useCallback(async (animeName, mediaType) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await findSimilarAnime(animeName, mediaType);
      setResults(data);
    } catch (err) {
      // Extract error message from response or use default
      const errorMessage = err.response?.data?.detail || 
                          err.message || 
                          'Failed to fetch recommendations';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Retry the last search
   */
  const retry = useCallback(() => {
    if (results) {
      search(results.anime_searched.title, results.anime_searched.media_type);
    }
  }, [results, search]);

  /**
   * Clear search results and reset state
   */
  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return { loading, error, results, search, retry, clearResults };
};
