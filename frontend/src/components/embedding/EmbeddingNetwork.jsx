import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { GENRE_GROUPS } from '../../utils/embeddingMath';
import { MOCK_DATASET, QUERY_ANIME } from '../../utils/mockData';
import { useEmbeddingCalculation } from '../../hooks/useEmbeddingCalculation';
import GenreNode from './GenreNode';
import ConnectionLines from './ConnectionLines';
import EmbeddingVector from './EmbeddingVector';
import SimilarityMeter from './SimilarityMeter';
import RecommendationList from './RecommendationList';
import PresetControls from './PresetControls';

/**
 * EmbeddingNetwork Component
 * Main container for the interactive embedding visualization
 */
const EmbeddingNetwork = ({ initialWeights, mockDataset }) => {
  // Initialize genre weights (default to 1.0 for all groups)
  const genreGroups = Object.keys(GENRE_GROUPS);
  const defaultWeights = genreGroups.reduce((acc, group) => {
    acc[group] = 1.0;
    return acc;
  }, {});

  const [genreWeights, setGenreWeights] = useState(initialWeights || defaultWeights);
  
  // Use the dataset provided or default to MOCK_DATASET
  const dataset = mockDataset || MOCK_DATASET;
  const queryAnime = QUERY_ANIME;

  // Use the embedding calculation hook
  const { embeddingVector, similarityScores, topRecommendations } = useEmbeddingCalculation(
    genreWeights,
    queryAnime,
    dataset
  );

  // Handle weight changes from genre nodes
  const handleWeightChange = (genreGroup, newWeight) => {
    setGenreWeights((prev) => ({
      ...prev,
      [genreGroup]: newWeight,
    }));
  };

  // Handle preset selection
  const handlePresetSelect = (presetWeights) => {
    setGenreWeights(presetWeights);
  };

  // Calculate positions for genre nodes (simple grid layout)
  const genreNodePositions = useMemo(() => {
    const cols = 3;
    const spacing = 200;
    const offsetX = 100;
    const offsetY = 150;

    return genreGroups.map((group, index) => ({
      genreGroup: group,
      position: {
        x: offsetX + (index % cols) * spacing,
        y: offsetY + Math.floor(index / cols) * spacing,
      },
    }));
  }, [genreGroups]);

  // Query anime position (center-left)
  const queryPosition = { x: 50, y: 250 };

  // Create similarity scores map for RecommendationList
  const similarityScoresMap = useMemo(() => {
    return similarityScores.reduce((acc, { anime, score }) => {
      acc[anime.id] = score;
      return acc;
    }, {});
  }, [similarityScores]);

  // Get top recommendation score for similarity meter
  const topScore = similarityScores.length > 0 ? similarityScores[0].score : 0;

  return (
    <div className="embedding-network w-full max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-off-white text-2xl font-bold mb-2">
          Interactive Embedding Network
        </h2>
        <p className="text-gray-400 text-sm">
          Adjust genre weights to see how they affect recommendations in real-time
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Visualization */}
        <div className="space-y-6">
          {/* Genre Controls with Connections */}
          <div className="relative bg-true-black border border-gray-800 rounded-lg p-6 min-h-[500px]">
            <h3 className="text-off-white text-sm font-semibold mb-4">
              Genre Weights
            </h3>

            {/* Query Anime Indicator */}
            <div
              className="absolute bg-accent-purple text-white px-3 py-2 rounded-lg text-xs font-bold"
              style={{
                left: queryPosition.x - 40,
                top: queryPosition.y - 10,
              }}
            >
              Query Anime
            </div>

            {/* Connection Lines */}
            <ConnectionLines
              queryPosition={queryPosition}
              genreNodes={genreNodePositions}
              weights={genreWeights}
            />

            {/* Genre Nodes */}
            <div className="relative">
              {genreGroups.map((group, index) => {
                const position = genreNodePositions[index].position;
                return (
                  <div
                    key={group}
                    className="absolute"
                    style={{
                      left: position.x - 80,
                      top: position.y - 40,
                    }}
                  >
                    <GenreNode
                      genreGroup={group}
                      weight={genreWeights[group]}
                      onChange={handleWeightChange}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preset Controls */}
          <PresetControls
            onPresetSelect={handlePresetSelect}
            currentWeights={genreWeights}
          />
        </div>

        {/* Right Column: Results */}
        <div className="space-y-6">
          {/* Embedding Vector */}
          <EmbeddingVector vector={embeddingVector} maxDimensions={12} />

          {/* Similarity Meter */}
          <SimilarityMeter
            score={topScore}
            label="Top Recommendation Score"
          />

          {/* Recommendation List */}
          <RecommendationList
            recommendations={topRecommendations}
            maxItems={10}
            similarityScores={similarityScoresMap}
          />
        </div>
      </div>
    </div>
  );
};

EmbeddingNetwork.propTypes = {
  initialWeights: PropTypes.objectOf(PropTypes.number),
  mockDataset: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};

export default EmbeddingNetwork;
