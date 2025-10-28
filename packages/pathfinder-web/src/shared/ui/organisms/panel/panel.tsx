import React, { useMemo, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import {
  THeadersChangeHandler,
  TUrlHeaders,
  TUrlItem,
} from '../endpoints-list/types'
import { Header, Tabs } from '../../molecules'
import { TRadioOptions } from '../../atoms/radio-input/types'
import { TConfigs } from './types'
import { SearchInput } from '../../flows'
import { Header as THeader, StrRecord, UrlMethod } from '../../../../types'
import { SpecPanel } from '../spec-panel'
import { stringifyHeaders } from '../../../lib/stringify-headers'
import { filterPath, getData } from './helpers'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.main.light.normal};
  border-radius: 16px;
  padding: 0 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export type Path = {
  specId: string
  paths: TUrlItem[]
}

type Props = {
  configs: TConfigs[]
  defaultEnvId: StrRecord<string>
  urlEnvInitialValues: StrRecord<string>
  defaultHeaders: StrRecord<THeader[]>
  urlHeaders: Record<string, {} | TUrlHeaders>
  onClose: () => void
  onChangeDefaultEnv: (envId: string | null, specId: string) => void
  onChangeUrlEnv: (urlId: string, specId: string, envId?: string) => void
  onLoadSpec: (data: unknown[]) => void
  onChangeDefaultHeaders: (headers: string, specId: string) => void
  onChangeEndpointHeaders: THeadersChangeHandler
  onResetOptions: () => void
}

export const Panel = ({
  configs,
  defaultEnvId,
  urlEnvInitialValues,
  defaultHeaders,
  urlHeaders,
  onClose,
  onChangeDefaultEnv,
  onChangeUrlEnv,
  onLoadSpec,
  onChangeDefaultHeaders,
  onChangeEndpointHeaders,
  onResetOptions,
}: Props) => {
  const [defaultEnv, setDefaultValue] =
    useState<Record<string, string>>(defaultEnvId)
  const { methods: initMethods, paths: defaultPaths } = getData(configs)
  const [filteredMethods, setFilteredMethods] =
    useState<UrlMethod[]>(initMethods)
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredPaths, setFilteredPaths] = useState<Path[]>(defaultPaths)
  const [currSpec, setCurrSpec] = useState<string | null>(
    configs.at(0)?.specId || null,
  )

  useEffect(() => {
    setFilteredPaths(defaultPaths)
    if (!currSpec) {
      setCurrSpec(configs.at(0)?.specId || null)
    }
  }, [configs])

  useEffect(() => {
    const newPaths = filterPath(defaultPaths, filteredMethods, searchValue)
    setFilteredPaths(newPaths)
  }, [searchValue, filteredMethods])

  useEffect(() => {
    document.addEventListener('keydown', handleEscButton)
    return () => document.removeEventListener('keydown', handleEscButton)
  }, [])

  const onHandleChange = (value: string) => {
    setSearchValue(value)
  }

  const handleEscButton = (e: KeyboardEvent) => {
    if (!e.repeat && e.key === 'Escape') {
      onClose()
    }
  }

  const environments = useMemo<
    {
      specId: string
      enviroments: TRadioOptions[]
    }[]
  >(
    () =>
      configs.map(config => {
        return {
          specId: config.specId,
          enviroments: config.config.envList.map(env => ({
            value: env.id,
            label: env.name,
          })),
        }
      }),
    [configs],
  )

  const resetOptions = useCallback(() => {
    setDefaultValue({})
    onResetOptions()
  }, [onResetOptions])

  const onClearHandler = () => {
    setFilteredPaths(defaultPaths)
    setSearchValue('')
  }

  const onSelectMethod = (selectedMethod: UrlMethod | null) => {
    if (selectedMethod) {
      setFilteredMethods([selectedMethod])
    }
  }

  const specConfig = configs.find(spec => spec.specId === currSpec)
  const tabs = configs.map(config => ({
    children: config.specId,
    isSelected: config.specId === specConfig?.specId,
    count: filteredPaths.find(paths => paths.specId === config.specId)?.paths
      .length,
    onClick: () => setCurrSpec(config.specId),
  }))

  return (
    <Wrapper>
      <Header onClose={onClose}>PathFinder</Header>
      <SearchInput
        value={searchValue}
        methods={initMethods}
        onClearHandler={onClearHandler}
        onSelectMethod={onSelectMethod}
        onHandleChange={onHandleChange}
      />
      <Tabs onLoadSpec={onLoadSpec} tabs={tabs} />
      {specConfig && (
        <SpecPanel
          specId={specConfig.specId}
          environments={
            environments.find(env => env.specId === specConfig.specId)
              ?.enviroments
          }
          defaultHeaders={stringifyHeaders(defaultHeaders[specConfig.specId])}
          defaultEnv={defaultEnv[specConfig.specId]}
          config={specConfig.config}
          urlHeaders={urlHeaders[specConfig.specId]}
          filteredPaths={
            filteredPaths.find(paths => paths.specId === specConfig.specId)
              ?.paths
          }
          urlEnvInitialValues={urlEnvInitialValues}
          onChangeDefaultHeaders={onChangeDefaultHeaders}
          resetOptions={resetOptions}
          onChangeDefaultEnv={onChangeDefaultEnv}
          setDefaultValue={(value: string) => {
            setDefaultValue({ ...defaultEnv, [specConfig.specId]: value })
          }}
          onChangeUrlEnv={(urlId, envId) => {
            onChangeUrlEnv(urlId, specConfig.specId, envId)
          }}
          onChangeEndpointHeaders={onChangeEndpointHeaders}
        />
      )}
    </Wrapper>
  )
}
