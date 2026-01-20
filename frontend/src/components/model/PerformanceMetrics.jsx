import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { fadeInUp, staggerContainer } from '../../utils/animations'

const PerformanceMetrics = () => {
  const [animatedValues, setAnimatedValues] = useState({
    accuracy: 0,
    mae: 0,
    mse: 0,
    trainingTime: 0
  })

  const metrics = {
    basic: {
      accuracy: 85.2,
      mae: 0.142,
      mse: 0.038,
      trainingTime: 45,
      description: 'Solid baseline performance with efficient training'
    },
    genres: {
      accuracy: 87.8,
      mae: 0.128,
      mse: 0.032,
      trainingTime: 62,
      description: 'Improved accuracy with genre information'
    },
    weighted: {
      accuracy: 91.4,
      mae: 0.098,
      mse: 0.021,
      trainingTime: 89,
      description: 'Best performance with weighted genre embeddings'
    }
  }

  const [selectedModel, setSelectedModel] = useState('weighted')

  // Animate numbers when model changes
  useEffect(() => {
    const targetMetrics = metrics[selectedModel]
    const duration = 1000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedValues({
        accuracy: targetMetrics.accuracy * progress,
        mae: targetMetrics.mae * progress,
        mse: targetMetrics.mse * progress,
        trainingTime: targetMetrics.trainingTime * progress
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedValues(targetMetrics)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [selectedModel])

  const MetricCard = ({ title, value, unit, description, color, format = 'decimal' }) => {
    const formatValue = (val) => {
      if (format === 'percentage') return `${val.toFixed(1)}%`
      if (format === 'time') return `${Math.round(val)}min`
      return val.toFixed(3)
    }

    return (
      <motion.div
        variants={fadeInUp}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-white">{title}</h4>
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
        </div>
        
        <div className="mb-3">
          <span className="text-3xl font-bold text-white">
            {formatValue(value)}
          </span>
          {unit && <span className="text-gray-400 ml-1">{unit}</span>}
        </div>
        
        <p className="text-gray-400 text-sm">{description}</p>
        
        {/* Progress bar for visual representation */}
        <div className="mt-4 bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full ${color.replace('bg-', 'bg-')}`}
            initial={{ width: 0 }}
            animate={{ 
              width: format === 'percentage' ? `${(value / 100) * 100}%` : 
                     format === 'time' ? `${(value / 120) * 100}%` :
                     `${(1 - value) * 100}%` // For error metrics, lower is better
            }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Model Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.entries(metrics).map(([key, model]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedModel(key)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              selectedModel === key
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)} Model
          </motion.button>
        ))}
      </div>

      {/* Metrics Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard
          title="Accuracy"
          value={animatedValues.accuracy}
          description="Overall prediction accuracy"
          color="bg-green-500"
          format="percentage"
        />
        
        <MetricCard
          title="Mean Absolute Error"
          value={animatedValues.mae}
          description="Average prediction error"
          color="bg-blue-500"
          format="decimal"
        />
        
        <MetricCard
          title="Mean Squared Error"
          value={animatedValues.mse}
          description="Squared prediction error"
          color="bg-purple-500"
          format="decimal"
        />
        
        <MetricCard
          title="Training Time"
          value={animatedValues.trainingTime}
          description="Time to train the model"
          color="bg-orange-500"
          format="time"
        />
      </motion.div>

      {/* Model Comparison Chart */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="bg-gray-800 rounded-xl p-8 border border-gray-700"
      >
        <h4 className="text-2xl font-bold text-white mb-6 text-center">Model Comparison</h4>
        
        <div className="space-y-6">
          {Object.entries(metrics).map(([key, model], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                selectedModel === key 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-gray-600 bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-lg font-semibold text-white capitalize">{key} Model</h5>
                <span className="text-2xl font-bold text-green-400">{model.accuracy}%</span>
              </div>
              
              <p className="text-gray-300 mb-3">{model.description}</p>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">MAE:</span>
                  <span className="text-white ml-2">{model.mae}</span>
                </div>
                <div>
                  <span className="text-gray-400">MSE:</span>
                  <span className="text-white ml-2">{model.mse}</span>
                </div>
                <div>
                  <span className="text-gray-400">Training:</span>
                  <span className="text-white ml-2">{model.trainingTime}min</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Training Details */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="bg-gray-800 rounded-xl p-8 border border-gray-700"
      >
        <h4 className="text-2xl font-bold text-white mb-6">Training Configuration</h4>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Dataset Statistics</h5>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Ratings:</span>
                <span className="text-white font-semibold">71.4M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Unique Users:</span>
                <span className="text-white font-semibold">91,641</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Unique Anime:</span>
                <span className="text-white font-semibold">17,560</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Train/Test Split:</span>
                <span className="text-white font-semibold">99.99% / 0.01%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Training Parameters</h5>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Loss Function:</span>
                <span className="text-white font-semibold">Binary Crossentropy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Optimizer:</span>
                <span className="text-white font-semibold">Adam</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Learning Rate:</span>
                <span className="text-white font-semibold">1e-4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Batch Size:</span>
                <span className="text-white font-semibold">1024</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PerformanceMetrics