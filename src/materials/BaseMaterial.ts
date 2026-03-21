import { Color, ShaderMaterial } from 'three'
import vertex from './core/vertex.glsl'
import fragment from './core/fragment.glsl'
import colorModule from './modules/color.glsl'
import fresnelModule from './modules/fresnel.glsl'
import reflectionModule from './modules/reflection.glsl'

/**
 * 🎨 BaseMaterial Factory
 * Modular AAA Shader System focusing on cinematic lighting 
 * and physically-inspired effects.
 */
export function createBaseMaterial() {
  return new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: `
      ${colorModule}
      ${fresnelModule}
      ${reflectionModule}
      ${fragment}
    `,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new Color(0.4, 0.6, 1.0) }, // Cinematic White
      uFresnelIntensity: { value: 1.2 },           // Subtly boosted
      uReflectionMix: { value: 0.8 },              // Reflective glass feel
      uEnvMap: { value: null },                    // Set by Scene
      uOpacity: { value: 1.0 },
    },
    transparent: true,
    depthWrite: true,
    depthTest: true,
  })
}
