import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = (options = {}) => {
  const ref = useRef()
  const [isInView, setIsInView] = useState(false)

  const defaultOptions = useMemo(() => ({
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    onEnter: () => setIsInView(true),
    onLeave: () => setIsInView(false),
    onEnterBack: () => setIsInView(true),
    onLeaveBack: () => setIsInView(false),
    ...options
  }), [options])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      ...defaultOptions
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [defaultOptions])

  return { ref, isInView }
}