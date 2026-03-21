'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial, Color, Object3D } from 'three'
import { useSegment } from '@/core/timeline/useKeyframe'
import { useBaseMaterial } from '@/materials/useBaseMaterial'
import { useSceneStore } from '@/store/useSceneStore'
import { useWorldToScreen } from '@/ui/hooks/useWorldToScreen'

const TARGET_COLOR = new Color(1, 0.5, 0)

export default function ProjectsScene() {
  const meshRef = useRef<Object3D>(null)
  const material = useBaseMaterial() as ShaderMaterial
  const { scene } = useThree()

  const setProjectsMesh = useSceneStore((state) => state.setProjectsMesh)
  const setProjectsTracking = useSceneStore((state) => state.setProjectsTracking)
  const { progress } = useSegment(0.6, 1.0)

  useWorldToScreen(meshRef, setProjectsTracking)

  useEffect(() => {
    if (meshRef.current) setProjectsMesh(meshRef as unknown as React.RefObject<Mesh>)
  }, [setProjectsMesh])

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
    u.uColor.value.lerp(TARGET_COLOR, progress)
    u.uFresnelIntensity.value = 1.0 + progress * 1.5
    u.uReflectionMix.value = 0.2 + progress * 0.6
    /* eslint-enable react-hooks/immutability */
  })

  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  return <group ref={meshRef} />
}
