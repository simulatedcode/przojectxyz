'use client'

import { useFrame } from '@react-three/fiber'
import { useTimeline } from './useTimeline'
import { useScrollStore } from '../../store/useScrollStore'

/**
 * 🔄 Timeline System
 * Connects the scroll progress to the global timeline store.
 * Best placed inside the R3F Canvas or as a root provider.
 */
export default function TimelineSystem() {
  const setTimelineProgress = useTimeline((s) => s.setProgress)
  const scrollProgress = useScrollStore((s: { progress: any }) => s.progress)

  // Every frame, sync scroll → timeline
  useFrame(() => {
    setTimelineProgress(scrollProgress)
  })

  return null
}
