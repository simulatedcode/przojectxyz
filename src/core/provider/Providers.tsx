// src/core/providers/Providers.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // 🔥 CRITICAL SYNC
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
