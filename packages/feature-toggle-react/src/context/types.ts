import type { FeatureFlags } from '../types'

export type TFeatureToggleContext = {
  featureFlags: FeatureFlags
  isLoading: boolean
}
