import * as THREE from 'three'
import gridVert from './grid_vert.glsl'
import gridFrag from './grid_frag.glsl'

export class GridMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: gridVert,
      fragmentShader: gridFrag,
      uniforms: {
        uGridColor: { value: new THREE.Color('#1fa3a3') },
        uBaseColor: { value: new THREE.Color('#1f3a3a') },
        uGridScale: { value: 0.5 },
        uGridThickness: { value: 0.02 },
        uFresnelIntensity: { value: 0.5 },
        uFresnelPower: { value: 3.0 },
        uEnvIntensity: { value: 0.8 },
        uEnvMap: { value: null },
        uOpacity: { value: 1.0 },
        uTime: { value: 0 },
      },
      transparent: false,
      depthWrite: true,
      depthTest: true,
    })
  }
}
