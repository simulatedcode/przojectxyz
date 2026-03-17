"use client"

import { Canvas } from '@react-three/fiber'
import TimelineSystem from '@/core/timeline/TimelineSystem'
import ScrollManager from '@/core/timeline/ScrollManager'
import CameraRig from '@/core/camera/CameraRig'
import MainScene from '@/scenes/MainScene'
import { Environment } from '@react-three/drei'
import Overlay from '@/ui/Overlay'

export default function Page() {
  return (
    <>
      {/* UI scroll space */}
      <div className="h-[400vh]" />

      {/* 🛰 EXTERNAL ORCHESTRATOR */}
      <ScrollManager />
      <Overlay />

      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1 // Ensure it stays behind UI
        }}

        camera={{ position: [10, 0.65, 0] }}>

        {/* 🌍 GLOBAL LIGHTING */}
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} />
        <TimelineSystem />
        <CameraRig />
        <MainScene />
      </Canvas>
    </>
  )
}
