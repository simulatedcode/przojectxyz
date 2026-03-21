import * as THREE from 'three'

export type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'smoothstep'

export interface Vector3Keyframe {
  at: number
  value: [number, number, number]
}

export interface NumberKeyframe {
  at: number
  value: number
}

export interface ShotCamera {
  position: Vector3Keyframe[]
  target: Vector3Keyframe[]
  fov: NumberKeyframe[]
  roll: NumberKeyframe[]
}

export interface ShotFocus {
  distance: NumberKeyframe[]
  aperture: NumberKeyframe[]
}

export interface Shot {
  id: string
  name: string
  start: number
  end: number
  camera: ShotCamera
  focus?: ShotFocus
  easing: EasingType
}

export interface CameraRigState {
  position: THREE.Vector3
  target: THREE.Vector3
  fov: number
  roll: number
  focusDistance: number
  aperture: number
}

export interface CameraRigConfig {
  shots: Shot[]
  defaultFov?: number
  defaultFocusDistance?: number
  defaultAperture?: number
  stiffness?: number
  damping?: number
  realism?: FilmRealismConfig
}

export interface FilmRealismConfig {
  velocityWeight?: number      // 0-1: heavier feel at high speed
  depthScale?: number          // 0-1: motion scaling based on distance
  targetLag?: number           // 0-1: how much target trails position
  directionalDrift?: number    // 0-1: subtle horizontal drift intensity
  inertiaSettle?: number       // 0-1: how long to settle after scroll stops
}