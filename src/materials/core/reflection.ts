import {
  reflect,
  normalWorld,
  positionViewDirection,
  Fn,
  float
} from 'three/tsl'

/**
 * AAA Reflection Node (TSL-safe)
 */
export const reflectionNode = (intensity: any = 1.0) => {
  const vDir = positionViewDirection.normalize()
  const normal = normalWorld.normalize()

  const reflectVec = reflect(vDir.negate(), normal)

  // temporary debug output
  return reflectVec.mul(intensity)
}