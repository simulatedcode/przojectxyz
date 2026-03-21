import * as THREE from 'three'
import { Vector3Keyframe, NumberKeyframe, EasingType } from './cameraTypes'
import { applyEasing, lerp, lerpVec3, clamp } from './cameraEasing'

export function interpolateKeyframes(
  progress: number,
  keyframes: NumberKeyframe[],
  easing: EasingType
): number {
  if (keyframes.length === 0) return 0
  if (keyframes.length === 1) return keyframes[0].value

  const sorted = keyframes.concat().sort((a, b) => a.at - b.at)

  if (progress <= sorted[0].at) return sorted[0].value
  if (progress >= sorted[sorted.length - 1].at) return sorted[sorted.length - 1].value

  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i]
    const end = sorted[i + 1]

    if (progress >= start.at && progress <= end.at) {
      const t = clamp((progress - start.at) / (end.at - start.at), 0, 1)
      const easedT = applyEasing(t, easing)
      return lerp(start.value, end.value, easedT)
    }
  }

  return sorted[sorted.length - 1].value
}

export function interpolateVector3Keyframes(
  progress: number,
  keyframes: Vector3Keyframe[],
  easing: EasingType,
  out: THREE.Vector3
): THREE.Vector3 {
  if (keyframes.length === 0) return out.set(0, 0, 0)
  if (keyframes.length === 1) return out.set(...keyframes[0].value)

  const sorted = keyframes.concat().sort((a, b) => a.at - b.at)

  if (progress <= sorted[0].at) return out.set(...sorted[0].value)
  if (progress >= sorted[sorted.length - 1].at) return out.set(...sorted[sorted.length - 1].value)

  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i]
    const end = sorted[i + 1]

    if (progress >= start.at && progress <= end.at) {
      const t = clamp((progress - start.at) / (end.at - start.at), 0, 1)
      const easedT = applyEasing(t, easing)
      const a = start.value
      const b = end.value
      return lerpVec3(out,
        new THREE.Vector3(a[0], a[1], a[2]),
        new THREE.Vector3(b[0], b[1], b[2]),
        easedT
      )
    }
  }

  return out.set(...sorted[sorted.length - 1].value)
}

export function findActiveShot(
  progress: number,
  shots: { start: number; end: number }[]
): { shot: typeof shots[0] | null; localProgress: number } {
  for (let i = 0; i < shots.length; i++) {
    const shot = shots[i]
    if (progress >= shot.start && progress <= shot.end) {
      const localProgress = (progress - shot.start) / (shot.end - shot.start)
      return { shot, localProgress: clamp(localProgress, 0, 1) }
    }
  }
  return { shot: null, localProgress: 0 }
}