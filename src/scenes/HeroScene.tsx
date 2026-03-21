'use client'

import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial, Object3D } from 'three'
import { useThree } from '@react-three/fiber'

import { useBaseMaterial } from '@/materials/useBaseMaterial'
import { useSceneStore } from '@/store/useSceneStore'
import { useWorldToScreen } from '@/ui/hooks/useWorldToScreen'

export default function HeroScene() {
  const groupRef = useRef<Object3D>(null)
  const material = useBaseMaterial() as ShaderMaterial
  const { scene } = useThree()

  const setHeroMesh = useSceneStore((state) => state.setHeroMesh)
  const setHeroTracking = useSceneStore((state) => state.setHeroTracking)


  useWorldToScreen(groupRef, setHeroTracking)

  useEffect(() => {
    if (groupRef.current) setHeroMesh(groupRef as unknown as React.RefObject<Mesh>)
  }, [setHeroMesh])

  useEffect(() => {
    if (!scene.environment) return
    const u = material.uniforms
    /* eslint-disable react-hooks/immutability */
    if (u.uEnvMap) u.uEnvMap.value = scene.environment
    /* eslint-enable react-hooks/immutability */
  }, [scene.environment, material])

  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  return <group ref={groupRef} />
}
