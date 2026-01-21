import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { NOTEBOOK_BASELINE_RESULTS } from '../../utils/mockData'

gsap.registerPlugin(ScrollTrigger)

/**
 * Pipeline Node Component
 */
const PipelineNode = ({ label }) => (
  <div className="flex-shrink-0 px-4 py-2 bg-gradient-to-br from-accent-blue/30 to-accent-blue/10 border border-accent-blue/50 rounded-lg text-center min-w-[100px]">
    <span className="text-sm font-medium text-off-white">{label}</span>
  </div>
)

/**
 * Pipeline Arrow Component (Horizontal)
 */
const PipelineArrow = () => (
  <div className="flex-shrink-0 flex items-center">
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 18L15 12L9 6"
        stroke="#00D9FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.5"
      />
    </svg>
  </div>
)

/**
 * Pipeline Arrow Component (Vertical)
 */
const PipelineArrowVertical = () => (
  <div className="flex-shrink-0 flex items-center">
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 9L12 15L18 9"
        stroke="#00D9FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.5"
      />
    </svg>
  </div>
)

/**
 * Proof data with exact notebook baseline similarity scores (3 decimals)
 * Extracted from NOTEBOOK_BASELINE_RESULTS
 */
const PROOF_DATA = {
  'One Piece': NOTEBOOK_BASELINE_RESULTS['One Piece'].slice(0, 3).map(item => ({
    title: item.title,
    similarity: parseFloat(item.similarity.toFixed(3))
  })),
  'Your Lie in April': NOTEBOOK_BASELINE_RESULTS['Your Lie in April'].slice(0, 3).map(item => ({
    title: item.title,
    similarity: parseFloat(item.similarity.toFixed(3))
  })),
  'Terror in Resonance': NOTEBOOK_BASELINE_RESULTS['Terror in Resonance'].slice(0, 3).map(item => ({
    title: item.title,
    similarity: parseFloat(item.similarity.toFixed(3))
  })),
}

/**
 * How It Works Section - Finale explanation of the ML approach
 * Requirements: 3.2, 4.1, 4.3, 4.4, 8.1, 8.8
 */
const HowItWorksSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const stepsRef = useRef([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Fade in heading
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

      // Stagger animation for steps
      gsap.from(stepsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      id="how-it-works" 
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-near-black"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto max-w-7xl">
        <h2 
          ref={headingRef}
          id="how-it-works-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-8 sm:mb-12 text-center font-heading"
        >
          How the AI Works
        </h2>

        <div className="space-y-8 sm:space-y-12">
          {/* Step 1: Train embeddings from behavior */}
          <div ref={el => stepsRef.current[0] = el} className="bg-true-black rounded-card border border-border-medium p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-accent-blue mb-4 font-heading">
              Step 1: Train embeddings from behavior
            </h3>
            <div className="text-base sm:text-lg text-slate-300 space-y-3">
              <p>
                Read <code className="text-accent-blue">animelist.csv</code> containing user ratings (user_id, anime_id, rating).
              </p>
              <p>
                Filtered the dataset to users with <strong className="text-off-white">≥ 400 rated anime</strong> to focus on active users.
                Normalized ratings using min-max scaling, then encoded user_id and anime_id into contiguous indices for embedding layers.
              </p>
              <p>
                Built two embedding layers: <code className="text-accent-blue">user_embedding</code> and <code className="text-accent-blue">anime_embedding</code> (embedding_size = 128).
                After training with binary_crossentropy, extracted <code className="text-accent-blue">anime_embedding</code> weights and <strong className="text-off-white">L2-normalized each row</strong>.
              </p>
            </div>
          </div>

          {/* Step 2: Find nearest neighbors */}
          <div ref={el => stepsRef.current[1] = el} className="bg-true-black rounded-card border border-border-medium p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-accent-blue mb-4 font-heading">
              Step 2: Find nearest neighbors
            </h3>
            <div className="text-base sm:text-lg text-slate-300 space-y-3">
              <p>
                Similarity is computed as <strong className="text-off-white">cosine similarity</strong> between normalized embedding vectors.
                Using <code className="text-accent-blue">Dot(normalize=True)</code> ensures the dot product is normalized, giving us cosine similarity.
              </p>
              <p>
                Recommendation <strong className="text-off-white">WITHOUT GENRE</strong> uses the dot product between normalized anime embedding vectors.
                This captures behavioral patterns: users who rate similar anime similarly will have similar embedding vectors.
              </p>
              <p className="text-sm text-slate-400 italic">
                Cosine similarity = normalized dot product, which measures the angle between vectors in high-dimensional space.
              </p>
            </div>
          </div>

          {/* Step 3: Genre weighting shifts ranking */}
          <div ref={el => stepsRef.current[2] = el} className="bg-true-black rounded-card border border-border-medium p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-accent-blue mb-4 font-heading">
              Step 3: Genre weighting shifts ranking
            </h3>
            <div className="text-base sm:text-lg text-slate-300 space-y-3">
              <p>
                Encoded genres using <code className="text-accent-blue">MultiLabelBinarizer</code> to create multi-hot genre vectors.
                Built a second model variant with weighted genres based on genre order (exponential decay notion).
              </p>
              <p>
                The weighted model uses larger embeddings (user/anime embedding_size = 512, genre_embedding_size = 256) with dense layers,
                BatchNorm, PReLU, Dropout, and Adam optimizer (lr=1e-4, clipnorm=1.0).
              </p>
              <p>
                Recommendation <strong className="text-off-white">WITH GENRE</strong> recomputes similarity using embedding similarity plus genre-weighted contribution.
                This shifts the neighborhood: anime with similar genre profiles get boosted, even if their embedding vectors differ slightly.
              </p>
              <p className="text-sm text-slate-400 italic">
                Genre weighting = embedding + genre-weighted contribution, allowing fine-tuned control over recommendation ranking.
              </p>
            </div>
          </div>

          {/* Mini Pipeline Diagram */}
          <div ref={el => stepsRef.current[3] = el} className="bg-true-black rounded-card border border-border-medium p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-accent-blue mb-6 font-heading">
              The Pipeline
            </h3>
            <div className="space-y-8">
              {/* Baseline Pipeline */}
              <div>
                <h4 className="text-lg font-semibold text-off-white mb-4">Baseline (No Genre)</h4>
                <div className="relative">
                  {/* Desktop: Horizontal Pipeline */}
                  <div className="hidden md:flex items-center justify-between gap-2">
                    <PipelineNode label="Ratings" />
                    <PipelineArrow />
                    <PipelineNode label="Embeddings" />
                    <PipelineArrow />
                    <PipelineNode label="Similarity" />
                    <PipelineArrow />
                    <PipelineNode label="Ranking" />
                    <PipelineArrow />
                    <PipelineNode label="Results" />
                  </div>
                  {/* Mobile: Vertical Pipeline */}
                  <div className="md:hidden flex flex-col items-center gap-3">
                    <PipelineNode label="Ratings" />
                    <PipelineArrowVertical />
                    <PipelineNode label="Embeddings" />
                    <PipelineArrowVertical />
                    <PipelineNode label="Similarity" />
                    <PipelineArrowVertical />
                    <PipelineNode label="Ranking" />
                    <PipelineArrowVertical />
                    <PipelineNode label="Results" />
                  </div>
                </div>
              </div>

              {/* Genre Pipeline */}
              <div>
                <h4 className="text-lg font-semibold text-off-white mb-4">With Genre Weighting</h4>
                <div className="relative">
                  {/* Desktop: Horizontal Pipeline */}
                  <div className="hidden md:flex items-center justify-between gap-2">
                    <PipelineNode label="Ratings" />
                    <PipelineArrow />
                    <PipelineNode label="Embeddings" />
                    <PipelineArrow />
                    <PipelineNode label="Similarity" />
                    <PipelineArrow />
                    <PipelineNode label="Genre Weights" />
                    <PipelineArrow />
                    <PipelineNode label="Adjusted Ranking" />
                    <PipelineArrow />
                    <PipelineNode label="Results" />
                  </div>
                  {/* Mobile: Vertical Pipeline */}
                  <div className="md:hidden flex flex-col items-center gap-3">
                    <PipelineNode label="Ratings" />
                    <PipelineArrowVertical />
                    <PipelineNode label="Embeddings" />
                    <PipelineArrowVertical />
                    <PipelineNode label="Similarity" />
                    <PipelineArrowVertical />
                    <PipelineNode label="Genre Weights" />
                    <PipelineArrowVertical />
                    <PipelineNode label="Adjusted Ranking" />
                    <PipelineArrowVertical />
                    <PipelineNode label="Results" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proof it works */}
          <div ref={el => stepsRef.current[4] = el} className="bg-true-black rounded-card border border-border-medium p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-accent-blue mb-6 font-heading">
              Proof it works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {Object.entries(PROOF_DATA).map(([query, results]) => (
                <div key={query} className="bg-near-black rounded-lg p-4 border border-border-light">
                  <h4 className="text-off-white font-semibold mb-3 text-sm sm:text-base">{query}</h4>
                  <div className="space-y-2">
                    {results.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-slate-300">{item.title}</span>
                        <span className="text-accent-blue font-bold">{item.similarity.toFixed(3)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What I actually built */}
          <div ref={el => stepsRef.current[5] = el} className="bg-true-black rounded-card border border-border-medium p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-accent-blue mb-4 font-heading">
              What I actually built in the notebook
            </h3>
            <ul className="text-base sm:text-lg text-slate-300 space-y-2 list-disc list-inside">
              <li>Filtered users with ≥ 400 rated anime</li>
              <li>Normalized ratings using min-max scaling</li>
              <li>Trained embedding model (user_embedding + anime_embedding, 128-dim)</li>
              <li>Extracted embedding weights and L2-normalized each row</li>
              <li>Computed similarity using cosine similarity (normalized dot product)</li>
              <li>Added genre-weighted variant with MultiLabelBinarizer and weighted genre contributions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
