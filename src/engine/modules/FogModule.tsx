'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAtmosphere } from '../atmosphere/useAtmosphere'
import * as THREE from 'three'

export function FogModule() {
  const { preset } = useAtmosphere()
  const fogRef = useRef<THREE.FogExp2>(null)

  const { color, density = 0.015 } = preset.fog

  useFrame(() => {
    if (fogRef.current) {
      fogRef.current.color.set(color)
      fogRef.current.density = density
    }
  })

  return (
    <>
      <color attach="background" args={[color]} />
      <fogExp2 attach="fog" ref={fogRef} args={[color, density]} />
    </>
  )
}