precision highp float;

uniform vec3 uColor;
uniform float uReflectionMix;
uniform float uFresnelIntensity;
uniform samplerCube uEnvMap;
uniform float uOpacity;

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);

  vec3 color = baseColor(uColor);

  // 🔥 use uniform (not hardcoded)
  float fresnel = fresnelEffect(normal, viewDir, uFresnelIntensity, 5.0);

  vec3 reflection = reflectionEffect(uEnvMap, normal, viewDir, uReflectionMix);

  // 🔥 fresnel-driven reflection (cinematic)
  float reflectionStrength = fresnel * uReflectionMix;

  color += fresnel;
  color = mix(color, reflection, reflectionStrength);

  gl_FragColor = vec4(color, uOpacity);
}