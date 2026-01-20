import { motion } from 'framer-motion'
import { useGSAP } from '../../hooks/useGSAP'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CodeSnippet from './CodeSnippet'
import ModelArchitecture from './ModelArchitecture'
import PerformanceMetrics from './PerformanceMetrics'
import { fadeInUp, staggerContainer } from '../../utils/animations'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const ModelShowcase = () => {
  const showcaseRef = useGSAP((element) => {
    // Main sections animation
    gsap.fromTo(element.querySelectorAll('.model-section'),
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Code snippets staggered animation
    gsap.fromTo(element.querySelectorAll('.code-snippet'),
      { opacity: 0, x: -50, rotateY: -15 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element.querySelector('.model-section'),
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Statistics cards animation
    gsap.fromTo(element.querySelectorAll('.stat-card'),
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element.querySelector('.stats-section'),
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Genre weight bars animation
    gsap.fromTo(element.querySelectorAll('.weight-bar'),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element.querySelector('.genre-weights'),
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Parallax effect for background elements
    gsap.to(element.querySelectorAll('.parallax-bg'), {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
  })

  return (
    <section ref={showcaseRef} className="py-20 bg-gray-900 relative overflow-hidden" id="model-showcase">
      {/* Parallax Background Elements */}
      <div className="parallax-bg absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-pink-500 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            How Our AI Model Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Discover the machine learning architecture behind AniExplorer's recommendation system
          </motion.p>
        </motion.div>
        
        {/* Data Processing Section */}
        <div className="model-section mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-semibold text-white mb-6">Data Processing Pipeline</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Our recommendation system processes over 71 million user ratings from 91,641 users across 17,560 anime titles. 
                The data undergoes careful preprocessing including normalization, encoding, and filtering to ensure high-quality training data.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Min-Max normalization of ratings (0-1 scale)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">User and anime ID encoding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Quality filtering (400+ ratings per user)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-300">Duplicate removal and data shuffling</span>
                </div>
              </div>
              
              {/* Dataset Statistics */}
              <div className="stats-section mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Dataset Statistics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="stat-card">
                    <span className="text-gray-400">Total Ratings:</span>
                    <span className="text-white ml-2 font-semibold">71,418,114</span>
                  </div>
                  <div className="stat-card">
                    <span className="text-gray-400">Unique Users:</span>
                    <span className="text-white ml-2 font-semibold">91,641</span>
                  </div>
                  <div className="stat-card">
                    <span className="text-gray-400">Unique Anime:</span>
                    <span className="text-white ml-2 font-semibold">17,560</span>
                  </div>
                  <div className="stat-card">
                    <span className="text-gray-400">Avg Rating:</span>
                    <span className="text-white ml-2 font-semibold">0.405</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="code-snippet">
                <CodeSnippet 
                  title="Data Preprocessing"
                  code={`# Reading and filtering the dataset
dataset_df = pd.read_csv(INPUT_DIR + '/animelist.csv', low_memory=False)

# Filter users with at least 400 ratings
total_ratings = dataset_df['user_id'].value_counts()
dataset_df = dataset_df[dataset_df['user_id'].isin(
    total_ratings[total_ratings >= 400].index
)].copy()

# Min-max normalization
min_rating = min(dataset_df['rating'])
max_rating = max(dataset_df['rating'])
dataset_df['rating'] = dataset_df["rating"].apply(
    lambda x: (x - min_rating) / (max_rating - min_rating)
).values.astype(np.float64)

print(f"Avg rating: {np.mean(dataset_df['rating'])}")`}
                  language="python"
                  description="Data loading, filtering, and normalization process"
                />
              </div>
              
              <div className="code-snippet">
                <CodeSnippet 
                  title="User & Anime Encoding"
                  code={`# Create user encoding mappings
user_ids = dataset_df["user_id"].unique().tolist()
user2user_encoded = {x: i for i, x in enumerate(user_ids)}
user_encoded2user = {i: x for i, x in enumerate(user_ids)}
dataset_df["user"] = dataset_df["user_id"].map(user2user_encoded)

# Create anime encoding mappings
anime_ids = dataset_df["anime_id"].unique().tolist()
anime2anime_encoded = {x: i for i, x in enumerate(anime_ids)}
anime_encoded2anime = {i: x for i, x in enumerate(anime_ids)}
dataset_df["anime"] = dataset_df["anime_id"].map(anime2anime_encoded)

print(f"Users: {len(user2user_encoded)}, Anime: {len(anime2anime_encoded)}")`}
                  language="python"
                  description="Encoding categorical IDs to numerical values for neural network input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Model Architecture Section */}
        <div className="model-section mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-white mb-4">Neural Network Architecture</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We developed three different model architectures to compare performance and find the optimal approach
            </p>
          </div>
          
          <ModelArchitecture />
        </div>

        {/* Genre Processing Section */}
        <div className="model-section mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="code-snippet">
              <CodeSnippet 
                title="Genre Processing & Weighting"
                code={`# Genre processing with weighted embeddings
def get_weighted_genre_vector(MAL_ID, max_weight=1.0, decay_rate=0.5):
    """
    Generates weighted genre vector based on genre order.
    First genre has highest weight, decreasing exponentially.
    """
    genres = anime_df.loc[anime_df['MAL_ID'] == MAL_ID, 'Genres'].values[0] \\
             if MAL_ID in anime_df['MAL_ID'].values else ['Unknown']
    
    genre_vector = np.zeros(total_genres)
    for i, genre in enumerate(genres):
        if genre in genre2index:
            weight = max_weight * (decay_rate ** i)
            genre_vector[genre2index[genre]] = weight
    
    return genre_vector

# Multi-label binarization for genres
mlb = MultiLabelBinarizer()
genre_matrix = mlb.fit_transform(anime_df['Genres'])
genre_df = pd.DataFrame(genre_matrix, columns=mlb.classes_)`}
                language="python"
                description="Advanced genre processing with exponential weighting for better recommendations"
              />
            </div>
            
            <div>
              <h3 className="text-3xl font-semibold text-white mb-6">Genre Enhancement</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Our advanced models incorporate anime genre information using weighted embeddings. 
                The first genre gets the highest weight, with subsequent genres receiving exponentially decreasing weights.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Multi-label genre binarization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Exponential weight decay (0.5 rate)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Dense layer genre embeddings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-300">Batch normalization for stability</span>
                </div>
              </div>
              
              {/* Genre Impact Visualization */}
              <div className="genre-weights mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Genre Weight Distribution</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Primary Genre</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div className="weight-bar w-full h-full bg-blue-500 rounded-full origin-left"></div>
                      </div>
                      <span className="text-white text-sm">1.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Secondary Genre</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div className="weight-bar w-1/2 h-full bg-green-500 rounded-full origin-left"></div>
                      </div>
                      <span className="text-white text-sm">0.5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Tertiary Genre</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div className="weight-bar w-1/4 h-full bg-purple-500 rounded-full origin-left"></div>
                      </div>
                      <span className="text-white text-sm">0.25</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics Section */}
        <div className="model-section">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-white mb-4">Model Performance</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Comprehensive evaluation metrics showing the effectiveness of our recommendation system
            </p>
          </div>
          
          <PerformanceMetrics />
        </div>
      </div>
    </section>
  )
}

export default ModelShowcase