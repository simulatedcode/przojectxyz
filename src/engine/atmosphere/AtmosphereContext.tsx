'use client'

import React, {
  createContext,
  useState,
  ReactNode,
  useRef,
  useCallback,
  useEffect
} from 'react'
import { bladeRunnerAmbient } from '../presets/bladeRunnerAmbient'
import { AtmospherePreset } from './AtmosphereTypes'
import { useTimeline } from '@/core/timeline/useTimeline'
import gsap from 'gsap'
import * as THREE from 'three'

export interface SegmentPreset {
  start: number
  end: number
  preset: AtmospherePreset
}

function deepClonePreset(p: AtmospherePreset): AtmospherePreset {
  return {
    name: p.name,
    fog: { ...p.fog },
    light: { ...p.light, position: [...p.light.position] as [number, number, number] },
    environment: { ...p.environment },
    reflection: { ...p.reflection },
    postfx: { ...p.postfx },
  }
}

interface AtmosphereContextValue {
  preset: AtmospherePreset
  setPreset: (newPreset: AtmospherePreset, duration?: number) => void
}

export const AtmosphereContext = createContext<AtmosphereContextValue | undefined>(undefined)

interface AtmosphereProviderProps {
  children: ReactNode
  segments?: SegmentPreset[]
  defaultPreset?: AtmospherePreset
}

export function AtmosphereProvider({ 
  children, 
  segments = [],
  defaultPreset = bladeRunnerAmbient 
}: AtmosphereProviderProps) {
  const [preset, setPresetState] = useState<AtmospherePreset>(defaultPreset)
  const progress = useTimeline((s) => s.progress)
  
  const currentPresetRef = useRef<AtmospherePreset>(deepClonePreset(defaultPreset))
  const activeSegmentRef = useRef<AtmospherePreset | null>(null)
  const needsUpdateRef = useRef(false)

  const triggerUpdate = useCallback(() => {
    if (!needsUpdateRef.current) {
      needsUpdateRef.current = true
      requestAnimationFrame(() => {
        setPresetState({ ...currentPresetRef.current })
        needsUpdateRef.current = false
      })
    }
  }, [])

  const animateValue = useCallback((
    obj: Record<string, unknown>,
    key: string,
    targetValue: number | string,
    duration: number
  ) => {
    if (typeof targetValue === 'string' && targetValue.startsWith('#')) {
      const colorObj = new THREE.Color(obj[key] as string)
      const targetColor = new THREE.Color(targetValue)
      
      gsap.to(colorObj, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          obj[key] = `#${colorObj.getHexString()}`
          triggerUpdate()
        }
      })
    } else if (typeof targetValue === 'number') {
      gsap.to(obj, {
        [key]: targetValue,
        duration,
        ease: 'power2.inOut',
        onUpdate: triggerUpdate
      })
    }
  }, [triggerUpdate])

  const interpolatePreset = useCallback((
    current: AtmospherePreset,
    target: AtmospherePreset,
    segmentProgress: number,
    duration: number
  ) => {
    const adjustedDuration = Math.max(0.05, duration * (1 - segmentProgress))
    
    const keys = ['fog', 'light', 'environment', 'reflection', 'postfx'] as const
    
    keys.forEach((key) => {
      const currentSection = current[key]
      const targetSection = target[key] as Record<string, unknown>
      
      if (!currentSection || !targetSection) return
      
      Object.keys(targetSection).forEach((prop) => {
        const targetVal = targetSection[prop]
        if (targetVal === undefined) return
        
        const currentVal = (currentSection as Record<string, unknown>)[prop]
        
        if (key === 'fog') {
          const props = ['color', 'near', 'far', 'density'] as const
          if (props.includes(prop as typeof props[number])) {
            animateValue(currentSection as Record<string, unknown>, prop, targetVal as number | string, adjustedDuration)
          }
        } else if (key === 'light') {
          const props = ['color', 'intensity', 'ambientIntensity', 'intensityAttenuation'] as const
          if (props.includes(prop as typeof props[number]) || (prop === 'position' && Array.isArray(targetVal))) {
            if (prop === 'position' && Array.isArray(targetVal) && Array.isArray(currentVal)) {
              targetVal.forEach((v, i) => {
                if (currentVal[i] !== undefined) {
                  animateValue(currentSection as Record<string, unknown>, `${prop}.${i}`, v, adjustedDuration)
                }
              })
            } else {
              animateValue(currentSection as Record<string, unknown>, prop, targetVal as number | string, adjustedDuration)
            }
          }
        } else if (key === 'postfx') {
          const props = ['vignette', 'noise', 'contrast', 'brightness', 'exposure', 'bloom'] as const
          if (props.includes(prop as typeof props[number])) {
            animateValue(currentSection as Record<string, unknown>, prop, targetVal as number | string, adjustedDuration)
          }
        } else if (key === 'environment') {
          if (prop === 'topColor' || prop === 'bottomColor') {
            animateValue(currentSection as Record<string, unknown>, prop, targetVal as string, adjustedDuration)
          } else if (prop === 'envIntensity') {
            animateValue(currentSection as Record<string, unknown>, prop, targetVal as number, adjustedDuration)
          }
        } else if (key === 'reflection') {
          const props = ['intensity', 'fresnelPower'] as const
          if (props.includes(prop as typeof props[number])) {
            animateValue(currentSection as Record<string, unknown>, prop, targetVal as number, adjustedDuration)
          }
        }
      })
    })
  }, [animateValue])

  useEffect(() => {
    let activePreset: AtmospherePreset | null = null
    let segmentProgress = 0
    
    for (const segment of segments) {
      if (progress >= segment.start && progress <= segment.end) {
        activePreset = segment.preset
        segmentProgress = (progress - segment.start) / (segment.end - segment.start)
        break
      }
    }
    
    if (!activePreset) {
      activePreset = defaultPreset
    }

    if (activePreset && activePreset !== activeSegmentRef.current) {
      activeSegmentRef.current = activePreset
      gsap.killTweensOf(currentPresetRef.current)
      interpolatePreset(currentPresetRef.current, activePreset, segmentProgress, 0.8)
    }
  }, [progress, segments, defaultPreset, interpolatePreset])

  const setPreset = useCallback((targetPreset: AtmospherePreset, duration = 1.5) => {
    gsap.killTweensOf(currentPresetRef.current)
    interpolatePreset(currentPresetRef.current, targetPreset, progress, duration)
  }, [interpolatePreset, progress])

  return (
    <AtmosphereContext.Provider value={{ preset, setPreset }}>
      {children}
    </AtmosphereContext.Provider>
  )
}