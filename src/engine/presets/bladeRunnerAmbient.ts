import { AtmospherePreset } from '../atmosphere/AtmosphereTypes'

export const bladeRunnerAmbient: AtmospherePreset = {
  name: 'bladeRunnerAmbient',

  fog: {
    color: '#0a0f14',
    near: 5,
    far: 80,
    density: 0.025,
    heightFalloff: 0.5,
    heightBias: 0
  },

  light: {
    color: '#FF6B35',
    intensity: 0.8,
    position: [-15, 20, 10],
    ambientIntensity: 0.15,
    intensityAttenuation: 0.6
  },

  environment: {
    topColor: '#0a0f14',
    bottomColor: '#1a0a05',
    envIntensity: 0.4
  },

  reflection: {
    intensity: 0.6,
    fresnelPower: 3.0
  },

  postfx: {
    vignette: 0.6,
    noise: 0.02,
    contrast: 0.15,
    brightness: -0.05,
    exposure: 1.1,
    bloom: 0.3,
    chromaticAberration: 0.005
  }
}
