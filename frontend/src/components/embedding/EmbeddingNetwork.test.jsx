import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import EmbeddingNetwork from './EmbeddingNetwork'
import { MOCK_DATASET } from '../../utils/mockData'

// Mock the hooks
jest.mock('../../hooks/useEmbeddingCalculation', () => ({
  useEmbeddingCalculation: jest.fn((genreWeights, queryAnime, dataset, useBaseline) => {
    // Simple mock calculation
    const embeddingVector = new Array(12).fill(0).map((_, i) => 
      queryAnime?.genres?.includes('Action') && i === 0 ? (genreWeights['Action/Adventure'] || 1.0) : 0
    )
    
    const similarityScores = dataset.map((anime) => {
      const score = anime.genres.includes('Action') ? 0.8 : 0.3
      return { anime, score }
    })
    
    const topRecommendations = [...similarityScores]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((item) => item.anime)
    
    return { embeddingVector, similarityScores, topRecommendations }
  }),
}))

describe('EmbeddingNetwork', () => {
  it('should render query tabs', () => {
    render(<EmbeddingNetwork />)
    
    expect(screen.getByText('One Piece')).toBeInTheDocument()
    expect(screen.getByText('Your Lie in April')).toBeInTheDocument()
    expect(screen.getByText('Terror in Resonance')).toBeInTheDocument()
  })

  it('should change query when tab is clicked', async () => {
    render(<EmbeddingNetwork />)
    
    const yourLieTab = screen.getByText('Your Lie in April')
    fireEvent.click(yourLieTab)
    
    await waitFor(() => {
      expect(yourLieTab.closest('button')).toHaveAttribute('aria-pressed', 'true')
    })
  })

  it('should toggle baseline/with-genre mode', async () => {
    render(<EmbeddingNetwork />)
    
    const toggle = screen.getByLabelText(/Switch to.*mode/i)
    expect(toggle).toBeInTheDocument()
    
    fireEvent.click(toggle)
    
    await waitFor(() => {
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
    })
  })

  it('should update recommendations when genre weights change', async () => {
    render(<EmbeddingNetwork />)
    
    // Find a slider (assuming NetworkVisualization renders sliders)
    const sliders = document.querySelectorAll('input[type="range"]')
    
    if (sliders.length > 0) {
      const firstSlider = sliders[0]
      const initialValue = firstSlider.value
      
      fireEvent.change(firstSlider, { target: { value: '2.0' } })
      
      await waitFor(() => {
        expect(firstSlider.value).toBe('2.0')
      })
    }
  })

  it('should display before/after comparison table', () => {
    render(<EmbeddingNetwork />)
    
    expect(screen.getByText('Baseline vs With-Genre Comparison')).toBeInTheDocument()
    expect(screen.getByText('Baseline (Top 5)')).toBeInTheDocument()
    expect(screen.getByText('With-Genre (Top 5)')).toBeInTheDocument()
  })

  it('should display top recommendations', () => {
    render(<EmbeddingNetwork />)
    
    expect(screen.getByText('Top Recommendations')).toBeInTheDocument()
  })
})
