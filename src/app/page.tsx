"use client"

import { Canvas } from '@react-three/fiber'
import TimelineSystem from '@/core/timeline/TimelineSystem'
import CameraRig from '@/core/camera/CameraRig'
import MainScene from '@/scenes/MainScene'
import { Environment } from '@react-three/drei'
import Overlay from '@/ui/Overlay'

export default function Page() {
  return (
    <>
      <TimelineSystem />

      {/* UI scroll space */}
      <div className="h-[400vh]" />
      <Overlay />

      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}

        camera={{ position: [0, 0, 5] }}>

        {/* 🌍 GLOBAL LIGHTING */}
        <Environment preset="city" />
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} />
        <CameraRig />
        <MainScene />
      </Canvas>
    </>
  )
}
