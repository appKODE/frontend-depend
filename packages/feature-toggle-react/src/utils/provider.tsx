import React, { ReactNode, createContext, useEffect, useState } from 'react'

import { FeatureToggleConfig } from '../feature-toggle-config'
import {
  FeatureFlags,
  FeatureToggleContext as FeatureToggleContextType,
} from '../types'

const initialValue = {} as any

export const FeatureToggleContext =
  createContext<FeatureToggleContextType>(initialValue)

type Props = {
  children: ReactNode
  config: FeatureToggleConfig
}

export const FeatureToggleProvider = ({ children, config }: Props) => {
  const {
    defaultFlags,
    fetcher,
    storage: { getFeatureFlags, setFeatureFlags },
  } = config

  const [stateFlags, setStateFlags] = useState(defaultFlags)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const setFlags = async () => {
      const flags = await getFeatureFlags()

      setStateFlags(flags)
    }

    const getRemoteFlags = async () => {
      if (fetcher) {
        try {
          setIsFetching(true)
          const flags = await fetcher()

          if (flags) {
            setStateFlags(prev => {
              const newFlags = {
                ...prev,
                ...flags,
              }

              setFeatureFlags(newFlags)

              return newFlags
            })
          }
        } catch (error) {
          console.error(error)
        } finally {
          setIsFetching(false)
        }
      }
    }

    const init = async () => {
      await setFlags()
      getRemoteFlags()
    }

    init()
  }, [getFeatureFlags])

  const hasFeatureFlag = (flag: keyof FeatureFlags) => {
    return stateFlags[flag]
  }

  const value: FeatureToggleContextType = {
    flags: stateFlags,
    isFetching,
    hasFeatureFlag,
  }

  return (
    <FeatureToggleContext.Provider value={value}>
      {children}
    </FeatureToggleContext.Provider>
  )
}
