'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial } from 'three'
import { useSceneSegment } from '@/core/scene/useSceneSegment'
import { useBaseMaterial } from '@/materials/useBaseMaterial'

export default function HeroScene() {
  const mesh = useRef<Mesh>(null!)
  const material = useBaseMaterial() as ShaderMaterial
  const { scene } = useThree()
  const { progress, isActive } = useSceneSegment(0.3, 0.6)

  useEffect(() => {
    if (!scene.environment) return
    material.uniforms.uEnvMap.value = scene.environment
  }, [scene, material])

  useFrame(() => {
    if (!mesh.current || !material?.uniforms) return

    mesh.current.rotation.y = progress * Math.PI * 2
    mesh.current.scale.setScalar(1 + progress)

    // ✅ directly update material
    material.uniforms.uFresnelIntensity.value = 1.0 + progress * 2.0
    material.uniforms.uReflectionMix.value = progress
  })

  if (!isActive) return null

  return (
    <mesh ref={mesh} material={material}>
      <sphereGeometry />
    </mesh>
  )
}
