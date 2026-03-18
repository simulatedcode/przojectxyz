// materials/useVHSMaterial.ts

import { useMemo } from 'react'
import { createVHSMaterial } from './VHSMaterial'

export function useVHSMaterial() {
  return useMemo(() => createVHSMaterial(), [])
}
