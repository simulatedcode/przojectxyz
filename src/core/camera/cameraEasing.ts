import * as THREE from 'three'
import { EasingType } from './cameraTypes'

export function applyEasing(t: number, type: EasingType): number {
  switch (type) {
    case 'linear':
      return t
    case 'easeIn':
      return t * t
    case 'easeOut':
      return 1 - (1 - t) * (1 - t)
    case 'easeInOut':
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    case 'smoothstep':
      return t * t * (3 - 2 * t)
    default:
      return t
  }
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function lerpVec3(
  out: THREE.Vector3,
  a: THREE.Vector3,
  b: THREE.Vector3,
  t: number
): THREE.Vector3 {
  out.x = a.x + (b.x - a.x) * t
  out.y = a.y + (b.y - a.y) * t
  out.z = a.z + (b.z - a.z) * t
  return out
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function spring(
  current: number,
  target: number,
  velocity: number,
  stiffness: number,
  damping: number,
  dt: number
): { value: number; velocity: number } {
  const force = (target - current) * stiffness
  const dampedVelocity = velocity + force * dt
  const dampingForce = dampedVelocity * damping
  const newValue = current + dampedVelocity * dt
  return {
    value: newValue,
    velocity: dampedVelocity - dampingForce * dt
  }
}