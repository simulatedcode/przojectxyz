'use client'

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { useAtmosphere } from '../atmosphere/useAtmosphere'

const GradientSkyMaterial = shaderMaterial(
  {
    topColor: new THREE.Color('#d53e5a'),
    midColor: new THREE.Color('#632E23'),
    bottomColor: new THREE.Color('#1f3a3a'),
    horizonSharpness: 0.25,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader — three-stop gradient with crisp horizon band
  `
  uniform vec3 topColor;
  uniform vec3 midColor;
  uniform vec3 bottomColor;
  uniform float horizonSharpness;
  varying vec2 vUv;

  void main() {
    float y = vUv.y;

    // Horizon is at y=0.5 on the sphere UV; sharpen the mid band
    float t = pow(abs(y - 0.5) * 2.0, horizonSharpness);
    vec3 color;
    if (y > 0.5) {
      color = mix(midColor, topColor, t);
    } else {
      color = mix(midColor, bottomColor, t);
    }

    gl_FragColor = vec4(color, 1.0);
  }
  `
)

extend({ GradientSkyMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    gradientSkyMaterial: ThreeElements['shaderMaterial'] & {
      topColor?: string | THREE.Color
      midColor?: string | THREE.Color
      bottomColor?: string | THREE.Color
      horizonSharpness?: number
    }
  }
}

export function EnvironmentModule() {
  const { preset } = useAtmosphere()
  const { scene } = useThree()

  const topColor = preset.environment?.topColor ?? '#d3535a'
  const midColor = preset.environment?.midColor ?? '#6DA1A4'
  const bottomColor = preset.environment?.bottomColor ?? '#1f3a3a'
  const hdriUrl = preset.environment?.hdriUrl
  const envIntensity = preset.environment?.envIntensity ?? 1

  useEffect(() => {
    if (scene.environment) {
      /* eslint-disable react-hooks/immutability */
      scene.environmentIntensity = envIntensity
      /* eslint-enable react-hooks/immutability */
    }
  }, [scene, envIntensity])

  return (
    <>
      {hdriUrl && (
        <Environment
          files={hdriUrl}
          background={false}
          blur={0.5}
        />
      )}
      <mesh scale={[100, 100, 100]} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 14, 14]} />
        <gradientSkyMaterial
          topColor={topColor}
          midColor={midColor}
          bottomColor={bottomColor}
          horizonSharpness={0.25}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}
