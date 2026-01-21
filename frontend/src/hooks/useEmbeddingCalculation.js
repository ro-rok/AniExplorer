import { useMemo } from 'react';
import { computeWeightedEmbedding, computeSimilarity } from '../utils/embeddingMath';

/**
 * Custom hook to calculate embedding vectors, similarity scores, and top recommendations
 * Memoizes expensive calculations to prevent unnecessary recomputation
 * 
 * @param {Record<string, number>} genreWeights - Genre group weights (e.g., { "Action/Adventure": 1.5 })
 * @param {Object} queryAnime - The reference anime object with genres array
 * @param {Array} mockDataset - Array of anime objects to compare against
 * @returns {Object} - { embeddingVector, similarityScores, topRecommendations }
 */
export const useEmbeddingCalculation = (genreWeights, queryAnime, mockDataset) => {
  // Memoize embedding vector computation
  const embeddingVector = useMemo(() => {
    if (!queryAnime || !queryAnime.genres) {
      return [];
    }
    return computeWeightedEmbedding(queryAnime.genres, genreWeights);
  }, [genreWeights, queryAnime]);

  // Memoize similarity score calculations
  const similarityScores = useMemo(() => {
    if (!mockDataset || mockDataset.length === 0 || embeddingVector.length === 0) {
      return [];
    }
    
    return mockDataset.map((anime) => {
      const animeEmbedding = computeWeightedEmbedding(anime.genres, genreWeights);
      const score = computeSimilarity(embeddingVector, animeEmbedding);
      return { anime, score };
    });
  }, [embeddingVector, mockDataset, genreWeights]);

  // Memoize top recommendations sorting
  const topRecommendations = useMemo(() => {
    if (similarityScores.length === 0) {
      return [];
    }
    
    return [...similarityScores]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((item) => item.anime);
  }, [similarityScores]);

  return { embeddingVector, similarityScores, topRecommendations };
};
