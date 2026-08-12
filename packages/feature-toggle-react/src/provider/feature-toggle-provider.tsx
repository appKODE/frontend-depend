import React, { useCallback, useLayoutEffect, useState } from 'react'
import { FeatureToggleContext } from '../context'
import type { FeatureFlags } from '../types'
import type { FeatureToggleProviderProps } from './types'

export const FeatureToggleProvider = ({
  children,
  defaultFlags,
}: FeatureToggleProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(
    defaultFlags ?? {},
  )

  const fetchStorageFlags = useCallback(async () => {
    return {}
  }, [])

  const fetchRemoteFlags = useCallback(async () => {
    return {}
  }, [])

  useLayoutEffect(() => {
    ;(async () => {
      const flags = await fetchRemoteFlags()
      setFeatureFlags(flags)
    })()
  }, [fetchStorageFlags])

  return (
    <FeatureToggleContext.Provider
      value={{
        featureFlags,
        isLoading,
      }}>
      {children}
    </FeatureToggleContext.Provider>
  )
}
