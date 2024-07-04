import { useContext } from 'react'

import { FeatureToggleContext } from './provider'

export const useFeatureToggle = () => useContext(FeatureToggleContext)
