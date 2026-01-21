import { useState, useEffect } from 'react'

/**
 * Hook to track which section is currently active based on scroll position
 * @param {string[]} sectionIds - Array of section IDs to track
 * @param {number} offset - Offset from top of viewport (default 100)
 * @returns {string} - ID of the currently active section
 */
export const useScrollspy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      // Iterate through sections from bottom to top to find the active one
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
