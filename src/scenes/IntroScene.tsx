'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh, ShaderMaterial } from 'three'
import { useSceneSegment } from '@/core/scene/useSceneSegment'
import { useBaseMaterial } from '@/materials/useBaseMaterial'

export default function IntroScene() {
  const mesh = useRef<Mesh>(null!)
  const material = useBaseMaterial() as ShaderMaterial

  const { progress } = useSceneSegment(0.0, 0.3)

  useFrame(() => {
    if (!mesh.current || !material?.uniforms) return

    mesh.current.position.y = 2 - progress * 2
    mesh.current.rotation.y = progress * Math.PI

    // ✅ directly update material
    material.uniforms.uFresnelIntensity.value = progress * 1.5
    material.uniforms.uReflectionMix.value = progress * 0.5
  })

  return (
    <mesh ref={mesh} material={material}>
      <boxGeometry />
    </mesh>
  )
}