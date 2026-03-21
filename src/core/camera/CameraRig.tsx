'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTimeline } from '@/core/timeline/useTimeline'
import { createShotController } from './cameraController'
import { bladeRunnerShots } from './shotPresets'
import { CameraRigState } from './cameraTypes'

const DEFAULT_CONFIG = {
  shots: bladeRunnerShots,
  defaultFov: 30,
  defaultFocusDistance: 5,
  defaultAperture: 2.8,
  stiffness: 80,
  damping: 12
}

export default function CameraRig() {
  const { camera } = useThree()
  const progress = useTimeline(s => s.progress)
  const cam = camera as THREE.PerspectiveCamera

  const controller = useMemo(() => createShotController(DEFAULT_CONFIG), [])

  const stateRef = useRef<CameraRigState>({
    position: new THREE.Vector3(),
    target: new THREE.Vector3(),
    fov: DEFAULT_CONFIG.defaultFov,
    roll: 0,
    focusDistance: DEFAULT_CONFIG.defaultFocusDistance,
    aperture: DEFAULT_CONFIG.defaultAperture
  })

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    controller.update(progress, dt, stateRef.current)

    camera.position.copy(stateRef.current.position)
    camera.lookAt(stateRef.current.target)

    if (Math.abs(cam.fov - stateRef.current.fov) > 0.01) {
      /* eslint-disable react-hooks/immutability */
      cam.fov = stateRef.current.fov
      /* eslint-enable react-hooks/immutability */
      cam.updateProjectionMatrix()
    }

    /* eslint-disable react-hooks/immutability */
    camera.rotation.z += stateRef.current.roll
    /* eslint-enable react-hooks/immutability */
  })

  return null
}

export { bladeRunnerShots, simpleShots } from './shotPresets'
export type { Shot, CameraRigConfig, CameraRigState } from './cameraTypes'
