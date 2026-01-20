import { useState } from 'react'
import { motion } from 'framer-motion'

const CodeSnippet = ({ title, code, language = 'python', description }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <motion.div 
      className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {title && (
        <div className="bg-gray-700 px-6 py-3 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400 capitalize">{language}</span>
              <button
                onClick={handleCopy}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-600 text-sm"
                title="Copy code"
              >
                {copied ? '✓' : '📋'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="relative">
        <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300 font-mono">
            {code}
          </code>
        </pre>
        
        {/* Language indicator */}
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {language}
          </span>
        </div>
      </div>
      
      {description && (
        <div className="px-6 py-4 bg-gray-750 border-t border-gray-600">
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      )}
    </motion.div>
  )
}

export default CodeSnippet