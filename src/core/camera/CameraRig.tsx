// src/core/camera/CameraRig.tsx
'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useScrollStore } from '@/store/useScrollStore'
import { useRef } from 'react'
import { Vector3 } from 'three'

export default function CameraRig() {
  const progress = useScrollStore((s) => s.progress)
  const { camera } = useThree()
  
  const targetPosition = useRef(new Vector3())

  useFrame(() => {
    if (!camera) return
    
    targetPosition.current.set(progress * 5, 0, 5 - progress * 3)
    camera.position.copy(targetPosition.current)
    camera.lookAt(0, 0, 0)
  })

  return null
}
