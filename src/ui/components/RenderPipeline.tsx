'use client'

import React from 'react'
import * as THREE from 'three'
import { Effect, BlendFunction } from 'postprocessing'
import { wrapEffect } from '@react-three/postprocessing'
import { useTimeline } from '@/core/timeline/useTimeline'
import vhsModule from '@/materials/modules/vhs.glsl'

/**
 * 📼 VHS Effect (Stable + Cinematic)
 */
class VHSEffectImpl extends Effect {
  constructor({ opacity = 0.12 } = {}) {
    super(
      'VHSEffect',
      /* glsl */ `
      uniform float time;
      uniform float opacity;

      ${vhsModule}

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

        vec2 distortedUv = uv;

        // =========================
        // 🎬 DISTORTION (VISIBLE)
        // =========================
        float wave = sin(uv.y * 8.0 + time * 3.0);
        distortedUv.x += wave * 0.02 * opacity;

        // =========================
        // ⚡ GLITCH SPIKE (RARE)
        // =========================
        float glitch = step(0.98, fract(time * 1.2));
        distortedUv.y += glitch * 0.15;

        // =========================
        // 🎥 SAMPLE SCENE
        // =========================
        vec4 sceneColor = texture2D(inputBuffer, distortedUv);

        // =========================
        // 📺 SCANLINES (CLEAN)
        // =========================
        float scan = vhsScanlines(uv, 0.8, 200.0);

        // =========================
        // 📟 FILM GRAIN (CENTERED)
        // =========================
        float grain = vhsGrain(uv, time, 0.6);

        // =========================
        // ⚡ FLICKER
        // =========================
        float flicker = 1.0 + 0.02 * sin(time * 80.0);

        // =========================
        // 🎨 RGB SPLIT
        // =========================
        float r = texture2D(inputBuffer, distortedUv + vec2(0.002 * opacity, 0.0)).r;
        float g = texture2D(inputBuffer, distortedUv).g;
        float b = texture2D(inputBuffer, distortedUv - vec2(0.002 * opacity, 0.0)).b;

        vec3 rgbShift = vec3(r, g, b);

        // =========================
        // 🎬 FINAL COMPOSITION
        // =========================
        vec3 color = mix(sceneColor.rgb, rgbShift, 0.55);

        color *= scan;              // scanlines
        color += grain * opacity;   // grain
        color *= flicker;           // flicker

        // =========================
        // OUTPUT
        // =========================
        outputColor = vec4(color, sceneColor.a);
      }
      `,
      {
        blendFunction: BlendFunction.ADD,
        uniforms: new Map([
          ['time', new THREE.Uniform(0)],
          ['opacity', new THREE.Uniform(opacity)],
        ]),
      }
    )
  }

  update(_: unknown, __: unknown, deltaTime: number) {
    const t = this.uniforms.get('time')
    if (t) t.value += deltaTime
  }
}

// wrap for R3F
export const VHSEffect = wrapEffect(VHSEffectImpl)

/**
 * 🎬 Render Pipeline (Timeline Driven)
 */
export default function RenderPipeline({ opacity = 0.12 }) {
  const progress = useTimeline((s) => s.progress)

  // smoother cinematic curve
  const intensity = opacity * smoothstep(0.0, 0.8, progress)

  return <VHSEffect opacity={intensity} />
}

/**
 * 🧠 helper (JS side)
 */
function smoothstep(min: number, max: number, v: number) {
  const x = Math.min(Math.max((v - min) / (max - min), 0), 1)
  return x * x * (3 - 2 * x)
}