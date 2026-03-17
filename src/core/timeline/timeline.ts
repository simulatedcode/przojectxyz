/**
 * 📏 Lerp utility
 */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * 📐 Clamp utility
 */
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

type Keyframe = {
  at: number
  value: number | number[]
}

/**
 * 📽 Keyframe Interpolation Engine
 * Calculates the current value based on timeline progress and defined keyframes.
 */
export function interpolate(progress: number, keyframes: Keyframe[]): number {
  // Sort keyframes by time
  const sorted = [...keyframes].sort((a, b) => a.at - b.at)

  // Handle boundaries
  if (progress <= sorted[0].at) return sorted[0].value as number
  if (progress >= sorted[sorted.length - 1].at) return sorted[sorted.length - 1].value as number

  // Find surrounding keyframes
  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i]
    const end = sorted[i + 1]

    if (progress >= start.at && progress <= end.at) {
      const t = (progress - start.at) / (end.at - start.at)
      return lerp(start.value as number, end.value as number, t)
    }
  }

  return 0
}
