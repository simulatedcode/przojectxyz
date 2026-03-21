import { useAtmosphere } from '../atmosphere/useAtmosphere'

export function useReflection() {
  const { preset } = useAtmosphere()
  return preset.reflection
}
