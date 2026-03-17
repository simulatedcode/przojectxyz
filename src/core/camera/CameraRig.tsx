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
    const p = progress

    camera.position.x = Math.sin(p * Math.PI) * 2
    camera.position.z = 5 - p * 2
    camera.position.y = Math.sin(p * Math.PI) * 0.5

    camera.lookAt(0, 0, 0)
  })

  return null
}
