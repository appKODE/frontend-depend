import React, { ReactNode } from 'react'

import { FlagsNameProp } from '../types'

import { useFeatureToggle } from './use-feature-toggle'

type Props = {
  active: ReactNode
  inactive: ReactNode
} & FlagsNameProp

export const FeatureToggle = ({ active, inactive, name }: Props) => {
  const { hasFeatureFlag } = useFeatureToggle()

  return <>{hasFeatureFlag(name) ? active : inactive}</>
}
