import { useContext } from 'react'
import { AtmosphereContext } from './AtmosphereContext'

export function useAtmosphere() {
  const context = useContext(AtmosphereContext)
  if (context === undefined) {
    throw new Error('useAtmosphere must be used within an AtmosphereProvider')
  }
  return context
}
