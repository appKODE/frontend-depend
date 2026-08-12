import type { FeatureFlags } from '../types'

export type FeatureToggleProviderProps = {
  children: React.ReactNode
  defaultFlags?: FeatureFlags
}
