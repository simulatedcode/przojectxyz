'use client'

import { create } from 'zustand'

type TimelineState = {
  progress: number // Global timeline progress (0 → 1)
  setProgress: (p: number) => void
}

/**
 * 🎞 Timeline Store
 * Single source of truth for all cinematic progress.
 */
export const useTimeline = create<TimelineState>((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
}))
