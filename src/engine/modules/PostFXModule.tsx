'use client'

import {
  EffectComposer,
  Vignette,
  Noise,
  BrightnessContrast,
  Bloom
} from '@react-three/postprocessing'
import { useAtmosphere } from '../atmosphere/useAtmosphere'

export function PostFXModule() {
  const { preset } = useAtmosphere()
  const postfx = preset.postfx

  return (
    <EffectComposer enableNormalPass={true}>
      <Bloom
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        intensity={postfx.bloom ?? 0}
      />
      <Vignette eskil={false} offset={0.1} darkness={postfx.vignette} />
      <Noise opacity={postfx.noise} />
      <BrightnessContrast
        brightness={postfx.brightness}
        contrast={postfx.contrast}
      />
    </EffectComposer>
  )
}
