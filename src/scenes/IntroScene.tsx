'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial } from 'three'
import { useSceneSegment } from '@/core/scene/useSceneSegment'
import { useBaseMaterial } from '@/materials/useBaseMaterial'

export default function IntroScene() {
  const mesh = useRef<Mesh>(null!)
  const material = useBaseMaterial() as ShaderMaterial

  const { scene } = useThree()
  const { progress, visibility } = useSceneSegment(0.0, 0.3)

  // 🌍 assign environment map once ready
  useEffect(() => {
    if (!scene.environment) return

    const u = material.uniforms
    if (u.uEnvMap) {
      u.uEnvMap.value = scene.environment
    }
  }, [scene, material])

  useFrame(() => {
    const m = mesh.current
    const u = material.uniforms

    if (!m || !u) return

    // 🎬 transform
    m.position.y = 2 - progress * 2
    m.rotation.y = progress * Math.PI

    // 👁 visibility (render optimization)
    m.visible = visibility > 0.01

    // 🎨 opacity (correct blending)
    if (u.uOpacity) {
      u.uOpacity.value = visibility
    }

    // 🔥 cinematic lighting (independent from opacity)
    u.uFresnelIntensity.value = 1.5 + progress * 2.0
    u.uReflectionMix.value = 0.2 + progress * 0.8
  })

  return (
    <mesh ref={mesh} material={material}>
      <boxGeometry />
    </mesh>
  )
}