import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds - increased for find_similar which makes multiple API calls
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional: add auth tokens, logging)
apiClient.interceptors.request.use(
  (config) => {
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
 * Find similar anime based on a given anime name using the backend recommendation API.
 * 
 * This function calls the FastAPI backend's `/find_similar` endpoint, which uses
 * the trained ML model to compute similarity scores between the searched anime
 * and all other anime in the database.
 * 
 * @param {string} animeName - Name of the anime to search for (e.g., "Steins;Gate")
 * @param {string} [mediaType='tv'] - Type of media to filter by. Options: 'tv', 'movie', 'ova', 'ona', 'special', 'music'
 * @returns {Promise<Object>} API response object containing:
 *   - anime_searched: {anime_details: Object, similarity: number} - The searched anime with its details
 *   - similar_animes: Array<{anime_details: Object, similarity: number}> - Array of similar anime sorted by similarity score
 * @throws {Error} Throws an error if the API request fails (network error, server error, or timeout)
 * 
 * @example
 * // Search for TV anime similar to "Steins;Gate"
 * const results = await findSimilarAnime('Steins;Gate', 'tv');
 * console.log(results.anime_searched.anime_details.title);
 * console.log(results.similar_animes[0].similarity); // Highest similarity score
 * 
 * @example
 * // Search for movies similar to "Your Name"
 * try {
 *   const results = await findSimilarAnime('Your Name', 'movie');
 *   // Handle results
 * } catch (error) {
 *   // Handle error (network failure, server error, etc.)
 *   console.error('Failed to fetch recommendations:', error);
 * }
 */
/**
 * Ping the AniExplorer service to check if it's alive.
 * This is called when the app initializes to wake up the backend service.
 * 
 * @returns {Promise<Object>} API response object containing service status
 * @throws {Error} Throws an error if the API request fails (network error, server error, or timeout)
 * 
 * @example
 * // Ping the service on app startup
 * pingAniExplorer()
 *   .then((response) => console.log('Service is alive:', response.message))
 *   .catch((error) => console.warn('Service ping failed:', error));
 */
export const pingAniExplorer = async () => {
  const response = await apiClient.get('/');
  return response.data;
};

/**
 * Find similar anime based on a given anime name using the backend recommendation API.
 * 
 * This function calls the FastAPI backend's `/find_similar` endpoint, which uses
 * the trained ML model to compute similarity scores between the searched anime
 * and all other anime in the database.
 * 
 * @param {string} animeName - Name of the anime to search for (e.g., "Steins;Gate")
 * @param {string} [mediaType='tv'] - Type of media to filter by. Options: 'tv', 'movie', 'ova', 'ona', 'special', 'music'
 * @returns {Promise<Object>} API response object containing:
 *   - anime_searched: {anime_details: Object, similarity: number} - The searched anime with its details
 *   - similar_animes: Array<{anime_details: Object, similarity: number}> - Array of similar anime sorted by similarity score
 * @throws {Error} Throws an error if the API request fails (network error, server error, or timeout)
 * 
 * @example
 * // Search for TV anime similar to "Steins;Gate"
 * const results = await findSimilarAnime('Steins;Gate', 'tv');
 * console.log(results.anime_searched.anime_details.title);
 * console.log(results.similar_animes[0].similarity); // Highest similarity score
 * 
 * @example
 * // Search for movies similar to "Your Name"
 * try {
 *   const results = await findSimilarAnime('Your Name', 'movie');
 *   // Handle results
 * } catch (error) {
 *   // Handle error (network failure, server error, etc.)
 *   console.error('Failed to fetch recommendations:', error);
 * }
 */
export const findSimilarAnime = async (animeName, mediaType = 'tv') => {
  const response = await apiClient.post('/find_similar', {
    anime_name: animeName,
    media_type: mediaType,
  });
  return response.data;
};

export default apiClient;
