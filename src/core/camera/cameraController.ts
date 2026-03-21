import * as THREE from 'three'
import { Shot, CameraRigState, CameraRigConfig, FilmRealismConfig } from './cameraTypes'
import { interpolateKeyframes, interpolateVector3Keyframes } from './cameraInterpolation'
import { spring } from './cameraEasing'

interface SpringState {
  position: THREE.Vector3
  target: THREE.Vector3
  fov: number
  roll: number
  focusDistance: number
  aperture: number
  velocityPosition: THREE.Vector3
  velocityTarget: THREE.Vector3
  velocityFov: number
  velocityRoll: number
  velocityFocus: number
  velocityAperture: number
}

const DEFAULT_REALISM: Required<FilmRealismConfig> = {
  velocityWeight: 0.3,
  depthScale: 0.4,
  targetLag: 0.6,
  directionalDrift: 0.15,
  inertiaSettle: 0.7
}

export function createShotController(config: CameraRigConfig) {
  const {
    shots,
    defaultFov = 50,
    defaultFocusDistance = 5,
    defaultAperture = 2.8,
    stiffness = 120,
    damping = 14,
  } = config

  const realism: Required<FilmRealismConfig> = {
    ...DEFAULT_REALISM,
    ...config.realism
  }

  const tempVec3 = new THREE.Vector3()
  const tempTarget = new THREE.Vector3()
  const tempPrevTarget = new THREE.Vector3()

  const driftOffset = { x: 0, y: 0, z: 0, time: 0 }
  const prevTargetPos = new THREE.Vector3()

  const state: SpringState = {
    position: new THREE.Vector3(0, 2, 15),
    target: new THREE.Vector3(0, 0, 0),
    fov: defaultFov,
    roll: 0,
    focusDistance: defaultFocusDistance,
    aperture: defaultAperture,
    velocityPosition: new THREE.Vector3(),
    velocityTarget: new THREE.Vector3(),
    velocityFov: 0,
    velocityRoll: 0,
    velocityFocus: 0,
    velocityAperture: 0
  }

  const findActiveShot = (progress: number): { shot: Shot | null; localProgress: number } => {
    for (let i = 0; i < shots.length; i++) {
      const shot = shots[i]
      if (progress >= shot.start && progress <= shot.end) {
        const localProgress = (progress - shot.start) / (shot.end - shot.start)
        return { shot, localProgress: Math.max(0, Math.min(1, localProgress)) }
      }
    }
    return { shot: null, localProgress: 0 }
  }

  const update = (
    progress: number,
    dt: number,
    outState: CameraRigState
  ): CameraRigState => {
    const { shot, localProgress } = findActive(progress)

    const targetPosition = tempVec3.set(0, 2, 15)
    const targetTarget = tempTarget.set(0, 0, 0)
    let targetFov = defaultFov
    let targetRoll = 0
    let targetFocus = defaultFocusDistance
    let targetAperture = defaultAperture

    if (shot) {
      interpolateVector3Keyframes(localProgress, shot.camera.position, shot.easing, targetPosition)
      interpolateVector3Keyframes(localProgress, shot.camera.target, shot.easing, targetTarget)
      targetFov = interpolateKeyframes(localProgress, shot.camera.fov, shot.easing)
      targetRoll = interpolateKeyframes(localProgress, shot.camera.roll, shot.easing)

      if (shot.focus) {
        targetFocus = interpolateKeyframes(localProgress, shot.focus.distance, shot.easing)
        targetAperture = interpolateKeyframes(localProgress, shot.focus.aperture, shot.easing)
      }
    }

    driftOffset.time += dt
    const driftSpeed = realism.directionalDrift * 0.5
    const dx = Math.sin(driftOffset.time * 0.7) * driftSpeed * 0.02 + Math.sin(driftOffset.time * 1.3) * driftSpeed * 0.01
    const dy = Math.sin(driftOffset.time * 0.5 + 1.1) * driftSpeed * 0.015 + Math.sin(driftOffset.time * 0.9) * driftSpeed * 0.008
    
    targetPosition.x += dx
    targetPosition.y += dy

    const velocityMagnitude = state.velocityPosition.length()
    const velocityFactor = Math.min(velocityMagnitude * 2, 1)
    const weightMultiplier = 1 + realism.velocityWeight * velocityFactor
    
    const depthFactor = 1 + (15 - state.position.z) * 0.01 * realism.depthScale

    const targetStiffness = stiffness * weightMultiplier * depthFactor
    const targetDamping = damping * (1 + velocityFactor * 0.3)

    const posSpring = spring(
      state.position.x, targetPosition.x, state.velocityPosition.x,
      targetStiffness, targetDamping, dt
    )
    state.velocityPosition.x = posSpring.velocity
    state.position.x = posSpring.value

    const posSpringY = spring(
      state.position.y, targetPosition.y, state.velocityPosition.y,
      targetStiffness, targetDamping, dt
    )
    state.velocityPosition.y = posSpringY.velocity
    state.position.y = posSpringY.value

    const posSpringZ = spring(
      state.position.z, targetPosition.z, state.velocityPosition.z,
      targetStiffness, targetDamping, dt
    )
    state.velocityPosition.z = posSpringZ.velocity
    state.position.z = posSpringZ.value

    const targetLagFactor = 1 - realism.targetLag * 0.5
    const laggedTarget = tempPrevTarget.copy(targetTarget).lerp(prevTargetPos, targetLagFactor)
    prevTargetPos.copy(targetTarget)

    const targetSpring = spring(
      state.target.x, laggedTarget.x, state.velocityTarget.x,
      stiffness * targetLagFactor, damping, dt
    )
    state.velocityTarget.x = targetSpring.velocity
    state.target.x = targetSpring.value

    const targetSpringY = spring(
      state.target.y, laggedTarget.y, state.velocityTarget.y,
      stiffness * targetLagFactor, damping, dt
    )
    state.velocityTarget.y = targetSpringY.velocity
    state.target.y = targetSpringY.value

    const targetSpringZ = spring(
      state.target.z, laggedTarget.z, state.velocityTarget.z,
      stiffness * targetLagFactor, damping, dt
    )
    state.velocityTarget.z = targetSpringZ.velocity
    state.target.z = targetSpringZ.value

    const settleFactor = 1 + realism.inertiaSettle * velocityFactor
    const fovSpring = spring(state.fov, targetFov, state.velocityFov, stiffness * 0.5 * settleFactor, damping, dt)
    state.velocityFov = fovSpring.velocity
    state.fov = fovSpring.value

    const rollSpring = spring(state.roll, targetRoll, state.velocityRoll, stiffness * 0.3 * settleFactor, damping, dt)
    state.velocityRoll = rollSpring.velocity
    state.roll = rollSpring.value

    const focusSpring = spring(state.focusDistance, targetFocus, state.velocityFocus, stiffness * 0.8 * settleFactor, damping, dt)
    state.velocityFocus = focusSpring.velocity
    state.focusDistance = focusSpring.value

    const apertureSpring = spring(state.aperture, targetAperture, state.velocityAperture, stiffness * 0.5 * settleFactor, damping, dt)
    state.velocityAperture = apertureSpring.velocity
    state.aperture = apertureSpring.value

    outState.position.copy(state.position)
    outState.target.copy(state.target)
    outState.fov = state.fov
    outState.roll = state.roll
    outState.focusDistance = state.focusDistance
    outState.aperture = state.aperture

    return outState
  }

  const findActive = findActiveShot

  return {
    update,
    findActive,
    getShots: () => shots
  }
}