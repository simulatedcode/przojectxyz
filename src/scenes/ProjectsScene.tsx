'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial, Color } from 'three'
import { useSceneSegment } from '@/core/scene/useSceneSegment'
import { useBaseMaterial } from '@/materials/useBaseMaterial'
import { useSceneStore } from '@/store/useSceneStore'
import { useWorldToScreen } from '@/ui/hooks/useWorldToScreen'

export default function ProjectsScene() {
  const mesh = useRef<Mesh>(null!)
  const setProjectsMesh = useSceneStore((state) => state.setProjectsMesh)
  const setProjectsTracking = useSceneStore((state) => state.setProjectsTracking)
  const material = useBaseMaterial() as ShaderMaterial

  const { scene } = useThree()
  const { progress, visibility } = useSceneSegment(0.6, 1.0)

  // ✅ safe envMap
  useEffect(() => {
    if (!scene.environment) return

    if (material.uniforms.uEnvMap) {
      material.uniforms.uEnvMap.value = scene.environment
    }
  }, [scene, material])

  // 📡 publish ref for tracking
  useEffect(() => {
    if (mesh.current) {
      setProjectsMesh(mesh)
    }
  }, [setProjectsMesh])

  // 🎯 Track screen coordinates (Inside Canvas)
  useWorldToScreen(mesh, setProjectsTracking)

  useFrame(() => {
    const m = mesh.current
    const u = material.uniforms

    if (!m || !u) return

    // 👁 visibility (render optimization)
    m.visible = visibility > 0.01

    // 🎬 transform
    m.position.x = -2 + progress * 4

    // 🎨 color (CORRECT TYPE)
    u.uColor.value = new Color(1, 0.5, 0)

    // 🎨 opacity (correct blending)
    if (u.uOpacity) {
      u.uOpacity.value = visibility
    }

    // 🔥 cinematic lighting (independent from opacity)
    u.uFresnelIntensity.value = 1.0 + progress * 1.5
    u.uReflectionMix.value = 0.2 + progress * 0.6
  })

  return (
    <mesh ref={mesh} material={material}>
      <torusGeometry args={[1, 0.3, 32, 100]} />
    </mesh>
  )
}