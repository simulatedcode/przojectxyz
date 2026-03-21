"use client"

import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import TimelineSystem from '@/core/timeline/TimelineSystem'
import ScrollManager from '@/core/timeline/ScrollManager'
import CameraRig from '@/core/camera/CameraRig'
import MainScene from '@/scenes/MainScene'
import Overlay from '@/ui/Overlay'

// ✅ Atmosphere
import { AtmosphereProvider } from '@/engine/atmosphere/AtmosphereContext'
import { AtmosphereSystem } from '@/engine/atmosphere/AtmosphereSystem'
import { bladeRunnerAmbient } from '@/engine/presets/bladeRunnerAmbient'

const ATMOSPHERE_PRESET = bladeRunnerAmbient

export default function Page() {
  return (
    <>
      <div className="h-[400vh]" />

      <ScrollManager />
      <Overlay />

      <Canvas
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        shadows="soft"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1
        }}
        camera={{ position: [0, 0.65, 0] }}
      >
        {/* ✅ MUST BE INSIDE CANVAS */}
        <AtmosphereProvider defaultPreset={ATMOSPHERE_PRESET}>

          {/* 🌌 FULL SYSTEM (SELF-CONTAINED) */}
          <AtmosphereSystem />

          {/* 🧠 SYSTEMS */}
          <TimelineSystem />
          <CameraRig />

          {/* 🎬 SCENES */}
          <MainScene />

        </AtmosphereProvider>
      </Canvas>
    </>
  )
}