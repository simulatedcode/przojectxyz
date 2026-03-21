import {
  dot,
  normalWorld,
  positionViewDirection,
  oneMinus,
  float,
  pow,
  Fn
} from 'three/tsl'

/**
 * AAA Fresnel Node (TSL - compatible)
 */
export const fresnelNode = (
  power: any = float(3.0),
  intensity: any = float(1.0)
) => {
  const vDir = positionViewDirection.normalize()
  const normal = normalWorld.normalize()

  const dotNV = dot(vDir, normal)

  const fresnelBase = oneMinus(dotNV).clamp(0, 1)
  const fresnel = pow(fresnelBase, power)

  return fresnel.mul(intensity)
}