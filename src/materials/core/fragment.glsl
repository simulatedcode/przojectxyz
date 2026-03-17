precision highp float;

uniform vec3 uColor;
uniform float uReflectionMix;
uniform float uFresnelIntensity;
uniform samplerCube uEnvMap;
uniform float uOpacity;

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  // 📐 Normalize inputs for consistent math
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);

  // 🎨 1. Base Color
  vec3 color = baseColor(uColor);

  // 🔥 2. Fresnel (Rim Lighting) 
  // Power of 3.0 gives a nice organic falloff
  float fresnel = fresnelEffect(normal, viewDir, uFresnelIntensity, 3.0);

  // 🏙 3. View-dependent Reflection
  vec3 reflection = reflectionEffect(uEnvMap, normal, viewDir, uReflectionMix);

  // 🎬 Cinematic Blending
  // Fresnel drives reflection strength for that high-end look
  float reflectionStrength = fresnel * uReflectionMix;

  // Final composition: Base + Fresnel + Reflection (Fresnel-driven)
  color += fresnel * 0.2; // subtle rim boost
  color = mix(color, reflection, reflectionStrength);

  gl_FragColor = vec4(color, uOpacity);
}