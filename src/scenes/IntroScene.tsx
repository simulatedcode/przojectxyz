'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, ShaderMaterial, Object3D } from 'three'
import { useSegment } from '@/core/timeline/useKeyframe'
import { useBaseMaterial } from '@/materials/useBaseMaterial'
import { useSceneStore } from '@/store/useSceneStore'
import { useWorldToScreen } from '@/ui/hooks/useWorldToScreen'

export default function IntroScene() {
  const meshRef = useRef<Object3D>(null)
  const material = useBaseMaterial() as ShaderMaterial
  const { scene } = useThree()

  const setIntroMesh = useSceneStore((state) => state.setIntroMesh)
  const setIntroTracking = useSceneStore((state) => state.setIntroTracking)
  const { progress } = useSegment(0.0, 0.3)

  useWorldToScreen(meshRef, setIntroTracking)

  useEffect(() => {
    if (meshRef.current) {
      setIntroMesh(meshRef as unknown as React.RefObject<Mesh>)
    }
  }, [setIntroMesh])

  useEffect(() => {
    if (!scene.environment) return
    const u = material.uniforms
    /* eslint-disable react-hooks/immutability */
    if (u.uEnvMap) u.uEnvMap.value = scene.environment
    /* eslint-enable react-hooks/immutability */
  }, [scene.environment, material])

  useFrame(() => {
    const u = material?.uniforms
    if (!u) return

    /* eslint-disable react-hooks/immutability */
    u.uFresnelIntensity.value = 1.5 + progress * 2.0
    u.uReflectionMix.value = 0.2 + progress * 0.8
    u.uTime.value = Date.now() * 0.001
    /* eslint-enable react-hooks/immutability */
  })

  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  return <group ref={meshRef} />
}
