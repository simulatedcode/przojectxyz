precision highp float;

uniform vec3 uGridColor;
uniform vec3 uBaseColor;
uniform float uGridScale;
uniform float uGridThickness;
uniform float uFresnelIntensity;
uniform float uFresnelPower;
uniform float uEnvIntensity;
uniform samplerCube uEnvMap;
uniform float uOpacity;
uniform float uTime;

varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec3 vViewDir;

float grid(vec2 p, float scale, float thickness) {
  vec2 coord = p * scale;
  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  float line = min(grid.x, grid.y);
  return 1.0 - min(line, 1.0);
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);

  float g = grid(vWorldPos.xz, uGridScale, uGridThickness);
  float gridLine = smoothstep(0.0, 0.15, g);

  vec3 gridColor = uGridColor;
  vec3 bgColor = uBaseColor;

  float NdotV = max(dot(normal, viewDir), 0.0);
  float fresnel = pow(1.0 - NdotV, uFresnelPower) * uFresnelIntensity;

  vec3 reflectDir = reflect(-viewDir, normal);
  vec3 envColor = textureCube(uEnvMap, reflectDir).rgb;

  vec3 color = mix(bgColor, gridColor, gridLine);

  float dist = length(vWorldPos.xz);
  float fade = 1.0 - smoothstep(20.0, 100.0, dist);

  color += fresnel * uGridColor * 0.4;
  color = mix(color, envColor, fresnel * uEnvIntensity);
  color *= fade * 0.8 + 0.2;

  gl_FragColor = vec4(color, uOpacity);
}
