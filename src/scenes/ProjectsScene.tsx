'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh, ShaderMaterial } from 'three'
import { useSceneSegment } from '@/core/scene/useSceneSegment'
import { useBaseMaterial } from '@/materials/useBaseMaterial'

export default function ProjectsScene() {
  const mesh = useRef<Mesh>(null!)
  const material = useBaseMaterial() as ShaderMaterial
  const { progress, isActive } = useSceneSegment(0.6, 1.0)

  useFrame(() => {
    if (!mesh.current || !material?.uniforms) return

    mesh.current.position.x = -2 + progress * 4

    // ✅ directly update material
    material.uniforms.uFresnelIntensity.value = 0.5 + progress * 0.5
    material.uniforms.uColor.value = [1, 0.5, 0] // orange-ish
  })

  if (!isActive) return null

  return (
    <mesh ref={mesh} material={material}>
      <torusGeometry />
    </mesh>
  )
}
