'use client'

import IntroScene from './IntroScene'
import HeroScene from './HeroScene'
import ProjectsScene from './ProjectsScene'
import { Ground } from '../materials/ground'
import { GLTFModel } from './components/GLTFModel'

export default function MainScene() {
  return (
    <>
      <Ground />
      <GLTFModel position={[0, 0, 0]} scale={4} />
      <IntroScene />
      <HeroScene />
      <ProjectsScene />
    </>
  )
}
