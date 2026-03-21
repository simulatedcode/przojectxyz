You are a senior real-time rendering engineer and technical artist.

Your task is to design and implement a reusable **AAA Reflective Ground System** for a Three.js / React Three Fiber project, following game-engine-level standards (Unreal / Unity quality mindset).

---

## 🎯 OBJECTIVE

Build a **physically believable reflective ground material system** with:

* Environment-based reflections
* Fresnel edge lighting (cinematic rim)
* Roughness-controlled surface behavior (future-ready)
* Modular shader architecture (TSL-ready)
* Integration with AtmosphereSystem

The system must be reusable, scalable, and visually cinematic.

---

## 🧱 SYSTEM ARCHITECTURE

Structure the implementation as:

/materials
/core
fresnel.ts
reflection.ts

/ground
GroundMaterial.ts
Ground.tsx

---

## 🧩 DESIGN PRINCIPLES

1. **Modular Shader Design**

   * Fresnel logic must be isolated
   * Reflection logic must be isolated
   * No monolithic shader

2. **Physically Inspired (not fake)**

   * Reflection based on view direction
   * Fresnel based on angle between view and normal

3. **TSL-Ready**

   * Code must be structured so it can be migrated to node-based shader system later

4. **Reusable Material**

   * GroundMaterial must be usable on any mesh
   * No scene-specific hacks

---

## ⚙️ CORE SHADER REQUIREMENTS

### Reflection System

* Use reflection vector:

  reflect(-viewDir, normal)

* Sample environment map:

  textureCube(uEnvMap, reflectVec)

* Controlled by:

  uReflectionIntensity

---

### Fresnel System

* Formula:

  pow(1.0 - dot(viewDir, normal), power)

* Controlled by:

  * uFresnelPower
  * uFresnelIntensity

* Used to:

  * brighten edges
  * enhance cinematic look

---

### Final Shading Model

Combine:

* Base color
* Reflection contribution
* Fresnel edge boost

Final output:

color = mix(baseColor, envColor, reflection)
color += fresnel * intensity

---

## 🎨 VISUAL TARGET

The ground should look like:

* Dark surface (near black/blue)
* Subtle mirror reflection
* Bright edges at grazing angles
* Smooth cinematic feel
* Works well with fog + low light

Mood keywords:
"void", "cinematic", "minimal", "reflective", "calm"

---

## 🌊 GROUND COMPONENT REQUIREMENTS

* Large plane (e.g. 200x200)
* Rotated flat (XZ plane)
* Receives environment reflection
* Uses custom GroundMaterial

---

## 🌌 ENVIRONMENT REQUIREMENT

The system MUST support environment reflections via:

scene.environment

Fallback allowed:

* drei `<Environment />`

But preferred:

* AtmosphereSystem integration

---

## 🔌 INTEGRATION WITH ATMOSPHERE SYSTEM

GroundMaterial must support:

preset.reflection = {
intensity: number,
fresnelPower: number
}

These values should drive shader uniforms.

---

## 🚀 ADVANCED EXTENSIONS (IMPORTANT)

Design system so it can be extended with:

1. Roughness-based reflection blur
2. Screen-space reflection (SSR)
3. Height-based fog blending
4. Animated surface distortion
5. TSL node-based migration

---

## ❌ AVOID

* Hardcoded values inside shader
* Using MeshStandardMaterial for reflection
* Mixing logic into one giant shader
* Scene-specific hacks

---

## ✅ OUTPUT REQUIREMENTS

When implementing:

1. Create GroundMaterial (shaderMaterial)
2. Implement Fresnel + Reflection logic
3. Build Ground component
4. Connect envMap from scene
5. Expose configurable uniforms
6. Show usage in MainScene

---

## 🧠 DEBUG REQUIREMENTS

If ground appears black or not reflective:

* Check environment map exists
* Verify uEnvMap is assigned
* Ensure camera is above ground
* Validate normal direction
* Confirm reflection vector is correct

---

## 🧠 MINDSET

You are not creating a mesh.

You are building a **surface rendering system**.

Every decision must support:

* realism
* reusability
* scalability
* cinematic quality

---

## 🔥 BONUS (HIGHLY RECOMMENDED)

Design the system so it can later be rewritten in TSL without changing logic structure.
