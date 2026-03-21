'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAtmosphere } from '../atmosphere/useAtmosphere'
import * as THREE from 'three'

export function LightModule() {
  const { preset } = useAtmosphere()
  const { color, intensity, position, ambientIntensity, intensityAttenuation = 0.5 } = preset.light

  const directionalRef = useRef<THREE.DirectionalLight>(null)
  const fillRef = useRef<THREE.DirectionalLight>(null)
  const hemisphereRef = useRef<THREE.HemisphereLight>(null)

  const { camera } = useThree()
  const prevCamPos = useRef(new THREE.Vector3())

  const groundColor = useMemo(() => {
    const c = new THREE.Color(color)
    c.multiplyScalar(0.15)
    return '#' + c.getHexString()
  }, [color])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const camPos = camera.position
    const prevPos = prevCamPos.current

    const movementSpeed = camPos.distanceTo(prevPos) / dt
    const movementFactor = Math.min(movementSpeed * 0.1, 0.5)

    const distFromOrigin = camPos.length()
    const distanceFactor = 1 - Math.min(distFromOrigin * 0.02, 0.4) * intensityAttenuation

    const baseIntensity = intensity * distanceFactor
    const reactiveIntensity = baseIntensity * (1 - movementFactor * 0.3)

    if (directionalRef.current) {
      directionalRef.current.intensity = reactiveIntensity
    }

    if (fillRef.current) {
      fillRef.current.intensity = reactiveIntensity * 0.25 * (1 + movementFactor * 0.2)
    }

    if (hemisphereRef.current) {
      const hemiBase = ambientIntensity * 0.5
      hemisphereRef.current.intensity = hemiBase * (1 - movementFactor * 0.15)
    }

    prevCamPos.current.copy(camPos)
  })

  return (
    <>
      <ambientLight color={color} intensity={ambientIntensity} />

      <directionalLight
        ref={directionalRef}
        color={color}
        intensity={intensity}
        position={position}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.002}
      />

      <directionalLight
        ref={fillRef}
        color={color}
        intensity={intensity * 0.25}
        position={[-position[0], position[1] * 0.5, -position[2]]}
      />

      <hemisphereLight
        ref={hemisphereRef}
        color={color}
        groundColor={groundColor}
        intensity={ambientIntensity * 0.2}
      />
    </>
  )
}
