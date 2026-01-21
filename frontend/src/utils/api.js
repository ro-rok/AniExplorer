import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional: add auth tokens, logging)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Find similar anime based on a given anime name
 * @param {string} animeName - Name of the anime to search for
 * @param {string} mediaType - Type of media (tv, movie, ova, etc.)
 * @returns {Promise<Object>} - API response with anime_searched and similar_animes
 */
export const findSimilarAnime = async (animeName, mediaType = 'tv') => {
  const response = await apiClient.post('/find_similar', {
    anime_name: animeName,
    media_type: mediaType,
  });
  return response.data; // { anime_searched: {...}, similar_animes: [...] }
};

export default apiClient;
