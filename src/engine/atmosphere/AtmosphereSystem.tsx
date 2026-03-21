'use client'

import React from 'react'
import { FogModule } from '../modules/FogModule'
import { LightModule } from '../modules/LightModule'
import { EnvironmentModule } from '../modules/EnvironmentModule'
import { PostFXModule } from '../modules/PostFXModule'
import { AtmosphereControls } from '../modules/AtmosphereControls'

/**
 * AtmosphereSystem
 * 
 * Orchestrates the full visual mood of the scene by rendering 
 * all sub-modules (Fog, Light, Environment, PostFX).
 * 
 * Must be wrapped in an AtmosphereProvider.
 */
export function AtmosphereSystem() {
  return (
    <>
      <AtmosphereControls />
      <FogModule />
      <LightModule />
      <EnvironmentModule />
      <PostFXModule />
    </>
  )
}
