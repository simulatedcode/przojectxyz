'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial } from 'three'
import { useSceneSegment } from '@/core/scene/useSceneSegment'
import { useBaseMaterial } from '@/materials/useBaseMaterial'
import { useSceneStore } from '@/store/useSceneStore'
import { useWorldToScreen } from '@/ui/hooks/useWorldToScreen'

export default function HeroScene() {
  const mesh = useRef<Mesh>(null!)
  const setHeroMesh = useSceneStore((state) => state.setHeroMesh)
  const setHeroTracking = useSceneStore((state) => state.setHeroTracking)
  const material = useBaseMaterial() as ShaderMaterial

  const { scene } = useThree()
  const { progress, visibility } = useSceneSegment(0.3, 0.6)

  // ✅ safer envMap assignment
  useEffect(() => {
    if (!scene.environment) return

    if (material.uniforms.uEnvMap) {
      material.uniforms.uEnvMap.value = scene.environment
    }
  }, [scene, material])
  
  // 📡 publish ref for tracking
  useEffect(() => {
    if (mesh.current) {
      setHeroMesh(mesh)
    }
  }, [setHeroMesh])

  // 🎯 Track screen coordinates (Inside Canvas)
  useWorldToScreen(mesh, setHeroTracking)

  useFrame(() => {
    const m = mesh.current
    const u = material.uniforms

    if (!m || !u) return

    // 👁 visibility (render optimization)
    m.visible = visibility > 0.01

    // 🎬 transform
    m.rotation.y = progress * Math.PI * 2
    m.scale.setScalar(1 + progress)

    // 🎨 opacity (correct blending)
    if (u.uOpacity) {
      u.uOpacity.value = visibility
    }

    // 🔥 cinematic lighting (independent from opacity)
    u.uFresnelIntensity.value = 2.0 + progress * 2.5
    u.uReflectionMix.value = 0.3 + progress * 0.7
  })

  return (
    <mesh ref={mesh} material={material}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  )
}