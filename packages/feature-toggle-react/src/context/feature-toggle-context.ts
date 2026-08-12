import { createContext } from 'react'
import type { TFeatureToggleContext } from './types'

const initialValue = {} as TFeatureToggleContext

export const FeatureToggleContext =
  createContext<TFeatureToggleContext>(initialValue)
