'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial } from 'three'
import { useSegment } from '@/core/timeline/useKeyframe'
import { useBaseMaterial } from '@/materials/useBaseMaterial'
import { useSceneStore } from '@/store/useSceneStore'
import { useWorldToScreen } from '@/ui/hooks/useWorldToScreen'

/**
 * 👑 HeroScene
 * The centerpiece of the landing experience.
 */
export default function HeroScene() {
  const mesh = useRef<Mesh>(null!)
  const setHeroMesh = useSceneStore((state) => state.setHeroMesh)
  const setHeroTracking = useSceneStore((state) => state.setHeroTracking)
  const material = useBaseMaterial() as ShaderMaterial

  const { scene } = useThree()
  
  // Segment range: 0.3 → 0.6
  const { progress, visibility } = useSegment(0.3, 0.6)

  // 📡 publish ref for tracking
  useEffect(() => {
    if (mesh.current) setHeroMesh(mesh)
  }, [setHeroMesh])

  // 🎯 Track screen coordinates
  useWorldToScreen(mesh, setHeroTracking)

  // 🌍 environment map sync
  useEffect(() => {
    if (!scene.environment) return
    const u = material.uniforms
    if (u.uEnvMap) u.uEnvMap.value = scene.environment
  }, [scene, material])

  useFrame(() => {
    const m = mesh.current
    const u = material.uniforms
    if (!m || !u) return

    // 👁 visibility logic
    m.visible = visibility > 0.01

    // 🎬 transform
    m.rotation.y = progress * Math.PI * 2
    m.scale.setScalar(1 + progress)

    // 🎨 shader uniforms sync
    if (u.uOpacity) u.uOpacity.value = visibility
    
    // AAA-grade cinematic transitions
    u.uFresnelIntensity.value = 2.0 + progress * 2.5
    u.uReflectionMix.value = 0.3 + progress * 0.7
  })

  return (
    <mesh ref={mesh} material={material}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  )
}