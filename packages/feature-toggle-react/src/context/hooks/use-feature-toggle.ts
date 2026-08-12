import { useContext } from 'react'
import { FeatureToggleContext } from '../feature-toggle-context'

export const useFeatureToggle = () => useContext(FeatureToggleContext)
