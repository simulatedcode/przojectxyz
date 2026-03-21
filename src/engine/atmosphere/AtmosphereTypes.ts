// AtmosphereTypes.ts
export type FogConfig = {
  color: string
  near: number
  far: number
  density?: number
  heightFalloff?: number
  heightBias?: number
}

export type LightConfig = {
  color: string
  intensity: number
  position: [number, number, number]
  ambientIntensity: number
  intensityAttenuation?: number
}

export type EnvironmentConfig = {
  topColor: string
  midColor?: string
  bottomColor: string
  hdriUrl?: string
  hdriIntensity?: number
  envIntensity?: number
}

export type ReflectionConfig = {
  intensity: number
  fresnelPower: number
}

export type PostFXConfig = {
  vignette: number
  noise: number
  contrast: number
  brightness: number
  exposure?: number
  bloom?: number
  chromaticAberration?: number
}

export type AtmospherePreset = {
  name: string
  fog: FogConfig
  light: LightConfig
  environment: EnvironmentConfig
  reflection: ReflectionConfig
  postfx: PostFXConfig
}
