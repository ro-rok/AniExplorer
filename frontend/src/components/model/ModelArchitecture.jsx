import { motion } from 'framer-motion'
import { useState } from 'react'
import CodeSnippet from './CodeSnippet'
import { fadeInUp } from '../../utils/animations'

const ModelArchitecture = () => {
  const [activeModel, setActiveModel] = useState('basic')

  const models = {
    basic: {
      title: 'Basic Collaborative Filtering',
      description: 'Simple embedding-based model using user and anime embeddings with dot product similarity',
      code: `def RecommenderNet():
    embedding_size = 128
    
    user = Input(name='user', shape=[1])
    user_embedding = Embedding(name='user_embedding',
                        input_dim=total_users, 
                        output_dim=embedding_size)(user)
    
    anime = Input(name='anime', shape=[1])
    anime_embedding = Embedding(name='anime_embedding',
                        input_dim=total_animes, 
                        output_dim=embedding_size)(anime)
    
    x = Dot(name='dot_product', normalize=True, axes=2)([user_embedding, anime_embedding])
    x = Flatten()(x)
    
    x = Dense(1, kernel_initializer='he_normal')(x)
    x = BatchNormalization()(x)
    x = Activation("sigmoid")(x)
    
    model = Model(inputs=[user, anime], outputs=x)
    return model`,
      features: [
        'User & Anime Embeddings (128 dims)',
        'Normalized Dot Product',
        'Sigmoid Activation',
        'Binary Cross-entropy Loss'
      ],
      params: '13.98M parameters'
    },
    genres: {
      title: 'Genre-Enhanced Model',
      description: 'Enhanced model incorporating anime genre information for better recommendations',
      code: `def RecommenderNetWithGenres():
    embedding_size = 128
    genre_embedding_size = 128
    
    # User embedding
    user = Input(name='user', shape=[1])
    user_embedding = Embedding(input_dim=total_users,
                               output_dim=embedding_size)(user)
    user_embedding = Flatten()(user_embedding)
    
    # Anime embedding
    anime = Input(name='anime', shape=[1])
    anime_embedding = Embedding(input_dim=total_animes,
                                output_dim=embedding_size)(anime)
    anime_embedding = Flatten()(anime_embedding)
    
    # Genre input
    genre = Input(name='genre', shape=[total_genres])
    genre_embedding = Dense(genre_embedding_size, activation='relu')(genre)
    genre_embedding = BatchNormalization()(genre_embedding)
    
    # Combining embeddings
    x = Concatenate()([user_embedding, anime_embedding, genre_embedding])
    x = Dense(256, activation='relu')(x)
    x = Dense(128, activation='relu')(x)
    
    output = Dense(1, activation='sigmoid')(x)
    model = Model(inputs=[user, anime, genre], outputs=output)
    return model`,
      features: [
        'User & Anime Embeddings (128 dims)',
        'Genre Dense Layer (128 dims)',
        'Concatenated Features',
        'Multi-layer Dense Network'
      ],
      params: '14.2M parameters'
    },
    weighted: {
      title: 'Weighted Genre Model',
      description: 'Advanced model with weighted genre embeddings and regularization for optimal performance',
      code: `def RecommenderNetWithWeightedGenres():
    embedding_size = 512 
    genre_embedding_size = 256 
    
    # User embedding with regularization
    user = Input(name='user', shape=[1])
    user_embedding = Embedding(input_dim=total_users,
                                output_dim=embedding_size,
                                embeddings_regularizer=l2(1e-6))(user)
    user_embedding = Flatten()(user_embedding)
    
    # Anime embedding with regularization
    anime = Input(name='anime', shape=[1])
    anime_embedding = Embedding(input_dim=total_animes,
                                output_dim=embedding_size,
                                embeddings_regularizer=l2(1e-6))(anime)
    anime_embedding = Flatten()(anime_embedding)
    
    # Weighted genre processing
    genre = Input(name='genre', shape=[total_genres])
    genre_embedding = Dense(genre_embedding_size, activation='relu')(genre)
    genre_embedding = BatchNormalization()(genre_embedding)
    
    # Deep network with dropout
    x = Concatenate()([user_embedding, anime_embedding, genre_embedding])
    x = Dense(1024, kernel_regularizer=l2(0.001))(x)
    x = BatchNormalization()(x)
    x = PReLU()(x)
    x = Dropout(0.5)(x)
    
    x = Dense(512, kernel_regularizer=l2(0.001))(x)
    x = BatchNormalization()(x)
    x = PReLU()(x)
    x = Dropout(0.4)(x)
    
    output = Dense(1, activation='sigmoid')(x)
    model = Model(inputs=[user, anime, genre], outputs=output)
    return model`,
      features: [
        'Large Embeddings (512 dims)',
        'Weighted Genre Vectors',
        'Deep Network (1024→512→256→128)',
        'L2 Regularization & Dropout',
        'PReLU Activations'
      ],
      params: '89.7M parameters'
    }
  }

  return (
    <div className="space-y-8">
      {/* Model Selection Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.entries(models).map(([key, model]) => (
          <motion.button
            key={key}
            onClick={() => setActiveModel(key)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeModel === key
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {model.title}
          </motion.button>
        ))}
      </div>

      {/* Active Model Display */}
      <motion.div
        key={activeModel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid lg:grid-cols-2 gap-8"
      >
        {/* Model Description */}
        <div className="space-y-6">
          <div>
            <h4 className="text-2xl font-bold text-white mb-3">
              {models[activeModel].title}
            </h4>
            <p className="text-gray-300 text-lg leading-relaxed">
              {models[activeModel].description}
            </p>
          </div>

          {/* Model Features */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Key Features:</h5>
            <div className="space-y-3">
              {models[activeModel].features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Model Stats */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Model Complexity:</span>
              <span className="text-white font-semibold">{models[activeModel].params}</span>
            </div>
          </div>
        </div>

        {/* Code Display */}
        <div>
          <CodeSnippet
            title={`${models[activeModel].title} Implementation`}
            code={models[activeModel].code}
            language="python"
          />
        </div>
      </motion.div>

      {/* Architecture Visualization */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-12"
      >
        <h4 className="text-2xl font-bold text-white mb-6 text-center">Neural Network Flow</h4>
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Input Layer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white font-bold">IN</span>
              </div>
              <p className="text-gray-300 text-sm">User & Anime IDs</p>
            </div>

            <div className="text-gray-400">→</div>

            {/* Embedding Layer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white font-bold">EMB</span>
              </div>
              <p className="text-gray-300 text-sm">Embeddings</p>
            </div>

            <div className="text-gray-400">→</div>

            {/* Processing Layer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white font-bold">NN</span>
              </div>
              <p className="text-gray-300 text-sm">Neural Network</p>
            </div>

            <div className="text-gray-400">→</div>

            {/* Output Layer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white font-bold">OUT</span>
              </div>
              <p className="text-gray-300 text-sm">Rating Prediction</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ModelArchitecture