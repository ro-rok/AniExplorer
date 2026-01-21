import { useMemo } from 'react';
import { 
  computeWeightedEmbedding, 
  computeSimilarity,
  computeSimilarityWithGenreBoost 
} from '../utils/embeddingMath';

/**
 * Custom hook to calculate embedding vectors, similarity scores, and top recommendations
 * Memoizes expensive calculations to prevent unnecessary recomputation
 * 
 * @param {Record<string, number>} genreWeights - Genre group weights (e.g., { "Action/Adventure": 1.5 })
 * @param {Object} queryAnime - The reference anime object with genres array
 * @param {Array} mockDataset - Array of anime objects to compare against
 * @param {boolean} useBaseline - If true, use baseline mode (no genre weighting)
 * @returns {Object} - { embeddingVector, similarityScores, topRecommendations }
 */
export const useEmbeddingCalculation = (genreWeights, queryAnime, mockDataset, useBaseline = false) => {
  // Memoize embedding vector computation
  const embeddingVector = useMemo(() => {
    if (!queryAnime || !queryAnime.genres) {
      return [];
    }
    return computeWeightedEmbedding(queryAnime.genres, genreWeights, useBaseline);
  }, [genreWeights, queryAnime, useBaseline]);

  // Memoize similarity score calculations
  const similarityScores = useMemo(() => {
    if (!mockDataset || mockDataset.length === 0 || embeddingVector.length === 0) {
      return [];
    }
    
    return mockDataset.map((anime) => {
      const animeEmbedding = computeWeightedEmbedding(anime.genres, genreWeights, useBaseline);
      
      let score;
      if (useBaseline) {
        // Baseline mode: pure cosine similarity
        score = computeSimilarity(embeddingVector, animeEmbedding);
      } else {
        // With-genre mode: cosine similarity + genre-weighted boost
        score = computeSimilarityWithGenreBoost(
          embeddingVector,
          animeEmbedding,
          queryAnime.genres || [],
          anime.genres || [],
          genreWeights,
          false
        );
      }
      
      return { anime, score };
    });
  }, [embeddingVector, mockDataset, genreWeights, useBaseline, queryAnime]);

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
