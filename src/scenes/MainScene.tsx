// src/scenes/MainScene.tsx
'use client'

import IntroScene from './IntroScene'
import HeroScene from './HeroScene'
import ProjectsScene from './ProjectsScene'

export default function MainScene() {
  return (
    <>
      <IntroScene />
      <HeroScene />
      <ProjectsScene />
    </>
  )
}
