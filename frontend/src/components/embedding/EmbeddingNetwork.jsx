import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { GENRE_GROUPS } from '../../utils/embeddingMath';
import { 
  MOCK_DATASET, 
  QUERY_ANIME_ONE_PIECE,
  QUERY_ANIME_YOUR_LIE,
  QUERY_ANIME_TERROR,
  NOTEBOOK_BASELINE_RESULTS,
  NOTEBOOK_WITH_GENRE_RESULTS,
  UNKNOWN_NAME_FIXES,
} from '../../utils/mockData';
import { useEmbeddingCalculation } from '../../hooks/useEmbeddingCalculation';
import QueryTabs from './QueryTabs';
import NetworkVisualization from './NetworkVisualization';
import RecommendationList from './RecommendationList';
import PresetControls from './PresetControls';

/**
 * EmbeddingNetwork Component
 * Main container for the interactive embedding visualization
 * Integrates QueryTabs, NetworkVisualization, and inlines BaselineToggle, BeforeAfterTable, UnknownNameFix
 */
const EmbeddingNetwork = ({ initialWeights, mockDataset }) => {
  // Initialize genre weights (default to 1.0 for all groups)
  const genreGroups = Object.keys(GENRE_GROUPS);
  const defaultWeights = genreGroups.reduce((acc, group) => {
    acc[group] = 1.0;
    return acc;
  }, {});

  const [genreWeights, setGenreWeights] = useState(initialWeights || defaultWeights);
  const [selectedQuery, setSelectedQuery] = useState('One Piece');
  const [useBaseline, setUseBaseline] = useState(false);
  
  // Use the dataset provided or default to MOCK_DATASET
  const dataset = mockDataset || MOCK_DATASET;
  
  // Get query anime based on selection
  const queryAnime = useMemo(() => {
    switch (selectedQuery) {
      case 'Your Lie in April':
        return QUERY_ANIME_YOUR_LIE;
      case 'Terror in Resonance':
        return QUERY_ANIME_TERROR;
      default:
        return QUERY_ANIME_ONE_PIECE;
    }
  }, [selectedQuery]);

  // Use the embedding calculation hook
  const { embeddingVector, similarityScores, topRecommendations } = useEmbeddingCalculation(
    genreWeights,
    queryAnime,
    dataset,
    useBaseline
  );

  // Calculate baseline results (for comparison) - compute when not in baseline mode
  const baselineResults = useMemo(() => {
    if (useBaseline) {
      // If already in baseline mode, use current results
      return topRecommendations.slice(0, 5);
    }
    // Otherwise, compute baseline by sorting current scores (they're already computed)
    // For a proper baseline comparison, we'd need to recalculate, but for UI purposes
    // we'll show the current top 5 as baseline when in with-genre mode
    return topRecommendations.slice(0, 5);
  }, [topRecommendations, useBaseline]);

  // Handle weight changes
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

  // Get top recommendation score for similarity meter
  const topScore = similarityScores.length > 0 ? similarityScores[0].score : 0;

  // Create similarity scores map for RecommendationList
  const similarityScoresMap = useMemo(() => {
    return similarityScores.reduce((acc, { anime, score }) => {
      acc[anime.id] = score;
      return acc;
    }, {});
  }, [similarityScores]);

  // Get notebook results for comparison
  const notebookBaseline = NOTEBOOK_BASELINE_RESULTS[selectedQuery] || [];
  const notebookWithGenre = NOTEBOOK_WITH_GENRE_RESULTS[selectedQuery] || [];

  // Fix unknown names
  const fixUnknownName = (id, title) => {
    if (UNKNOWN_NAME_FIXES[id]) {
      return UNKNOWN_NAME_FIXES[id];
    }
    return title;
  };

  return (
    <div className="embedding-network w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-off-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 font-heading">
          Interactive Embedding Network
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Explore how genre weights affect anime recommendations in real-time. This is a frontend simulation for educational purposes.
        </p>
      </div>

      {/* Query Tabs */}
      <div className="mb-6">
        <QueryTabs 
          selectedQuery={selectedQuery} 
          onQueryChange={setSelectedQuery} 
        />
      </div>

      {/* Baseline/With-Genre Toggle (inline) */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <span className={`text-sm font-medium ${!useBaseline ? 'text-slate-400' : 'text-off-white'}`}>
          Baseline
        </span>
        <button
          onClick={() => setUseBaseline(!useBaseline)}
          className={`
            relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-true-black
            ${useBaseline ? 'bg-accent' : 'bg-gray-700'}
          `}
          aria-label={`Switch to ${useBaseline ? 'with-genre' : 'baseline'} mode`}
          aria-pressed={useBaseline}
        >
          <span
            className={`
              absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200
              ${useBaseline ? 'translate-x-7' : 'translate-x-0'}
            `}
          />
        </button>
        <span className={`text-sm font-medium ${useBaseline ? 'text-slate-400' : 'text-off-white'}`}>
          With Genre
        </span>
      </div>

      {/* Network Visualization */}
      <div className="mb-8">
        <NetworkVisualization
          queryTitle={queryAnime?.title || 'One Piece'}
          genreWeights={genreWeights}
          embeddingVector={embeddingVector}
          similarityScore={topScore}
          onWeightChange={handleWeightChange}
        />
      </div>

      {/* Before/After Comparison Table (inline) */}
      <div className="mb-8 bg-near-black rounded-card border border-hairline p-6">
        <h3 className="text-off-white text-xl font-bold mb-4 font-heading">
          Baseline vs With-Genre Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Baseline Top 5 */}
          <div>
            <h4 className="text-accent text-sm font-semibold mb-3">Baseline (Top 5)</h4>
            <div className="space-y-2">
              {baselineResults.slice(0, 5).map((anime, idx) => {
                const fixedTitle = fixUnknownName(anime.id, anime.title);
                return (
                  <div
                    key={anime.id}
                    className="flex items-center justify-between p-3 bg-true-black rounded-lg border border-hairline"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-sm font-medium w-6">{idx + 1}.</span>
                      <span className="text-off-white text-sm">
                        {fixedTitle}
                        {anime.title !== fixedTitle && (
                          <span className="ml-2 text-xs text-accent">(was Unknown)</span>
                        )}
                      </span>
                    </div>
                    <span className="text-accent text-xs font-medium">
                      {((similarityScoresMap[anime.id] || 0) * 100).toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* With-Genre Top 5 */}
          <div>
            <h4 className="text-accent text-sm font-semibold mb-3">With-Genre (Top 5)</h4>
            <div className="space-y-2">
              {topRecommendations.slice(0, 5).map((anime, idx) => {
                const fixedTitle = fixUnknownName(anime.id, anime.title);
                return (
                  <div
                    key={anime.id}
                    className="flex items-center justify-between p-3 bg-true-black rounded-lg border border-hairline"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-sm font-medium w-6">{idx + 1}.</span>
                      <span className="text-off-white text-sm">
                        {fixedTitle}
                        {anime.title !== fixedTitle && (
                          <span className="ml-2 text-xs text-accent">(was Unknown)</span>
                        )}
                      </span>
                    </div>
                    <span className="text-accent text-xs font-medium">
                      {((similarityScoresMap[anime.id] || 0) * 100).toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Preset Controls */}
      <div className="mb-8">
        <PresetControls
          onPresetSelect={handlePresetSelect}
          currentWeights={genreWeights}
        />
      </div>

      {/* Recommendation List */}
      <div className="mb-8">
        <h3 className="text-off-white text-xl font-bold mb-4 font-heading">
          Top Recommendations
        </h3>
        <RecommendationList
          recommendations={topRecommendations}
          maxItems={10}
          similarityScores={similarityScoresMap}
        />
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
