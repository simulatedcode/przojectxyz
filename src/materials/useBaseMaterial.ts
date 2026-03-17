// materials/useBaseMaterial.ts

import { useMemo } from 'react'
import { createBaseMaterial } from './BaseMaterial'

export function useBaseMaterial() {
  return useMemo(() => createBaseMaterial(), [])
}
