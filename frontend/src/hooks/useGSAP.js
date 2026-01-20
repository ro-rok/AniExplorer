import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useGSAP = (animationCallback, dependencies = []) => {
  const ref = useRef()

  // Memoize the animation callback to prevent unnecessary re-renders
  const memoizedCallback = useCallback(animationCallback, [animationCallback, ...dependencies])

  useEffect(() => {
    const element = ref.current
    if (element && memoizedCallback) {
      const animation = memoizedCallback(element)
      return () => {
        if (animation) {
          animation.kill()
        }
      }
    }
  }, [memoizedCallback])

  return ref
}