// 6 grouped genre categories mapping to individual genres
export const GENRE_GROUPS = {
  'Action/Adventure': ['Action', 'Adventure'],
  'Drama/Romance': ['Drama', 'Romance'],
  'Comedy/Slice of Life': ['Comedy', 'Slice of Life'],
  'Fantasy/Sci-Fi': ['Fantasy', 'Sci-Fi'],
  'Psychological/Thriller': ['Psychological', 'Thriller'],
  'Horror/Mystery': ['Horror', 'Mystery']
};

// Flattened genre index (12 genres total)
export const GENRE_INDEX = {
  'Action': 0, 'Adventure': 1,
  'Drama': 2, 'Romance': 3,
  'Comedy': 4, 'Slice of Life': 5,
  'Fantasy': 6, 'Sci-Fi': 7,
  'Psychological': 8, 'Thriller': 9,
  'Horror': 10, 'Mystery': 11
};

export const EMBEDDING_DIM = Object.keys(GENRE_INDEX).length;

/**
 * Compute a weighted genre embedding vector for an anime.
 * 
 * This function creates a 12-dimensional vector representation of an anime based on its genres.
 * Each dimension corresponds to a specific genre, and the value is determined by the weight
 * assigned to the genre group that contains that genre.
 * 
 * The embedding approach mirrors the ML model's genre-weighted similarity computation:
 * - Each genre gets a position in the vector (0-11)
 * - The value at that position is the weight of the genre's group
 * - Genres not present in the anime have a value of 0
 * 
 * @param {string[]} genres - Array of genre names (e.g., ['Action', 'Adventure', 'Fantasy'])
 * @param {Object.<string, number>} [weights={}] - Genre group weights (default 1.0 for all groups)
 *   Keys are genre group names: 'Action/Adventure', 'Drama/Romance', 'Comedy/Slice of Life',
 *   'Fantasy/Sci-Fi', 'Psychological/Thriller', 'Horror/Mystery'
 *   Values are weights in range [0, 2] where 1.0 is neutral, >1.0 boosts, <1.0 diminishes
 * @returns {number[]} 12-dimensional weighted embedding vector
 * 
 * @example
 * // Create embedding for an action/adventure anime with default weights
 * const embedding = computeWeightedEmbedding(['Action', 'Adventure', 'Fantasy']);
 * // Result: [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
 * 
 * @example
 * // Boost action genres, diminish romance
 * const weights = {
 *   'Action/Adventure': 2.0,
 *   'Drama/Romance': 0.5
 * };
 * const embedding = computeWeightedEmbedding(['Action', 'Romance'], weights);
 * // Result: [2, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0]
 */
export const computeWeightedEmbedding = (genres, weights = {}) => {
  const vector = new Array(EMBEDDING_DIM).fill(0);
  
  genres.forEach((genre) => {
    const index = GENRE_INDEX[genre];
    if (index !== undefined) {
      // Find which group this genre belongs to
      let groupWeight = 1.0;
      for (const [groupName, groupGenres] of Object.entries(GENRE_GROUPS)) {
        if (groupGenres.includes(genre)) {
          groupWeight = weights[groupName] || 1.0;
          break;
        }
      }
      vector[index] = groupWeight;
    }
  });
  
  return vector;
};

/**
 * Compute the normalized dot product similarity between two vectors.
 * 
 * This function calculates the cosine similarity between two embedding vectors,
 * which is the standard metric for measuring similarity in vector space models.
 * The result is a value between 0 and 1, where:
 * - 1.0 = identical vectors (perfect similarity)
 * - 0.0 = orthogonal vectors (no similarity)
 * - Values closer to 1 indicate higher similarity
 * 
 * The computation follows these steps:
 * 1. Calculate dot product: sum of element-wise products
 * 2. Calculate magnitudes: square root of sum of squares
 * 3. Normalize: divide dot product by product of magnitudes
 * 
 * @param {number[]} vec1 - First embedding vector
 * @param {number[]} vec2 - Second embedding vector
 * @returns {number} Similarity score in range [0, 1]
 * @throws {Error} Throws an error if vectors have different lengths
 * 
 * @example
 * // Compare two identical vectors
 * const similarity = computeSimilarity([1, 0, 1], [1, 0, 1]);
 * // Result: 1.0 (perfect similarity)
 * 
 * @example
 * // Compare two orthogonal vectors
 * const similarity = computeSimilarity([1, 0, 0], [0, 1, 0]);
 * // Result: 0.0 (no similarity)
 * 
 * @example
 * // Compare two partially similar vectors
 * const similarity = computeSimilarity([1, 1, 0], [1, 0, 1]);
 * // Result: ~0.5 (moderate similarity)
 */
export const computeSimilarity = (vec1, vec2) => {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must have same length');
  }
  
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;
  
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    mag1 += vec1[i] * vec1[i];
    mag2 += vec2[i] * vec2[i];
  }
  
  mag1 = Math.sqrt(mag1);
  mag2 = Math.sqrt(mag2);
  
  if (mag1 === 0 || mag2 === 0) {
    return 0; // Avoid division by zero
  }
  
  return dotProduct / (mag1 * mag2);
};

/**
 * Normalize a vector to unit length (magnitude of 1).
 * 
 * This function scales a vector so that its magnitude (Euclidean norm) becomes 1,
 * while preserving its direction. Normalized vectors are useful for:
 * - Computing cosine similarity (already normalized)
 * - Ensuring consistent scale across different vectors
 * - Preventing numerical overflow in calculations
 * 
 * The normalization process:
 * 1. Calculate magnitude: sqrt(sum of squares of all elements)
 * 2. Divide each element by the magnitude
 * 3. If magnitude is 0, return zero vector (avoid division by zero)
 * 
 * @param {number[]} vec - Input vector to normalize
 * @returns {number[]} Normalized vector with magnitude 1 (or zero vector if input magnitude is 0)
 * 
 * @example
 * // Normalize a simple vector
 * const normalized = normalizeVector([3, 4]);
 * // Result: [0.6, 0.8] (magnitude is now 1)
 * 
 * @example
 * // Normalize a zero vector
 * const normalized = normalizeVector([0, 0, 0]);
 * // Result: [0, 0, 0] (avoids division by zero)
 * 
 * @example
 * // Normalize an embedding vector
 * const embedding = [1, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
 * const normalized = normalizeVector(embedding);
 * // Result: Each element divided by sqrt(1² + 2² + 1² + 1²) = sqrt(7)
 */
export const normalizeVector = (vec) => {
  const magnitude = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
  if (magnitude === 0) return vec.map(() => 0);
  return vec.map(v => v / magnitude);
};
