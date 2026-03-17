'use client'

import { useMemo } from 'react'
import { useTimeline } from './useTimeline'
import { interpolate, clamp } from './timeline'

type Keyframe = {
  at: number
  value: number
}

/**
 * 🛠 useKeyframe Hook
 * Reactive access to keyframe interpolation.
 */
export function useKeyframe(keyframes: Keyframe[]): number {
  const globalProgress = useTimeline((s) => s.progress)

  return useMemo(() => {
    return interpolate(globalProgress, keyframes)
  }, [globalProgress, keyframes])
}

/**
 * 🛠 useSegment Hook
 * Returns a normalized (0-1) progress within a specific timeline window.
 */
export function useSegment(start: number, end: number) {
  const globalProgress = useTimeline((s) => s.progress)

  const progress = useMemo(() => {
    const raw = (globalProgress - start) / (end - start)
    return clamp(raw, 0, 1)
  }, [globalProgress, start, end])

  // Enhanced visibility logic
  const visibility = useMemo(() => {
    // If it's the first segment (starts at 0), we want it visible immediately
    const fadeIn = start === 0 ? 1 : clamp(progress * 4, 0, 1)
    
    // If it's the last segment (ends at 1), we might want it to stay visible
    const fadeOut = end === 1 ? 1 : clamp((1 - progress) * 4, 0, 1)
    
    const smooth = (t: number) => t * t * (3 - 2 * t)
    return smooth(fadeIn) * smooth(fadeOut)
  }, [progress, start, end])

  return { progress, visibility }
}
