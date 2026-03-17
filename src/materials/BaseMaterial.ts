import vertex from './core/vertex.glsl'
import fragment from './core/fragment.glsl'
import colorModule from './modules/color.glsl'
import fresnelModule from './modules/fresnel.glsl'

import { ShaderMaterial } from 'three'


export function createBaseMaterial() {
  return new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: `
      ${colorModule}
      ${fresnelModule}
      ${fragment}
    `,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: [1, 0, 0] },
      uFresnelIntensity: { value: 1.0 },
      uReflectionMix: { value: 0.5 },
    },
  })
}
