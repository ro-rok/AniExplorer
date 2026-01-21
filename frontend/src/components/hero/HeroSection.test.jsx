import { render, screen } from '@testing-library/react'
import HeroSection from './HeroSection'

describe('HeroSection', () => {
  it('should use bg.jpg as background image', () => {
    render(<HeroSection />)
    
    // Find the background div
    const backgroundDiv = document.querySelector('section[id="hero"] > div[style*="backgroundImage"]')
    
    expect(backgroundDiv).toBeInTheDocument()
    expect(backgroundDiv).toHaveStyle({
      backgroundImage: expect.stringContaining('/bg.jpg'),
    })
  })

  it('should have proper background image styles', () => {
    render(<HeroSection />)
    
    const backgroundDiv = document.querySelector('section[id="hero"] > div[style*="backgroundImage"]')
    
    expect(backgroundDiv).toHaveStyle({
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    })
  })

  it('should have hero content with proper classes', () => {
    render(<HeroSection />)
    
    const heroContent = document.querySelector('.hero-content')
    expect(heroContent).toBeInTheDocument()
    expect(heroContent).toHaveClass('relative', 'z-10')
  })
})
