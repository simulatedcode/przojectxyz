'use client'

import { useEffect, useRef } from 'react'
import { useControls, folder } from 'leva'
import { useAtmosphere } from '../atmosphere/useAtmosphere'
import { AtmospherePreset } from '../atmosphere/AtmosphereTypes'

interface AtmosphereControlsOptions {
  'Fog Near': number
  'Fog Far': number
  'Light Intensity': number
  'Ambient': number
  'Intensity': number
}

export function AtmosphereControls() {
  const { preset, setPreset } = useAtmosphere()

  const pRef = useRef<AtmospherePreset>(preset)
  useEffect(() => { pRef.current = preset }, [preset])

  const [, set] = useControls('Atmosphere', () => ({
    'Fog': folder({
      'Fog Near': { value: preset.fog.near, min: 0, max: 100, step: 1, onChange: (v: number) => setPreset({ ...pRef.current, fog: { ...pRef.current.fog, near: v } }, 0) },
      'Fog Far': { value: preset.fog.far, min: 0, max: 500, step: 1, onChange: (v: number) => setPreset({ ...pRef.current, fog: { ...pRef.current.fog, far: v } }, 0) },
    }),
    'Light': folder({
      'Light Intensity': { value: preset.light.intensity, min: 0, max: 5, step: 0.05, onChange: (v: number) => setPreset({ ...pRef.current, light: { ...pRef.current.light, intensity: v } }, 0) },
      'Ambient': { value: preset.light.ambientIntensity, min: 0, max: 1, step: 0.01, onChange: (v: number) => setPreset({ ...pRef.current, light: { ...pRef.current.light, ambientIntensity: v } }, 0) },
    }),
    'Reflection': folder({
      'Intensity': { value: preset.reflection.intensity, min: 0, max: 5, step: 0.05, onChange: (v: number) => setPreset({ ...pRef.current, reflection: { ...pRef.current.reflection, intensity: v } }, 0) },
    }),
  }))

  useEffect(() => {
    const controls: AtmosphereControlsOptions = {
      'Fog Near': preset.fog.near,
      'Fog Far': preset.fog.far,
      'Light Intensity': preset.light.intensity,
      'Ambient': preset.light.ambientIntensity,
      'Intensity': preset.reflection.intensity,
    }
    set(controls)
  }, [preset, set])

  return null
}
