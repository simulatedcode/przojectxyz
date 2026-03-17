'use client'

import { create } from 'zustand'

type ScrollState = {
  progress: number
  setProgress: (p: number) => void
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
}))
