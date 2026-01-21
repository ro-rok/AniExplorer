import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimeSearch } from '../../hooks/useAnimeSearch';
import { useReducedMotion } from '../../hooks/useReducedMotion';
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
  const { loading, error, results, search, retry, clearResults } = useAnimeSearch();
  const resultsRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

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

  const handleClearSearch = () => {
    setSearchQuery('');
    clearResults();
    // Scroll to top of section
    const section = document.getElementById('live-search');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Auto-scroll to results after successful search
  useEffect(() => {
    if (results && !loading && resultsRef.current && !prefersReducedMotion) {
      // Small delay to ensure DOM is updated
      const timeoutId = setTimeout(() => {
        if (resultsRef.current) {
          const element = resultsRef.current;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 80; // Account for navbar
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 200);
      
      return () => clearTimeout(timeoutId);
    }
  }, [results, loading, prefersReducedMotion]);

  return (
    <section 
      id="live-search" 
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-near-black to-true-black"
      aria-labelledby="live-search-heading"
    >
      <div className="container mx-auto max-w-7xl">
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white mb-4 font-heading"
          >
            Try It Live
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-2">
            Search for any anime and get real recommendations powered by our ML model
          </p>
          <p className="text-sm text-slate-400 max-w-3xl mx-auto">
            This uses the real backend API (POST /find_similar). The Interactive Network above is a frontend simulation for education.
          </p>
        </motion.div>

        {/* Search Controls */}
        <motion.div
          className={`max-w-2xl mx-auto mb-12 space-y-6 transition-all duration-300 ${
            results 
              ? 'sticky top-20 z-40 bg-near-black/95 backdrop-blur-md border-b border-slate-800/50 pb-6 pt-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-b-lg shadow-lg' 
              : ''
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            {results && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1"
              >
                <p className="text-sm text-slate-400">
                  Results for: <span className="text-accent-blue font-semibold">{results.anime_searched?.anime_details?.title || searchQuery}</span>
                </p>
              </motion.div>
            )}
            {results && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleClearSearch}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-off-white bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-200 flex items-center gap-2"
                aria-label="Clear search and start over"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Search
              </motion.button>
            )}
          </div>
          
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
        <div ref={resultsRef} className="mt-12">
          {/* Search Query Display and Result Count */}
          {results && results.anime_searched && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center gap-3 bg-true-black/50 border border-slate-800 rounded-lg px-6 py-3">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Search Results</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-off-white">
                    {results.anime_searched.anime_details.title}
                  </h3>
                </div>
                {results.similar_animes.length > 0 && (
                  <div className="h-12 w-px bg-slate-700" />
                )}
                {results.similar_animes.length > 0 && (
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Found</p>
                    <p className="text-xl sm:text-2xl font-bold text-accent-blue">
                      {results.similar_animes.length} {results.similar_animes.length === 1 ? 'match' : 'matches'}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          {/* Loading State */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <svg className="w-8 h-8 text-accent-blue" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </motion.div>
                  <p className="mt-4 text-slate-400">Finding similar anime...</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  <LoadingSkeleton variant="card" count={8} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence mode="wait">
            {!loading && error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ErrorState
                  message={error}
                  onRetry={handleRetry}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State - No results found */}
          <AnimatePresence mode="wait">
            {!loading && !error && results && results.similar_animes.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <EmptyState
                  title="No similar anime found"
                  message="We couldn't find any similar anime for your search. Try a different anime or media type."
                  icon="search"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success State - Searched Anime */}
          <AnimatePresence mode="wait">
            {!loading && !error && results && results.anime_searched && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          </AnimatePresence>

          {/* Success State - Similar Anime Grid */}
          <AnimatePresence mode="wait">
            {!loading && !error && results && results.similar_animes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-off-white">
                    Similar Anime Recommendations
                  </h3>
                  {results.similar_animes.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue/30 rounded-lg"
                    >
                      <svg className="w-4 h-4 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold text-accent-blue">
                        {results.similar_animes.length} {results.similar_animes.length === 1 ? 'result' : 'results'}
                      </span>
                    </motion.div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
          </AnimatePresence>

          {/* Initial State - No search yet */}
          <AnimatePresence mode="wait">
            {!loading && !error && !results && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <EmptyState
                  title="Ready to discover?"
                  message="Enter an anime name above and click search to find similar recommendations."
                  icon="search"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Key Insights (merged from ResultsSection - 3 bullets max) */}
        <motion.div
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-true-black rounded-card border border-hairline p-6 sm:p-8 shadow-soft">
            <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-6 font-heading">
              Key Insights
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-accent text-xl font-bold mt-1">•</span>
                <div>
                  <p className="text-slate-300 text-sm sm:text-base">
                    <strong className="text-off-white">Genre weighting significantly impacts rankings.</strong> Adjusting weights can boost or diminish certain genres, changing which anime appear in top recommendations.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent text-xl font-bold mt-1">•</span>
                <div>
                  <p className="text-slate-300 text-sm sm:text-base">
                    <strong className="text-off-white">Baseline vs with-genre modes show different results.</strong> The baseline uses pure embedding similarity, while with-genre adds weighted boosts based on genre overlap.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent text-xl font-bold mt-1">•</span>
                <div>
                  <p className="text-slate-300 text-sm sm:text-base">
                    <strong className="text-off-white">Real-world results match the simulation.</strong> The backend API produces similar rankings to what you see in the Interactive Network, validating the approach.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveSearchSection;
