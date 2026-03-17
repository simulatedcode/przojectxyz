'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial } from 'three'
import { useSceneSegment } from '@/core/scene/useSceneSegment'
import { useBaseMaterial } from '@/materials/useBaseMaterial'

export default function IntroScene() {
  const mesh = useRef<Mesh>(null!)
  const material = useBaseMaterial() as ShaderMaterial

  const { scene } = useThree() // ✅ ADD
  const { progress } = useSceneSegment(0.0, 0.3)

  // ✅ ADD THIS BLOCK
  useEffect(() => {
    if (!scene.environment) return
    material.uniforms.uEnvMap.value = scene.environment
  }, [scene, material])

  useFrame(() => {
    if (!mesh.current || !material?.uniforms) return

    mesh.current.position.y = 2 - progress * 2
    mesh.current.rotation.y = progress * Math.PI

    material.uniforms.uFresnelIntensity.value = progress * 1.5
    material.uniforms.uReflectionMix.value = progress * 0.5
  })

  return (
    <mesh ref={mesh} material={material}>
      <boxGeometry />
    </mesh>
  )
}