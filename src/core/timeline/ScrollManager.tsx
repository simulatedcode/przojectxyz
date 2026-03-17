'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useScrollStore } from '@/store/useScrollStore'

gsap.registerPlugin(ScrollTrigger)

/**
 * 🛰 ScrollManager
 * Orchestrates the relationship between the physical page scroll 
 * and our global application state using GSAP ScrollTrigger.
 */
export default function ScrollManager() {
  const setProgress = useScrollStore((s) => s.setProgress)

  useEffect(() => {
    // Sync the entire body height (400vh) to 0-1 progress
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress)
      },
    })

    return () => {
      st.kill()
    }
  }, [setProgress])

  return null
}
