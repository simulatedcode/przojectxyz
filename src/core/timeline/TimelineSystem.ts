'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useScrollStore } from '@/store/useScrollStore'

gsap.registerPlugin(ScrollTrigger)

export default function TimelineSystem() {
  const setProgress = useScrollStore((s) => s.setProgress)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          setProgress(self.progress) // 🔥 global sync
        },
      },
    })

    // 👇 Define your STORY here (not animations directly)

    tl.to({}, { duration: 1 }) // Scene 1
    tl.to({}, { duration: 1 }) // Scene 2
    tl.to({}, { duration: 1 }) // Scene 3

    return () => {
      tl.kill()
    }
  }, [setProgress])

  return null
}
