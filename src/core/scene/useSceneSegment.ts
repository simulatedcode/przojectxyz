'use client'

import { useScrollStore } from '@/store/useScrollStore'

export function useSceneSegment(start: number, end: number) {
  const progress = useScrollStore((s) => s.progress)

  const raw = (progress - start) / (end - start)
  const clamped = Math.max(0, Math.min(1, raw))

  // 🔥 NEW: smooth fade
  const fadeIn = Math.min(1, clamped * 2)
  const fadeOut = Math.min(1, (1 - clamped) * 2)

  const smooth = (t: number) => t * t * (3 - 2 * t) // smoothstep
  const visibility = smooth(fadeIn) * smooth(fadeOut)

  return {
    progress: clamped,
    visibility, // 🔥 key for blending
  }
}