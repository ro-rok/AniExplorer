import { useEffect } from 'react'
import Lenis from 'lenis'
import { lenisConfig } from '../utils/animations'

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis(lenisConfig)

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}