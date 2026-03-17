// materials/modules/fresnel.glsl

float fresnelEffect(vec3 normal, vec3 viewDir, float intensity, float power) {
  // 📐 Physically-inspired Schlick approximation
  vec3 n = normalize(normal);
  vec3 v = normalize(viewDir);
  float ndotv = max(dot(n, v), 0.0);
  float f = pow(1.0 - ndotv, power);
  
  return f * intensity;
}
