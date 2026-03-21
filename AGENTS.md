# AGENTS.md

## Project Overview

This is **przojectxyz** — a WebGL storytelling experience built with Next.js, React Three Fiber, and GSAP. The project uses scroll-driven animations with cinematic camera movements, atmosphere presets, and a custom overlay UI system.

---

## Commands

```bash
# Development
npm run dev          # Start dev server (Next.js)
npm run build        # Production build
npm run start         # Start production server

# Code Quality
npm run lint          # Run ESLint (eslint-config-next with TypeScript)

# Type Checking
npx tsc --noEmit      # Full TypeScript check
```

### Single Test/File Commands

ESLint checks the entire codebase by default. For targeted linting:
```bash
npx eslint src/path/to/file.tsx
```

---

## Code Style Guidelines

### File Structure

```
src/
├── app/            # Next.js app router pages and layout
├── core/           # Core systems (camera, timeline, providers)
├── engine/         # 3D engine modules (atmosphere, fog, lights, postfx)
├── materials/      # GLSL materials and shaders
├── scenes/         # Scene compositions
├── store/          # Zustand state management
├── types/          # Shared TypeScript types
└── ui/             # HTML overlay components
```

### Imports

- **Path aliases**: Use `@/` for src-relative imports (e.g., `@/core/timeline/useTimeline`)
- **Order**: React imports → third-party → internal modules → local components
- **Three.js**: Import types from `three` directly, not barrel exports
- **React Three Fiber**: Use named imports from `@react-three/fiber`
- **Drei**: Use named imports from `@react-three/drei`

```tsx
// Good
import React from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import { useTimeline } from '@/core/timeline/useTimeline'
import { AtmosphereSystem } from '@/engine/atmosphere/AtmosphereSystem'

// Avoid barrel imports from internal modules
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `CameraRig`, `AtmosphereSystem` |
| Hooks | camelCase with `use` prefix | `useTimeline`, `useSceneStore` |
| Store slices | camelCase | `useScrollStore`, `useSceneStore` |
| Files | kebab-case or PascalCase for components | `Ground.tsx`, `CameraRig.tsx` |
| GLSL shaders | kebab-case with extension | `grid_vert.glsl`, `grid_frag.glsl` |
| Constants | SCREAMING_SNAKE for magic numbers | `MAX_INTENSITY`, `ANIMATION_DURATION` |

### TypeScript

- **Strict mode enabled** — no implicit any
- **Use explicit types** for function parameters and return values
- **Avoid `any`** — use `unknown` and type guards when necessary
- **Interface naming**: Use `InterfaceName` suffix for complex interfaces, or prefix with context (`AtmosphereContextValue`)
- **Type aliases** for simple unions or state shapes

```tsx
// Good
interface GroundProps {
  reflectionIntensity?: number
  baseColor?: string
  gridColor?: string
}

export function Ground({ baseColor = '#0A0F0A' }: GroundProps) { ... }

// Store types
type SceneState = {
  heroMesh: RefObject<Mesh> | null
  setHeroMesh: (ref: RefObject<Mesh>) => void
}

// Bad
function Ground({ color }) { ... }  // No types
```

### React Components

- **Server Components**: Default (no `'use client'`)
- **Client Components**: Add `'use client'` as first line
- **Functional components only** — no class components
- **Export**: Use named exports for scene/engine components, default for page components

```tsx
// Client component with 'use client'
'use client'

import React from 'react'
import { useFrame } from '@react-three/fiber'

export function CameraRig() { ... }

// Page component (default export)
export default function Page() { ... }
```

### React Three Fiber Patterns

- **Canvas placement**: Only in client components, inside the Canvas tree
- **Hooks**: `useFrame` for per-frame updates, `useThree` for camera/scene access
- **Refs for mutable state**: Use refs for values that change every frame (avoid re-renders)
- **Cleanup**: Return cleanup function from `useEffect` when needed

```tsx
export function CameraRig() {
  const smoothP = useRef(0)
  const { camera } = useThree()

  useFrame((_, delta) => {
    smoothP.current += delta
    camera.position.x = smoothP.current
  })

  return null
}
```

### State Management (Zustand)

- **Stores in `src/store/`** with `use*Store` naming
- **Typed state**: Always provide TypeScript interface for store shape
- **Actions**: Inline setter functions or use `set` with partial updates

```tsx
type TimelineState = {
  progress: number
  setProgress: (p: number) => void
}

export const useTimeline = create<TimelineState>((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
}))
```

### GLSL Shaders

- **Location**: `src/materials/` directory
- **Naming**: `{name}_vert.glsl` and `{name}_frag.glsl`
- **Precision**: Set `precision highp float;` in fragment shaders
- **Uniforms**: Define in TypeScript `ShaderMaterial` and GLSL header

### CSS/Styling

- **Tailwind CSS v4** with `@import "tailwindcss"`
- **CSS Variables**: Define in `:root` for theme values
- **Custom classes**: Use lowercase with hyphens for non-Tailwind classes
- **Overlay components**: Position fixed, `pointer-events: none` by default

### Error Handling

- **No console.error** in production code
- **Optional chaining** for nested object access
- **Null checks** before accessing Three.js objects
- **Try-catch** for async operations with meaningful error messages

### Performance Considerations

- **Avoid object allocation in `useFrame`** — use refs for mutable values
- **Cap delta time**: `const dt = Math.min(delta, 0.05)` to prevent physics explosions
- **Batch state updates**: Use refs to prevent excessive React re-renders
- **Dispose Three.js objects**: Clean up geometries, materials, and textures in `useEffect` cleanup

---

## Architecture Patterns

### Atmosphere System

```
AtmosphereProvider (Context)
    └── AtmosphereSystem
            ├── FogModule
            ├── LightModule
            ├── EnvironmentModule
            └── PostFXModule
```

All atmosphere-related components must be inside `AtmosphereProvider`.

### Scene Composition

```
Page
    └── Canvas
            └── AtmosphereProvider
                    ├── AtmosphereSystem
                    ├── CameraRig
                    └── MainScene
                            ├── Ground
                            ├── IntroScene
                            ├── HeroScene
                            └── ProjectsScene
```

### Timeline System

Global scroll progress (0→1) drives all animations via `useTimeline` store. Camera rig and scene elements read from this single source of truth.

---

## Important Notes

- All 3D components MUST be inside React Three Fiber `Canvas`
- Environment/map textures need null checks (`scene.environment ?? null`)
- GSAP animations should be killed before starting new ones (`gsap.killTweensOf`)
- Deep clone presets to avoid mutating source objects
