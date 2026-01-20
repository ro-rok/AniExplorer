import { renderHook } from '@testing-library/react'
import { useLenis, useGSAP, useScrollAnimation } from './index'

// Mock GSAP and Lenis for testing
jest.mock('gsap', () => ({
  gsap: {
    registerPlugin: jest.fn(),
    fromTo: jest.fn(),
    to: jest.fn(),
  },
  ScrollTrigger: {
    create: jest.fn(() => ({ kill: jest.fn() })),
  }
}))

jest.mock('lenis', () => {
  return jest.fn().mockImplementation(() => ({
    raf: jest.fn(),
    destroy: jest.fn(),
  }))
})

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16))

describe('Animation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('useLenis', () => {
    test('should initialize Lenis without errors', () => {
      const { unmount } = renderHook(() => useLenis())
      expect(() => unmount()).not.toThrow()
    })
  })

  describe('useGSAP', () => {
    test('should return a ref', () => {
      const { result } = renderHook(() => useGSAP(() => {}))
      expect(result.current).toHaveProperty('current')
    })

    test('should call animation callback when ref is set', () => {
      const mockCallback = jest.fn()
      const { result } = renderHook(() => useGSAP(mockCallback))
      
      // Simulate setting the ref
      const mockElement = document.createElement('div')
      result.current.current = mockElement
      
      // Re-render to trigger useEffect
      renderHook(() => useGSAP(mockCallback))
    })
  })

  describe('useScrollAnimation', () => {
    test('should return ref and isInView state', () => {
      const { result } = renderHook(() => useScrollAnimation())
      expect(result.current).toHaveProperty('ref')
      expect(result.current).toHaveProperty('isInView')
      expect(typeof result.current.isInView).toBe('boolean')
    })
  })
})