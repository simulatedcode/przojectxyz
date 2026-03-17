// materials/modules/fresnel.glsl

float fresnelEffect(vec3 normal, vec3 viewDir, float intensity, float power) {
  float f = 1.0 - dot(normal, viewDir);
  return pow(f, power) * intensity;
}
