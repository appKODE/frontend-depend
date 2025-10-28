import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import styled, { css, ThemeProvider } from 'styled-components'

import { theme } from '../shared/theme'
import { PanelButton } from '../shared/ui/atoms'
import { Panel } from '../shared/ui/organisms'
import {
  TConfigs,
  TPanelEnv,
  TPanelUrl,
} from '../shared/ui/organisms/panel/types'
import { addConsoleActivation } from '../features/hidden-activation'
import { useRequestInterception } from '../processes'
import { parseHeaders } from '../shared/lib'
import {
  DataResolver,
  DataStorage,
  EnvSpec,
  Header,
  Schema,
  Spec,
  StrRecord,
  UrlSpec,
} from '../types'
import { createPathFinder } from '../lib'
import { TUrlHeaders } from '../shared/ui/organisms/endpoints-list/types'
import { getEndpointsHeaders } from '../shared/lib/helpers'

type ButtonPosition = {
  left?: string
  right?: string
  top?: string
  bottom?: string
}

type PathfinderProviderProps = {
  children: JSX.Element
  storage: DataStorage
  resolver: DataResolver
  defaultSpecs?: Schema[]
  dataKey: string
  active?: boolean
  buttonPosition?: ButtonPosition
}

const ActionWrapper = styled.div<ButtonPosition & { hidden?: boolean }>`
  position: fixed;
  right: ${({ right }) => right || '9px'};
  bottom: ${({ bottom }) => bottom || '9px'};
  ${({ left }) =>
    left
      ? css`
          left: ${left};
        `
      : undefined}
  ${({ top }) =>
    top
      ? css`
          top: ${top};
        `
      : undefined}
  z-index: 9999999;
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  position: relative;
  z-index: 25;
  margin: 24px;
  height: 90%;

  * {
    box-sizing: border-box;
    font-family: sans-serif;
  }
`

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 100dvw;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.decorative.dark.translucent};
  backdrop-filter: blur(3px);
`

const toPanelUrl = (url: UrlSpec): TPanelUrl => ({
  id: url.id,
  method: url.method,
  template: url.template,
  name: url.name,
  responses: url.responses,
})

const toPanelEnv = (env: EnvSpec): TPanelEnv => ({
  id: env.id,
  name: env.name,
})

export const Pathfinder = ({
  children,
  resolver,
  storage,
  dataKey,
  defaultSpecs,
  buttonPosition,
  active,
}: PathfinderProviderProps) => {
  const module = useMemo(() => {
    return createPathFinder({ data: storage, dataKey, resolver })
  }, [resolver, storage])

  const [spec, setSpec] = useState<Spec[] | null>(module.getSpecs())
  const [globalHeaders, setGlobalHeaders] = useState<StrRecord<Header[]>>(
    module.getGlobalHeaders(),
  )

  const endpointsHeadersDefault: StrRecord<TUrlHeaders | {}> =
    getEndpointsHeaders(module.getEndpointHeaders, spec) || {}

  const [endpointsHeaders, setEndpointsHeaders] = useState<
    StrRecord<TUrlHeaders | {}>
  >(endpointsHeadersDefault)

  const [isOpen, setOpen] = useState(false)
  const [isActive, setActive] = useState(active)

  useEffect(() => {
    addConsoleActivation(setActive)
  }, [setActive])

  useRequestInterception(module, isActive || false)

  const handleToggle = useCallback(() => {
    setOpen(prevState => !prevState)
  }, [])

  const handleChangeDefaultEnv = (envId: string | null, specId: string) => {
    module.setGlobalEnv(envId, specId)
  }

  const handleChangeUrlEnv = (
    urlId: string,
    specId: string,
    envId?: string,
  ) => {
    module.setUrlEnv(urlId, specId, envId)
  }

  const loadSpec = (data: unknown[]) => {
    module.setSpecs(data)
    const specs = module.getSpecs()
    setSpec(specs)
    const getLocalEndpointHeader = module.getEndpointHeaders
    const endpoints = getEndpointsHeaders(getLocalEndpointHeader, specs)
    setEndpointsHeaders(endpoints)
  }
  useEffect(() => {
    if (defaultSpecs) {
      loadSpec(defaultSpecs)
    }
  }, [])

  if (!isActive) {
    return <Fragment>{children}</Fragment>
  }

  const handleLoadSpec = (data: unknown[]) => {
    loadSpec(data)
  }

  const handleOnResetOptions = () => {
    module.reset()
    setSpec(module.getSpecs())
  }

  const configs: TConfigs[] = []
  const initialUrlValues: StrRecord<string> = {}

  spec?.forEach(item => {
    configs.push({
      specId: item.id,
      config: {
        urlList:
          item?.urls.map(url => {
            const newUrl = toPanelUrl(url)
            const envId = module.getUrlEnv(newUrl.id, item.id)
            initialUrlValues[newUrl.id] = envId || ''
            return newUrl
          }) || [],
        envList: item?.envs.map(toPanelEnv) || [],
      },
    })
  })

  const onChangeDefaultHeadersHandler = (value: string, specId: string) => {
    const headers = parseHeaders(value)
    module.setGlobalHeaders(headers, specId)
    setGlobalHeaders(module.getGlobalHeaders())
  }

  const onChangeEndpointHeadersHandler = (
    value: string,
    id: string,
    specId: string,
  ) => {
    const headers = parseHeaders(value)

    module.setEndpointHeaders(id, headers, specId)
    setEndpointsHeaders(prev => ({ ...prev, [specId]: { [id]: value } }))
  }

  return (
    <ThemeProvider theme={theme}>
      <div>{children}</div>
      <ActionWrapper {...buttonPosition} hidden={isOpen}>
        <PanelButton onClick={handleToggle} />
      </ActionWrapper>
      <Container hidden={!isOpen}>
        <Overlay onClick={() => setOpen(false)} />
        <Content>
          <Panel
            urlHeaders={endpointsHeaders}
            configs={configs}
            urlEnvInitialValues={initialUrlValues}
            onLoadSpec={handleLoadSpec}
            defaultEnvId={module.getGlobalEnv()}
            defaultHeaders={globalHeaders}
            onClose={handleToggle}
            onChangeDefaultEnv={handleChangeDefaultEnv}
            onChangeUrlEnv={handleChangeUrlEnv}
            onChangeEndpointHeaders={onChangeEndpointHeadersHandler}
            onChangeDefaultHeaders={onChangeDefaultHeadersHandler}
            onResetOptions={handleOnResetOptions}
          />
        </Content>
      </Container>
    </ThemeProvider>
  )
}
