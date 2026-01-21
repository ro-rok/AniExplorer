import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LiveSearchSection from './LiveSearchSection'
import { useAnimeSearch } from '../../hooks/useAnimeSearch'

// Mock the hook
jest.mock('../../hooks/useAnimeSearch', () => ({
  useAnimeSearch: jest.fn(),
}))

describe('LiveSearchSection', () => {
  const mockSearch = jest.fn()
  const mockRetry = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useAnimeSearch.mockReturnValue({
      loading: false,
      error: null,
      results: null,
      search: mockSearch,
      retry: mockRetry,
    })
  })

  it('should render search input and button', () => {
    render(<LiveSearchSection />)
    
    expect(screen.getByLabelText(/enter anime name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('should show loading state', () => {
    useAnimeSearch.mockReturnValue({
      loading: true,
      error: null,
      results: null,
      search: mockSearch,
      retry: mockRetry,
    })

    render(<LiveSearchSection />)
    
    // Loading skeletons should be present
    const skeletons = document.querySelectorAll('.loading-skeleton, [class*="skeleton"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should show error state with retry button', () => {
    useAnimeSearch.mockReturnValue({
      loading: false,
      error: 'Failed to fetch recommendations',
      results: null,
      search: mockSearch,
      retry: mockRetry,
    })

    render(<LiveSearchSection />)
    
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument()
    
    const retryButton = screen.getByRole('button', { name: /retry/i })
    expect(retryButton).toBeInTheDocument()
    
    fireEvent.click(retryButton)
    expect(mockRetry).toHaveBeenCalled()
  })

  it('should show empty state when no results', () => {
    useAnimeSearch.mockReturnValue({
      loading: false,
      error: null,
      results: { similar_animes: [] },
      search: mockSearch,
      retry: mockRetry,
    })

    render(<LiveSearchSection />)
    
    expect(screen.getByText(/no similar anime found/i)).toBeInTheDocument()
  })

  it('should show results when search succeeds', () => {
    const mockResults = {
      anime_searched: {
        id: 1,
        title: 'One Piece',
        image_url: 'https://example.com/image.jpg',
        similarity: 1.0,
      },
      similar_animes: [
        {
          anime_details: {
            id: 2,
            title: 'Bleach',
            image_url: 'https://example.com/bleach.jpg',
          },
          similarity: 0.9,
        },
      ],
    }

    useAnimeSearch.mockReturnValue({
      loading: false,
      error: null,
      results: mockResults,
      search: mockSearch,
      retry: mockRetry,
    })

    render(<LiveSearchSection />)
    
    expect(screen.getByText('One Piece')).toBeInTheDocument()
    expect(screen.getByText('Bleach')).toBeInTheDocument()
  })

  it('should call search when search button is clicked', () => {
    render(<LiveSearchSection />)
    
    const input = screen.getByLabelText(/enter anime name/i)
    const button = screen.getByRole('button', { name: /search/i })
    
    fireEvent.change(input, { target: { value: 'One Piece' } })
    fireEvent.click(button)
    
    expect(mockSearch).toHaveBeenCalledWith('One Piece', 'tv')
  })

  it('should display key insights section', () => {
    render(<LiveSearchSection />)
    
    expect(screen.getByText('Key Insights')).toBeInTheDocument()
    expect(screen.getByText(/Genre weighting significantly impacts rankings/i)).toBeInTheDocument()
  })
})
