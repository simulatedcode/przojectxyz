import { create } from 'zustand'
import { Mesh } from 'three'
import { RefObject, createRef } from 'react'

type TrackingData = { x: number; y: number; visible: boolean }

type SceneState = {
  // Intro
  introMesh: RefObject<Mesh | null>
  setIntroMesh: (ref: RefObject<Mesh | null>) => void
  introTracking: TrackingData
  setIntroTracking: (data: TrackingData) => void

  // Hero
  heroMesh: RefObject<Mesh | null>
  setHeroMesh: (ref: RefObject<Mesh | null>) => void
  heroTracking: TrackingData
  setHeroTracking: (data: TrackingData) => void

  // Projects
  projectsMesh: RefObject<Mesh | null>
  setProjectsMesh: (ref: RefObject<Mesh | null>) => void
  projectsTracking: TrackingData
  setProjectsTracking: (data: TrackingData) => void
}

export const useSceneStore = create<SceneState>((set) => ({
  // Intro
  introMesh: createRef<Mesh>(),
  setIntroMesh: (ref) => set({ introMesh: ref }),
  introTracking: { x: 0, y: 0, visible: false },
  setIntroTracking: (data) => set({ introTracking: data }),

  // Hero
  heroMesh: createRef<Mesh>(),
  setHeroMesh: (ref) => set({ heroMesh: ref }),
  heroTracking: { x: 0, y: 0, visible: false },
  setHeroTracking: (data) => set({ heroTracking: data }),

  // Projects
  projectsMesh: createRef<Mesh>(),
  setProjectsMesh: (ref) => set({ projectsMesh: ref }),
  projectsTracking: { x: 0, y: 0, visible: false },
  setProjectsTracking: (data) => set({ projectsTracking: data }),
}))
