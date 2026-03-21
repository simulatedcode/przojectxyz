'use client'

import { useFrame } from '@react-three/fiber'
import { useTimeline } from './useTimeline'
import { useScrollStore, ScrollState } from '../../store/useScrollStore'

export default function TimelineSystem() {
  const setTimelineProgress = useTimeline((s) => s.setProgress)
  const scrollProgress = useScrollStore((s: ScrollState) => s.progress)

  // Every frame, sync scroll → timeline
  useFrame(() => {
    setTimelineProgress(scrollProgress)
  })

  return null
}
