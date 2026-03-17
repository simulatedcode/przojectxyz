// src/core/scene/useSceneSegment.ts
'use client'

import { useScrollStore } from '@/store/useScrollStore'

export function useSceneSegment(start: number, end: number) {
  const progress = useScrollStore((s) => s.progress)

  const raw = (progress - start) / (end - start)
  const clamped = Math.max(0, Math.min(1, raw))

  const isActive = progress >= start && progress <= end

  return {
    progress: clamped,
    isActive,
  }
}
