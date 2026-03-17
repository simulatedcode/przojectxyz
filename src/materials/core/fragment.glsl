uniform vec3 uColor;
uniform float uReflectionMix;
uniform samplerCube uEnvMap;

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);

  vec3 color = baseColor(uColor);

  float fresnel = fresnelEffect(normal, viewDir, 1.0, 3.0);
  vec3 reflection = reflectionEffect(uEnvMap, normal, viewDir, uReflectionMix);

  color += fresnel;
  color = mix(color, reflection, uReflectionMix);

  gl_FragColor = vec4(color, 1.0);
}
