import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { GENRE_GROUPS } from '../../utils/embeddingMath';

/**
 * NetworkVisualization Component
 * SVG-based neural network visualization with deterministic layout
 * Shows: Query → Genre Groups → Embedding Vector → Similarity Output
 */
const NetworkVisualization = ({ 
  queryTitle, 
  genreWeights, 
  embeddingVector, 
  similarityScore,
  onWeightChange 
}) => {
  // Fixed positions (deterministic layout) - Neural network style
  // Layout: Query (left) → Genre Groups (middle-left) → Embedding Layer (middle-right) → Similarity + Ranking (right)
  const positions = useMemo(() => ({
    query: { x: 80, y: 300 },
    genreGroups: [
      { x: 280, y: 80, group: 'Action/Adventure' },
      { x: 280, y: 160, group: 'Drama/Romance' },
      { x: 280, y: 240, group: 'Comedy/Slice of Life' },
      { x: 280, y: 320, group: 'Fantasy/Sci-Fi' },
      { x: 280, y: 400, group: 'Psychological/Thriller' },
      { x: 280, y: 480, group: 'Horror/Mystery' },
    ],
    embedding: { x: 650, y: 300 },
    similarity: { x: 950, y: 200 },
    ranking: { x: 950, y: 400 },
  }), []);

  // Calculate connection line thickness based on weights
  const getLineThickness = (weight) => {
    return Math.max(1, weight * 2); // 1-4px range
  };

  // Calculate embedding dimension positions (8-12 nodes/bars for visualization)
  // Show 10 dimensions for better visual representation
  const embeddingDims = useMemo(() => {
    const dims = [];
    const startY = 100;
    const spacing = 35;
    const numDims = 10; // Show 10 dimensions for visual clarity
    for (let i = 0; i < numDims; i++) {
      // Map to actual embedding vector (cycle through if needed)
      const vectorIndex = i % embeddingVector.length;
      dims.push({
        index: i,
        x: 650,
        y: startY + i * spacing,
        value: embeddingVector[vectorIndex] || 0,
      });
    }
    return dims;
  }, [embeddingVector]);

  return (
    <div className="network-visualization w-full h-full min-h-[600px] relative bg-near-black rounded-card border border-hairline p-6 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 600"
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background grid for neural network feel */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a1a1a" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.2"/>
        {/* Connection Lines: Query → Genre Groups (thickness = slider value) */}
        {positions.genreGroups.map((genrePos, idx) => {
          const weight = genreWeights[genrePos.group] || 1.0;
          const thickness = getLineThickness(weight);
          const opacity = 0.3 + (weight / 2) * 0.4;
          return (
            <motion.line
              key={`query-to-genre-${idx}`}
              x1={positions.query.x + 50}
              y1={positions.query.y}
              x2={genrePos.x - 60}
              y2={genrePos.y}
              stroke="#00D9FF"
              strokeWidth={thickness}
              strokeOpacity={opacity}
              filter="url(#glow)"
              animate={{
                strokeWidth: thickness,
                strokeOpacity: opacity,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          );
        })}

        {/* Connection Lines: Genre Groups → Embedding Dimensions (fixed weights, visible) */}
        {positions.genreGroups.map((genrePos, genreIdx) => {
          const weight = genreWeights[genrePos.group] || 1.0;
          // Each genre group connects to 2 embedding dimensions (since each group has 2 genres)
          const startDimIdx = genreIdx * 2;
          return [0, 1].map((offset) => {
            const dimIdx = startDimIdx + offset;
            if (dimIdx < embeddingDims.length) {
              const dim = embeddingDims[dimIdx];
              const lineOpacity = 0.15 + (weight / 2) * 0.15;
              return (
                <motion.line
                  key={`genre-to-embed-${genreIdx}-${offset}`}
                  x1={genrePos.x + 60}
                  y1={genrePos.y}
                  x2={dim.x - 30}
                  y2={dim.y}
                  stroke="#00D9FF"
                  strokeWidth={1.5}
                  strokeOpacity={lineOpacity}
                  strokeDasharray="3,3"
                  animate={{
                    strokeOpacity: lineOpacity,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              );
            }
            return null;
          });
        })}

        {/* Connection Lines: Embedding Dimensions → Similarity (aggregate score) */}
        {embeddingDims.map((dim) => {
          const lineWidth = Math.max(0.5, dim.value * 2);
          const lineOpacity = 0.1 + dim.value * 0.25;
          return (
            <motion.line
              key={`embed-to-sim-${dim.index}`}
              x1={dim.x + 30}
              y1={dim.y}
              x2={positions.similarity.x - 30}
              y2={positions.similarity.y}
              stroke="#00D9FF"
              strokeWidth={lineWidth}
              strokeOpacity={lineOpacity}
              filter="url(#glow)"
              animate={{
                strokeWidth: lineWidth,
                strokeOpacity: lineOpacity,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          );
        })}

        {/* Query Node (left) */}
        <g>
          <motion.circle
            cx={positions.query.x}
            cy={positions.query.y}
            r="45"
            fill="#00D9FF"
            fillOpacity="0.15"
            stroke="#00D9FF"
            strokeWidth="2.5"
            filter="url(#glow)"
            animate={{
              fillOpacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <text
            x={positions.query.x}
            y={positions.query.y - 60}
            textAnchor="middle"
            fill="#f5f5f5"
            fontSize="16"
            fontWeight="700"
            className="font-heading"
          >
            Query
          </text>
          <text
            x={positions.query.x}
            y={positions.query.y + 5}
            textAnchor="middle"
            fill="#00D9FF"
            fontSize="13"
            fontWeight="600"
          >
            {queryTitle}
          </text>
        </g>

        {/* Genre Group Nodes (middle-left) */}
        {positions.genreGroups.map((genrePos, idx) => {
          const weight = genreWeights[genrePos.group] || 1.0;
          const intensity = 0.3 + (weight / 2) * 0.4;
          return (
            <g key={`genre-${idx}`}>
              <motion.rect
                x={genrePos.x - 70}
                y={genrePos.y - 35}
                width="140"
                height="70"
                rx="10"
                fill="#00D9FF"
                fillOpacity={intensity}
                stroke="#00D9FF"
                strokeWidth={weight > 1 ? 2.5 : 1.5}
                strokeOpacity={0.8}
                filter="url(#glow)"
                animate={{
                  fillOpacity: intensity,
                  strokeWidth: weight > 1 ? 2.5 : 1.5,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <text
                x={genrePos.x}
                y={genrePos.y - 8}
                textAnchor="middle"
                fill="#f5f5f5"
                fontSize="11"
                fontWeight="600"
              >
                {genrePos.group.split('/')[0]}
              </text>
              <text
                x={genrePos.x}
                y={genrePos.y + 12}
                textAnchor="middle"
                fill="#00D9FF"
                fontSize="16"
                fontWeight="700"
              >
                {weight.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Embedding Vector Dimensions (middle-right, 8-12 nodes/bars) */}
        {embeddingDims.map((dim) => {
          const barWidth = Math.max(3, dim.value * 40);
          const fillOpacity = 0.3 + dim.value * 0.5;
          return (
            <g key={`embed-dim-${dim.index}`}>
              <motion.rect
                x={dim.x - barWidth}
                y={dim.y - 10}
                width={barWidth}
                height="20"
                rx="3"
                fill="#00D9FF"
                fillOpacity={fillOpacity}
                filter="url(#glow)"
                animate={{
                  width: barWidth,
                  fillOpacity: fillOpacity,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <text
                x={dim.x - barWidth - 8}
                y={dim.y + 5}
                textAnchor="end"
                fill="#94a3b8"
                fontSize="10"
                fontWeight="500"
              >
                d{dim.index}
              </text>
            </g>
          );
        })}

        {/* Embedding Vector Label */}
        <text
          x={positions.embedding.x}
          y={50}
          textAnchor="middle"
          fill="#f5f5f5"
          fontSize="16"
          fontWeight="700"
          className="font-heading"
        >
          Embedding Layer
        </text>

        {/* Similarity Output Node (right, top) */}
        <g>
          <motion.circle
            cx={positions.similarity.x}
            cy={positions.similarity.y}
            r="55"
            fill="#00D9FF"
            fillOpacity={0.2 + (similarityScore * 0.3)}
            stroke="#00D9FF"
            strokeWidth="3"
            filter="url(#glow)"
            animate={{
              fillOpacity: 0.2 + (similarityScore * 0.3),
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          <text
            x={positions.similarity.x}
            y={positions.similarity.y - 15}
            textAnchor="middle"
            fill="#f5f5f5"
            fontSize="14"
            fontWeight="700"
            className="font-heading"
          >
            Similarity
          </text>
          <motion.text
            x={positions.similarity.x}
            y={positions.similarity.y + 18}
            textAnchor="middle"
            fill="#00D9FF"
            fontSize="22"
            fontWeight="700"
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {(similarityScore * 100).toFixed(0)}%
          </motion.text>
        </g>

        {/* Ranking Output (right, bottom) - Top 10 list placeholder */}
        <g>
          <rect
            x={positions.ranking.x - 100}
            y={positions.ranking.y - 80}
            width="200"
            height="160"
            rx="8"
            fill="#0a0a0a"
            fillOpacity="0.6"
            stroke="#00D9FF"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <text
            x={positions.ranking.x}
            y={positions.ranking.y - 60}
            textAnchor="middle"
            fill="#f5f5f5"
            fontSize="12"
            fontWeight="700"
            className="font-heading"
          >
            Top 10
          </text>
          <text
            x={positions.ranking.x}
            y={positions.ranking.y - 40}
            textAnchor="middle"
            fill="#00D9FF"
            fontSize="11"
            fontWeight="500"
          >
            Ranked Results
          </text>
          {/* Mini list indicator */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={positions.ranking.x - 80}
              y={positions.ranking.y - 20 + i * 12}
              width="160"
              height="8"
              rx="2"
              fill="#00D9FF"
              fillOpacity="0.1 + (i * 0.05)"
            />
          ))}
        </g>
      </svg>

      {/* Genre Sliders (overlay on top) */}
      <div className="absolute bottom-4 left-4 right-4 space-y-2 bg-true-black/90 backdrop-blur-sm rounded-card border border-hairline p-4">
        <div className="text-xs text-slate-300 mb-2 font-semibold">Adjust Genre Weights (0-2 range)</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(GENRE_GROUPS).map(([groupName]) => {
            const weight = genreWeights[groupName] || 1.0;
            return (
              <div key={groupName} className="flex flex-col">
                <label className="text-xs text-slate-300 mb-1 font-medium">{groupName}</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={weight}
                  onChange={(e) => onWeightChange(groupName, parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #00D9FF 0%, #00D9FF ${(weight / 2) * 100}%, #374151 ${(weight / 2) * 100}%, #374151 100%)`,
                  }}
                  aria-label={`Adjust ${groupName} weight`}
                />
                <span className="text-xs text-accent-blue mt-1 text-center font-semibold">{weight.toFixed(1)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

NetworkVisualization.propTypes = {
  queryTitle: PropTypes.string.isRequired,
  genreWeights: PropTypes.objectOf(PropTypes.number).isRequired,
  embeddingVector: PropTypes.arrayOf(PropTypes.number).isRequired,
  similarityScore: PropTypes.number.isRequired,
  onWeightChange: PropTypes.func.isRequired,
};

export default NetworkVisualization;
