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
 * Compute a weighted genre embedding vector
 * @param {string[]} genres - Array of genre names
 * @param {Record<string, number>} weights - Genre group weights (default 1.0)
 * @returns {number[]} - Weighted embedding vector
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
 * Compute dot product similarity (normalized)
 * @param {number[]} vec1 - First vector
 * @param {number[]} vec2 - Second vector
 * @returns {number} - Similarity score (0-1)
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
 * Normalize a vector to unit length
 * @param {number[]} vec - Input vector
 * @returns {number[]} - Normalized vector
 */
export const normalizeVector = (vec) => {
  const magnitude = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
  if (magnitude === 0) return vec.map(() => 0);
  return vec.map(v => v / magnitude);
};
