'use client'

import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial, Object3D } from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useBaseMaterial } from '@/materials/useBaseMaterial'

interface GLTFModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  rotationSpeed?: { x?: number; y?: number; z?: number }
}

export function GLTFModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  rotationSpeed = {},
}: GLTFModelProps) {
  const groupRef = useRef<Object3D>(null)
  const { scene } = useGLTF('/models/rz01.gltf')
  const clonedRef = useRef<Object3D | null>(null)
  const material = useBaseMaterial() as ShaderMaterial

  const { x: rotX = 0, y: rotY = 0, z: rotZ = 0 } = rotationSpeed

  useEffect(() => {
    if (!scene || !groupRef.current) return

    const cloned = scene.clone()
    cloned.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = material
      }
    })
    clonedRef.current = cloned
    const ref = groupRef.current
    ref.add(cloned)

    return () => {
      ref?.remove(cloned)
      cloned.traverse((child) => {
        if (child instanceof Mesh) {
          child.material = null
          child.geometry?.dispose()
        }
      })
      clonedRef.current = null
    }
  }, [scene, material])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.x += rotX
    groupRef.current.rotation.y += rotY
    groupRef.current.rotation.z += rotZ
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale} />
  )
}
