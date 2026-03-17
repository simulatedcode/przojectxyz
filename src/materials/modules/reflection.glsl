// materials/modules/reflection.glsl

vec3 reflectionEffect(
  samplerCube envMap,
  vec3 normal,
  vec3 viewDir,
  float mixStrength
) {
  vec3 reflectDir = reflect(-viewDir, normal);
  vec3 envColor = textureCube(envMap, reflectDir).rgb;

  return envColor * mixStrength;
}
