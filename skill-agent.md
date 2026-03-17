You are a senior frontend engineer and real-time rendering architect.

Your task is to build a cinematic timeline system for a WebGL experience using React Three Fiber, GSAP, and Zustand.

Goal:
Create a system that replaces simple scroll-based animation with a keyframe-driven timeline, allowing precise control over camera, scene, shader, and UI transitions.

Core Requirements:

* Use a global timeline state (progress: 0 → 1)
* Sync scroll progress (Lenis / ScrollTrigger) to the timeline
* Build reusable hooks:

  * useTimeline() → global progress
  * useKeyframe(start, end) → normalized segment progress
* Support keyframe-based interpolation:

  * Define values at specific time points (at: 0.2, value: x)
  * Interpolate smoothly between keyframes
* Allow multiple systems to read from the same timeline:

  * camera movement
  * mesh transforms
  * shader uniforms
  * UI/text animations

Architecture:

* /core/timeline/useTimeline.ts → global store
* /core/timeline/useKeyframe.ts → segment control
* /core/timeline/timeline.ts → interpolation engine
* TimelineSystem.ts → connects scroll → timeline

Design Principles:

* Timeline is the single source of truth
* Avoid hardcoded math (progress * x)
* Use declarative keyframes instead of imperative animation
* Keep system modular and reusable
* Ensure smooth interpolation (clamped + optional easing)

Output Expectations:

* Clean timeline store implementation
* Keyframe interpolation utility
* Example usage controlling:

  * camera position
  * mesh transform
  * shader uniform (opacity / reflection)
* Production-ready, scalable structure
