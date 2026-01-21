import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { 
  UNKNOWN_NAME_FIXES, 
  NOTEBOOK_BASELINE_RESULTS, 
  NOTEBOOK_WITH_GENRE_RESULTS,
  MOCK_DATASET 
} from '../../utils/mockData'

gsap.registerPlugin(ScrollTrigger)

/**
 * Helper to get anime data by ID
 */
const getAnimeById = (id) => MOCK_DATASET.find(a => a.id === id) || null;

/**
 * Helper to format similarity score to 3 decimals
 */
const formatSimilarity = (score) => parseFloat(score.toFixed(3));

/**
 * Showcase data with exact notebook similarity scores (3 decimals)
 * Extracted from NOTEBOOK_BASELINE_RESULTS and NOTEBOOK_WITH_GENRE_RESULTS
 */
// Build showcase data from notebook results
const buildShowcaseData = () => {
  const queries = ['One Piece', 'Your Lie in April', 'Terror in Resonance'];
  const data = {};
  
  queries.forEach(query => {
    const baselineResults = NOTEBOOK_BASELINE_RESULTS[query] || [];
    const withGenreResults = NOTEBOOK_WITH_GENRE_RESULTS[query] || [];
    
    data[query] = {
      baseline: baselineResults.map(item => {
        const anime = getAnimeById(item.id);
        return {
          id: item.id,
          title: item.title,
          similarity: formatSimilarity(item.similarity),
          genres: anime?.genres || [],
          synopsis: anime?.synopsis || '',
        };
      }),
      withGenre: withGenreResults.map(item => {
        const anime = getAnimeById(item.id);
        const resolvedTitle = item.resolvedTitle || UNKNOWN_NAME_FIXES[item.id] || item.title;
        return {
          id: item.id,
          title: item.title === 'Unknown' ? 'Unknown' : item.title,
          similarity: formatSimilarity(item.similarity),
          genres: anime?.genres || [],
          synopsis: anime?.synopsis || '',
          resolvedTitle: item.title === 'Unknown' ? resolvedTitle : undefined,
        };
      }),
      story: query === 'One Piece' 
        ? 'Genre weighting amplifies Action/Shounen signals, pushing Dragon Ball Super and similar battle-focused series to the top. The baseline finds similar adventure structures, but genre weighting narrows the focus to pure shounen action.'
        : query === 'Your Lie in April'
        ? 'Genre weighting shifts from general emotional dramas to music-focused series. The baseline captures emotional resonance, but genre weighting surfaces Kono Oto Tomare! and White Album 2—series that share the music + drama core.'
        : 'Genre weighting emphasizes Mystery/Thriller/Psychological signals, surfacing Babylon and Box of Goblins that share the dark psychological core. The baseline finds similar tone, but genre weighting narrows to pure psychological thrillers.',
    };
  });
  
  return data;
};

const SHOWCASE_DATA = buildShowcaseData();

const ShowcaseSection = () => {
  const [selectedQuery, setSelectedQuery] = useState('One Piece')
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const currentData = SHOWCASE_DATA[selectedQuery]

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-near-black"
      aria-labelledby="showcase-heading"
    >
      <div className="container mx-auto max-w-7xl">
        <h2
          ref={headingRef}
          id="showcase-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-4 sm:mb-6 text-center font-heading"
        >
          Showcase: Three queries, two brains
        </h2>
        <p className="text-base sm:text-lg text-slate-300 text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
          See how genre weighting shifts recommendations. Each query shows baseline (embedding-only) versus genre-weighted results.
        </p>

        <div ref={contentRef}>
          {/* Query Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {Object.keys(SHOWCASE_DATA).map((query) => (
              <button
                key={query}
                onClick={() => setSelectedQuery(query)}
                className={`
                  px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200
                  ${selectedQuery === query
                    ? 'bg-accent-blue text-true-black font-semibold'
                    : 'bg-true-black text-slate-300 border border-border-light hover:border-accent-blue hover:text-accent-blue'
                  }
                `}
                aria-pressed={selectedQuery === query}
              >
                {query}
              </button>
            ))}
          </div>

          {/* Before/After Comparison */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8"
            >
              {/* Baseline Card */}
              <motion.div
                layout
                className="bg-true-black rounded-card border border-border-medium p-4 sm:p-6"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-4 font-heading">
                  Baseline (No Genre)
                </h3>
                <div className="space-y-3">
                  {currentData.baseline.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-near-black rounded-lg p-3 sm:p-4 border border-border-light"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-slate-400 text-xs font-medium">{idx + 1}.</span>
                            <h4 className="text-off-white font-semibold text-sm sm:text-base">{item.title}</h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {item.genres.slice(0, 3).map((genre) => (
                              <span
                                key={genre}
                                className="text-xs px-2 py-0.5 bg-near-black border border-border-light rounded text-slate-300"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2">{item.synopsis}</p>
                        </div>
                        <div className="ml-4 text-right">
                          <span className="text-accent-blue font-bold text-lg sm:text-xl">
                            {item.similarity.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* With Genre Card */}
              <motion.div
                layout
                className="bg-true-black rounded-card border border-border-medium p-4 sm:p-6"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-4 font-heading">
                  Genre-Weighted
                </h3>
                <div className="space-y-3">
                  {currentData.withGenre.map((item, idx) => {
                    const resolvedTitle = item.resolvedTitle || UNKNOWN_NAME_FIXES[item.id] || item.title
                    const isUnknown = item.title === 'Unknown' || UNKNOWN_NAME_FIXES[item.id]
                    return (
                      <motion.div
                        key={`${item.id}-${idx}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-near-black rounded-lg p-3 sm:p-4 border border-border-light"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-slate-400 text-xs font-medium">{idx + 1}.</span>
                              <h4 className="text-off-white font-semibold text-sm sm:text-base">{resolvedTitle}</h4>
                              {isUnknown && (
                                <span className="text-xs px-2 py-0.5 bg-accent-blue/20 text-accent-blue rounded border border-accent-blue/30">
                                  Resolved
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {item.genres.slice(0, 3).map((genre) => (
                                <span
                                  key={genre}
                                  className="text-xs px-2 py-0.5 bg-near-black border border-border-light rounded text-slate-300"
                                >
                                  {genre}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs sm:text-sm text-slate-400 line-clamp-2">{item.synopsis}</p>
                          </div>
                          <div className="ml-4 text-right">
                            <span className="text-accent-blue font-bold text-lg sm:text-xl">
                              {item.similarity.toFixed(3)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Micro Story */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 sm:mt-12 bg-true-black rounded-card border border-border-medium p-4 sm:p-6"
          >
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentData.story}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ShowcaseSection
