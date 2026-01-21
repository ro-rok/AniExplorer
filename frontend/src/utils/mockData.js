import { GENRE_GROUPS } from './embeddingMath';

// Flattened list of all genres (12 total)
export const GENRES = Object.values(GENRE_GROUPS).flat();

/**
 * Generate a mock anime object
 * @param {number} id - Anime ID
 * @returns {Object} - Mock anime data
 */
export const generateMockAnime = (id) => {
  // Randomly select 2-5 genres for this anime
  const numGenres = Math.floor(Math.random() * 4) + 2;
  const shuffledGenres = [...GENRES].sort(() => Math.random() - 0.5);
  const selectedGenres = shuffledGenres.slice(0, numGenres);
  
  return {
    id,
    title: `Anime ${id}`,
    genres: selectedGenres,
    image_url: `https://via.placeholder.com/225x350?text=Anime+${id}`,
    score: parseFloat((Math.random() * 4 + 6).toFixed(2)), // 6.00 - 10.00
    rank: Math.floor(Math.random() * 1000) + 1,
    media_type: ['tv', 'movie', 'ova'][Math.floor(Math.random() * 3)],
  };
};

// Generate 20 mock anime for the interactive demo
export const MOCK_DATASET = Array.from({ length: 20 }, (_, i) => generateMockAnime(i + 1));

// Export a query anime for the demo (first anime in the dataset)
export const QUERY_ANIME = MOCK_DATASET[0];
