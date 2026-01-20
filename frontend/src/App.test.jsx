import { render, screen } from '@testing-library/react'
import App from './App'

test('renders AniExplorer title', () => {
  render(<App />)
  const titleElement = screen.getByText(/AniExplorer/i)
  expect(titleElement).toBeInTheDocument()
})

test('renders search input', () => {
  render(<App />)
  const searchInput = screen.getByLabelText(/Enter an anime name/i)
  expect(searchInput).toBeInTheDocument()
})

test('renders media type buttons', () => {
  render(<App />)
  const tvButton = screen.getByText(/TV Series/i)
  const movieButton = screen.getByText(/Movie/i)
  expect(tvButton).toBeInTheDocument()
  expect(movieButton).toBeInTheDocument()
})