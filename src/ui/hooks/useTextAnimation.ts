'use client'

import { useLayoutEffect, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useMouse } from './useMouse'

export function useTextAnimation(progress: number, visibility: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const mouse = useMouse()

  useLayoutEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.char')
    if (chars.length === 0) return

    // Initialize timeline
    timeline.current = gsap.timeline({ paused: true })
      .fromTo(
        chars,
        {
          opacity: 0,
          y: 40,
          z: -100,
          rotateX: -60,
          filter: 'blur(20px)',
          scale: 1.2,
          letterSpacing: '1em',
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          scale: 1,
          letterSpacing: 'normal',
          stagger: {
            amount: 0.8,
            from: 'start',
          },
          ease: 'expo.out',
          duration: 1.5,
        }
      )

    return () => {
      if (timeline.current) timeline.current.kill()
    }
  }, [])

  // Sync scroll progress
  useEffect(() => {
    if (!timeline.current) return

    // Sync timeline progress with scroll visibility
    // We use visibility for the main fade/stagger effect
    timeline.current.progress(visibility)
  }, [visibility])

  // Continuous reactive motion (parallax + tilt + depth sync)
  useEffect(() => {
    if (!containerRef.current || visibility < 0.01) return

    // Your specific camera-sync formulas
    const camX = Math.sin(progress * Math.PI) * 40
    const camY = Math.sin(progress * Math.PI) * 20
    
    // Transform components based on your provided logic:
    // translate3d(${camX}px, ${(1 - progress) * 80 + camY}px, ${visibility * 100}px)
    // rotateY(${camX * 0.05}deg)
    // rotateX(${camY * 0.03}deg)
    // scale(${0.9 + visibility * 0.1})
    
    const tx = camX + (mouse.x * 20)
    const ty = ((1 - progress) * 80) + camY + (mouse.y * 15)
    const tz = visibility * 100
    const ry = (camX * 0.05) + (mouse.x * 8)
    const rx = (camY * 0.03) - (mouse.y * 8)
    const s = 0.9 + (visibility * 0.1)

    // Floating micro-animation for secondary depth
    const floatY = Math.sin(Date.now() * 0.001) * 5

    // Unified 3D transformation with HUD Jitter + High-Fidelity Lag
    const jitterX = (Math.random() - 0.5) * (visibility < 0.5 ? 2 : 0.5)
    const jitterY = (Math.random() - 0.5) * (visibility < 0.5 ? 2 : 0.5)

    gsap.to(containerRef.current, {
      x: tx + jitterX, 
      y: ty + floatY + jitterY,
      z: tz,
      rotateY: ry,
      rotateX: rx,
      scale: s,
      duration: 0.8, // Slightly heavier lag for "scanning" feel
      ease: 'expo.out',
      overwrite: 'auto',
      delay: visibility < 0.1 ? 0.1 : 0, // Subtle stagger for new arrivals
    })
  }, [mouse, visibility, progress])

  return containerRef
}
