import { Color, ShaderMaterial } from 'three'
import vertex from './core/vertex.glsl'
import fragment from './core/vhs_fragment.glsl'
import colorModule from './modules/color.glsl'
import vhsModule from './modules/vhs.glsl'

/**
 * 📼 VHSMaterial Factory
 * Cinematic distortion shader with pixelation and chromatic aberration.
 */
export function createVHSMaterial() {
  return new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: `
      ${colorModule}
      ${vhsModule}
      ${fragment}
    `,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new Color(0.8, 0.9, 1.0) },
      uVhsStrength: { value: 1.0 },
      uChromaticAberration: { value: 0.025 },
      uScanlineIntensity: { value: 0.3 },
      uPixelSize: { value: 256.0 },
      uEnvMap: { value: null },
      uOpacity: { value: 1.0 },
    },
    transparent: true,
    depthWrite: true,
    depthTest: true,
  })
}
