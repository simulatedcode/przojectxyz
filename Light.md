
You are a senior WebGL rendering engineer and AAA technical artist.

Your task is to design and implement a scalable, production-ready **Atmosphere System** for a Three.js / React Three Fiber project.

---

## 🎯 OBJECTIVE

Build a modular **AtmosphereSystem** that controls the full visual mood of a 3D scene, including:

* Lighting (directional, ambient)
* Fog / depth atmosphere
* Environment (HDRI or procedural gradient sky)
* Reflection parameters (for materials)
* Postprocessing (color grading, vignette, noise)

The system must behave like a simplified **game engine lighting pipeline** (Unreal / Unity style).

---

## 🧱 ARCHITECTURE REQUIREMENTS

Structure the system as:

/engine/atmosphere
AtmosphereSystem.ts
AtmosphereContext.ts
useAtmosphere.ts

/presets
voidMoon.ts
cyberpunk.ts
goldenHour.ts

/modules
FogModule.tsx
LightModule.tsx
EnvironmentModule.tsx
ReflectionModule.ts
PostFXModule.tsx

---

## 🧩 DESIGN PRINCIPLES

1. **Preset-driven system**

   * All visual states must come from a single preset object
   * No hardcoded values inside modules

2. **Modular pipeline**

   * Each visual responsibility is isolated:

     * FogModule → fog only
     * LightModule → lighting only
     * EnvironmentModule → sky only
     * PostFXModule → postprocessing only

3. **Runtime switching**

   * Must support:
     setPreset("voidMoon")
   * Smooth transitions preferred (lerp optional)

4. **Engine mindset**

   * This is NOT a component collection
   * This is a centralized rendering system

---

## 📦 PRESET STRUCTURE

Each preset must define:

* fog: { color, near, far }
* light: { color, intensity, position }
* environment: { topColor, bottomColor }
* reflection: { intensity, fresnelPower }
* postfx: { vignette, noise, contrast, brightness }

---

## 🌌 TARGET VISUAL STYLE (VOID MOON)

Recreate a cinematic atmosphere with:

* Dark blue/teal gradient sky
* Soft directional moonlight (low intensity)
* Heavy fog for depth
* Reflective ground feel
* Silhouette-friendly lighting (low contrast)
* Subtle vignette + noise

Mood keywords:
"lonely", "infinite", "calm", "cinematic", "minimal light"

---

## ⚙️ IMPLEMENTATION RULES

* Use React Three Fiber for rendering
* Use @react-three/postprocessing for post FX
* Use shaderMaterial for gradient sky
* Avoid heavy real-time shadows unless necessary
* Prefer artistic control over physical accuracy

---

## 🚀 ADVANCED EXTENSIONS (IMPORTANT)

Design the system so it can later support:

* Shader-based fog (depth + height fog)
* TSL material integration (for reflection + fresnel)
* Animated atmosphere (time-based transitions)
* Environment blending between presets
* Multi-scene synchronization via timeline

---

## ❌ AVOID

* Monolithic components
* Hardcoded lighting values
* Mixing responsibilities (e.g. fog inside LightModule)
* One-off scene-specific hacks

---

## ✅ OUTPUT FORMAT

When implementing:

1. Define types (AtmospherePreset)
2. Create at least one preset (voidMoon)
3. Build AtmosphereProvider + hook
4. Implement all modules
5. Show usage in a MainScene

Keep code clean, composable, and scalable.

---

## 🧠 MINDSET

You are not building UI.

You are building a **rendering system layer** on top of Three.js.

Every decision must support:

* scalability
* reusability
* visual consistency

---

## 🔥 BONUS

If possible, design the system so artists can tweak presets easily without touching core logic.
