'use client'

import { Grid, MeshReflectorMaterial } from '@react-three/drei'

interface GroundProps {
  gridScale?: number
  metalness?: number
  roughness?: number
}

const LINE_COLOR = '#1fa3a3'
const FLOOR_COLOR = '#1f3a3a'

export function Ground({
  gridScale = 0.25,
  metalness = 0.3,
  roughness = 0.6,
}: GroundProps) {
  // Grid cell lines: custom teal color
  const gridColor = LINE_COLOR

  // Section lines: custom teal color  
  const sectionColor = LINE_COLOR

  // Reflector color: custom dark floor color
  const reflectorColor = FLOOR_COLOR

  // Fixed reflection values - floor color stays static
  const envIntensity = 1.0

  return (
    <group>
      {/* 🪞 Atmosphere-reactive reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={0.85}
          mixStrength={25}
          roughness={roughness}
          depthScale={1.5}
          minDepthThreshold={0.2}
          maxDepthThreshold={1.6}
          color={reflectorColor}
          metalness={metalness}
          mirror={0}
          envMapIntensity={envIntensity}
        />
      </mesh>

      {/* 🔲 Preset-tinted infinite grid */}
      <Grid
        receiveShadow
        position={[0, 0.001, 0]}
        args={[100, 100]}
        cellSize={1 / gridScale}
        cellThickness={0.4}
        cellColor={gridColor}
        sectionSize={5 / gridScale}
        sectionThickness={0.8}
        sectionColor={sectionColor}
        fadeDistance={35}
        fadeStrength={1.5}
        followCamera={false}
        infiniteGrid={true}
      />
    </group>
  )
}
