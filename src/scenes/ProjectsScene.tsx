'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial, Color } from 'three'
import { useSegment } from '@/core/timeline/useKeyframe'
import { useBaseMaterial } from '@/materials/useBaseMaterial'
import { useSceneStore } from '@/store/useSceneStore'
import { useWorldToScreen } from '@/ui/hooks/useWorldToScreen'

/**
 * 🛠 ProjectsScene
 * Showcases interactive components with cinematic transitions.
 */
export default function ProjectsScene() {
  const mesh = useRef<Mesh>(null!)
  const setProjectsMesh = useSceneStore((state) => state.setProjectsMesh)
  const setProjectsTracking = useSceneStore((state) => state.setProjectsTracking)
  const material = useBaseMaterial() as ShaderMaterial

  const { scene } = useThree()
  
  // Segment range: 0.6 → 1.0
  const { progress, visibility } = useSegment(0.6, 1.0)

  // 📡 publish ref for tracking
  useEffect(() => {
    if (mesh.current) setProjectsMesh(mesh)
  }, [setProjectsMesh])

  // 🎯 Track screen coordinates
  useWorldToScreen(mesh, setProjectsTracking)

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
    m.position.x = -2 + progress * 4

    // 🎨 shader uniforms sync
    if (u.uOpacity) u.uOpacity.value = visibility
    
    // Dynamic color shifting for Projects
    u.uColor.value.lerp(new Color(1, 0.5, 0), progress)
    
    // AAA-grade lighting transitions
    u.uFresnelIntensity.value = 1.0 + progress * 1.5
    u.uReflectionMix.value = 0.2 + progress * 0.6
  })

  return (
    <mesh ref={mesh} material={material}>
      <torusGeometry args={[1, 0.3, 32, 100]} />
    </mesh>
  )
}