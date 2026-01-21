import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimeSearch } from '../../hooks/useAnimeSearch';
import SearchInput from '../search/SearchInput';
import MediaTypeToggle from '../search/MediaTypeToggle';
import SearchButton from '../search/SearchButton';
import AnimeCard from '../results/AnimeCard';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import ErrorState from '../ui/ErrorState';
import EmptyState from '../ui/EmptyState';

/**
 * LiveSearchSection component - Real backend integration for anime search
 * Uses useAnimeSearch hook to manage loading, error, and results states
 * Renders loading, error, empty, and success states with grid layout
 * Validates Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.7
 */
const LiveSearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaType, setMediaType] = useState('tv');
  const { loading, error, results, search, retry } = useAnimeSearch();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      search(searchQuery.trim(), mediaType);
    }
  };

  const handleRetry = () => {
    if (searchQuery.trim()) {
      search(searchQuery.trim(), mediaType);
    } else {
      retry();
    }
  };

  return (
    <section 
      id="live-search" 
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-near-black to-true-black"
      aria-labelledby="live-search-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            id="live-search-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white mb-4"
          >
            Try It Live
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            Search for any anime and get real recommendations powered by our ML model
          </p>
        </motion.div>

        {/* Search Controls */}
        <motion.div
          className="max-w-2xl mx-auto mb-12 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            isLoading={loading}
          />

          <MediaTypeToggle
            selected={mediaType}
            onChange={setMediaType}
          />

          <SearchButton
            onClick={handleSearch}
            isLoading={loading}
            disabled={!searchQuery.trim() || loading}
          />
        </motion.div>

        {/* Results Area */}
        <div className="mt-12">
          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <LoadingSkeleton variant="card" count={8} />
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {!loading && error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorState
                message={error}
                onRetry={handleRetry}
              />
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && results && results.similar_animes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState
                title="No similar anime found"
                message="We couldn't find any similar anime for your search. Try a different anime or media type."
                icon="search"
              />
            </motion.div>
          )}

          {/* Success State - Searched Anime */}
          {!loading && !error && results && results.anime_searched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-off-white mb-6 text-center">
                You Searched For
              </h3>
              <div className="flex justify-center">
                <AnimeCard
                  anime={results.anime_searched}
                  similarity={results.anime_searched.similarity}
                  index={0}
                  variant="searched"
                />
              </div>
            </motion.div>
          )}

          {/* Success State - Similar Anime Grid */}
          {!loading && !error && results && results.similar_animes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-off-white mb-6 text-center">
                Similar Anime Recommendations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.similar_animes.map((anime, index) => (
                  <AnimeCard
                    key={anime.anime_details.id}
                    anime={anime}
                    similarity={anime.similarity}
                    index={index}
                    variant="similar"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Initial State - No search yet */}
          {!loading && !error && !results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <EmptyState
                title="Ready to discover?"
                message="Enter an anime name above and click search to find similar recommendations."
                icon="search"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LiveSearchSection;
