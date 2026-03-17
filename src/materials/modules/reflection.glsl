// materials/modules/reflection.glsl

vec3 reflectionEffect(
  samplerCube envMap,
  vec3 normal,
  vec3 viewDir,
  float mixStrength
) {
  // ⚡️ High-precision view-dependent reflection
  vec3 n = normalize(normal);
  vec3 v = normalize(viewDir);
  vec3 reflectDir = reflect(-v, n);
  
  // 🏙 Sample environment (compatible with samplerCube)
  vec3 envColor = textureCube(envMap, reflectDir).rgb;

  return envColor * mixStrength;
}
