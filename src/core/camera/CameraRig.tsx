// src/core/camera/CameraRig.tsx
'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useTimeline } from '@/core/timeline/useTimeline'
import { interpolate } from '@/core/timeline/timeline'

/**
 * 🎥 CameraRig
 * Controls the camera path using cinematic keyframes.
 */
export default function CameraRig() {
  const globalProgress = useTimeline((s) => s.progress)
  const { camera } = useThree()

  // Define Cinematic Path
  const xPath = [
    { at: 0, value: 0 },
    { at: 0.3, value: 2 },
    { at: 0.6, value: -2 },
    { at: 1, value: 0 }
  ]

  const yPath = [
    { at: 0, value: 0 },
    { at: 0.5, value: 1 },
    { at: 1, value: 0 }
  ]

  const zPath = [
    { at: 0, value: 5 },
    { at: 0.5, value: 3 },
    { at: 1, value: 8 }
  ]

  useFrame(() => {
    camera.position.x = interpolate(globalProgress, xPath)
    camera.position.y = interpolate(globalProgress, yPath)
    camera.position.z = interpolate(globalProgress, zPath)
    
    camera.lookAt(0, 0, 0)
  })

  return null
}
