precision highp float;

uniform vec3 uColor;
uniform float uTime;
uniform float uVhsStrength;
uniform float uChromaticAberration;
uniform float uScanlineIntensity;
uniform float uPixelSize;
uniform samplerCube uEnvMap;
uniform float uOpacity;
uniform vec2 uResolution; // ✅ ADD THIS

varying vec3 vNormal;
varying vec3 vViewDir;

// === MODULE FUNCTIONS (assumed injected) ===
// vhsChromaticAberration
// vhsScanlines
// vhsGrain (updated version)
// vhsPixelate

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);

  // ===============================
  // 🎨 1. BASE REFLECTION (CORE LOOK)
  // ===============================
  float abOffset = uChromaticAberration * uVhsStrength;

  vec3 baseColor = vhsChromaticAberration(
    uEnvMap,
    normal,
    viewDir,
    abOffset
  );

  // ===============================
  // 📺 2. SCREEN UV (FIXED)
  // ===============================
  vec2 screenUV = gl_FragCoord.xy / uResolution;

  // ===============================
  // 📟 3. PIXELATION (STABLE)
  // ===============================
  vec2 pixelUV = vhsPixelate(screenUV, uPixelSize);

  // ===============================
  // 📼 4. SCANLINES (CLEAN)
  // ===============================
  float scan = vhsScanlines(
    screenUV,
    uScanlineIntensity * uVhsStrength,
    200.0 // 🔥 reduced from 800 → clean lines
  );

  // ===============================
  // 📟 5. FILM GRAIN (NOT NOISE)
  // ===============================
  float grain = vhsGrain(pixelUV, uTime, 0.01 * uVhsStrength);

  // ===============================
  // ⚡ 6. VHS DISTORTION (ADDED)
  // ===============================
  float wave = sin(screenUV.y * 8.0 + uTime * 3.0);
  float distortion = wave * 0.02 * uVhsStrength;

  baseColor += distortion;

  // ===============================
  // ⚡ 7. FLICKER
  // ===============================
  float flicker = 1.0 + 0.03 * sin(uTime * 60.0);

  // ===============================
  // 🎨 8. FINAL COMPOSITION
  // ===============================

  vec3 color = baseColor;

  // apply scanlines (darken)
  color *= scan;

  // apply grain (centered)
  color += grain;

  // flicker
  color *= flicker;

  // tint
  color *= uColor;

  // ===============================
  // 🎬 OUTPUT
  // ===============================
  gl_FragColor = vec4(color, uOpacity);
}