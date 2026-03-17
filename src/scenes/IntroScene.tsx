'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial } from 'three'
import { useSegment } from '@/core/timeline/useKeyframe'
import { useBaseMaterial } from '@/materials/useBaseMaterial'
import { useSceneStore } from '@/store/useSceneStore'
import { useWorldToScreen } from '@/ui/hooks/useWorldToScreen'

/**
 * 🎬 IntroScene
 * The immersive first section of the experience.
 */
export default function IntroScene() {
  const mesh = useRef<Mesh>(null!)
  const setIntroMesh = useSceneStore((state) => state.setIntroMesh)
  const setIntroTracking = useSceneStore((state) => state.setIntroTracking)
  const material = useBaseMaterial() as ShaderMaterial

  const { scene } = useThree()
  
  // Define local segment progress (0.0 → 0.3 on global timeline)
  const { progress, visibility } = useSegment(0.0, 0.3)

  // 📡 publish ref for UI tracking
  useEffect(() => {
    if (mesh.current) {
      setIntroMesh(mesh)
    }
  }, [setIntroMesh])

  // 🎯 Track screen coordinates for UI
  useWorldToScreen(mesh, setIntroTracking)

  // 🌍 assign environment map
  useEffect(() => {
    if (!scene.environment) return
    const u = material.uniforms
    if (u.uEnvMap) u.uEnvMap.value = scene.environment
  }, [scene, material])

  useFrame(() => {
    const m = mesh.current
    const u = material.uniforms
    if (!m || !u) return

    // 🎬 transform
    m.position.y = 2 - progress * 2
    m.rotation.y = progress * Math.PI

    // 👁 visibility logic
    m.visible = visibility > 0.01

    // 🎨 shader uniforms sync
    if (u.uOpacity) u.uOpacity.value = visibility
    
    // AAA-grade lighting transitions
    u.uFresnelIntensity.value = 1.5 + progress * 2.0
    u.uReflectionMix.value = 0.2 + progress * 0.8
  })

  return (
    <mesh ref={mesh} material={material}>
      <boxGeometry />
    </mesh>
  )
}