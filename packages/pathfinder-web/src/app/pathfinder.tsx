// Polyfills for @stoplight/elements which expects global and process objects
if (typeof window !== 'undefined') {
  if (!(window as any).global) {
    ;(window as any).global = window
  }
  if (!(window as any).process) {
    ;(window as any).process = { env: {} }
  }
}

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import ReactDOM from 'react-dom'
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
import { usePanelResize, useDragPosition } from '../shared/hooks'
import {
  DataResolver,
  DataStorage,
  EnvSpec,
  Header,
  Spec,
  StrRecord,
  UrlSpec,
} from '../types'
import { createPathFinder } from '../lib'
import { TUrlHeaders } from '../shared/ui/organisms/endpoints-list/types'
import { getEndpointsHeaders } from '../shared/lib/helpers'
import { GLOBAL_ENV_MARKER } from '../constants'

export type PanelPosition = 'bottom' | 'top' | 'left' | 'right'

const POSITION_KEY = 'pathfinder-panel-position'

type PathfinderProviderProps = {
  children: JSX.Element
  storage: DataStorage
  resolver: DataResolver
  defaultSpecs?: unknown[]
  dataKey: string
  active?: boolean
}

const ActionWrapper = styled.div<{ $x: number; $y: number; hidden?: boolean }>`
  position: fixed;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  z-index: 9999999;
  touch-action: none;
  user-select: none;
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`

const PanelShell = styled.div<{ $position: PanelPosition; $size: number }>`
  position: fixed;
  z-index: 9999;
  background-color: ${({ theme }) => theme.colors.panel.bg};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  * {
    box-sizing: border-box;
    font-family: sans-serif;
  }

  ${({ $position, $size }) => {
    switch ($position) {
      case 'bottom':
        return css`
          bottom: 0;
          left: 0;
          right: 0;
          height: min(${$size}px, 85vh);
          border-top: 1px solid;
          padding-bottom: env(safe-area-inset-bottom, 0px);
        `
      case 'top':
        return css`
          top: 0;
          left: 0;
          right: 0;
          height: min(${$size}px, 85vh);
          border-bottom: 1px solid;
        `
      case 'left':
        return css`
          top: 0;
          left: 0;
          bottom: 0;
          width: min(${$size}px, 85vw);
          border-right: 1px solid;
        `
      case 'right':
        return css`
          top: 0;
          right: 0;
          bottom: 0;
          width: min(${$size}px, 85vw);
          border-left: 1px solid;
        `
    }
  }}
  border-color: ${({ theme }) => theme.colors.panel.border};
`

const ResizeHandle = styled.div<{ $position: PanelPosition }>`
  position: absolute;
  background: ${({ theme }) => theme.colors.panel.handleBg};
  touch-action: none;
  transition: background 0.15s;
  z-index: 1;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.panel.handleHover};
  }

  ${({ $position }) => {
    switch ($position) {
      case 'bottom':
        return css`
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          cursor: ns-resize;
        `
      case 'top':
        return css`
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          cursor: ns-resize;
        `
      case 'left':
        return css`
          top: 0;
          right: 0;
          bottom: 0;
          width: 4px;
          cursor: ew-resize;
        `
      case 'right':
        return css`
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          cursor: ew-resize;
        `
    }
  }}
`

const toPanelUrl = (url: UrlSpec): TPanelUrl => ({
  id: url.id,
  method: url.method,
  template: url.template,
  name: url.name,
  responses: url.responses,
  tags: url.tags,
})

const toPanelEnv = (env: EnvSpec): TPanelEnv => ({
  id: env.id,
  name: env.name,
  baseUrl: env.baseUrl,
})

export const Pathfinder = ({
  children,
  resolver,
  storage,
  dataKey,
  defaultSpecs,
  active,
}: PathfinderProviderProps) => {
  const module = useMemo(() => {
    return createPathFinder({ data: storage, dataKey, resolver })
  }, [resolver, storage])

  const [spec, setSpec] = useState<Spec[] | null>(module.getSpecs())
  const [rawSpecs, setRawSpecs] = useState<Map<string, unknown>>(new Map())
  const [defaultSpecIds, setDefaultSpecIds] = useState<Set<string>>(new Set())
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

  const [panelPosition, setPanelPosition] = useState<PanelPosition>(() => {
    if (typeof localStorage === 'undefined') return 'bottom'
    const stored = localStorage.getItem(POSITION_KEY)
    return (stored as PanelPosition) || 'bottom'
  })

  const [portalRoot] = useState(() => {
    const el = document.createElement('div')
    el.setAttribute('id', 'pathfinder-portal-root')
    return el
  })

  useEffect(() => {
    document.body.appendChild(portalRoot)
    return () => {
      document.body.removeChild(portalRoot)
    }
  }, [portalRoot])

  const { size: panelSize, onPointerDown: onDragPointerDown } =
    usePanelResize(panelPosition)

  const {
    pos: buttonPos,
    didDrag,
    onPointerDown: onButtonPointerDown,
  } = useDragPosition()

  useEffect(() => {
    // Initialize safe-area-inset CSS variables for mobile support
    const updateSafeAreaVars = () => {
      const root = document.documentElement
      const safeTop = parseInt(
        window.getComputedStyle(root).getPropertyValue('safe-area-inset-top') ||
          '0',
      )
      const safeBottom = parseInt(
        window
          .getComputedStyle(root)
          .getPropertyValue('safe-area-inset-bottom') || '0',
      )
      const safeLeft = parseInt(
        window
          .getComputedStyle(root)
          .getPropertyValue('safe-area-inset-left') || '0',
      )
      const safeRight = parseInt(
        window
          .getComputedStyle(root)
          .getPropertyValue('safe-area-inset-right') || '0',
      )

      root.style.setProperty('--safe-area-inset-top', `${safeTop}px`)
      root.style.setProperty('--safe-area-inset-bottom', `${safeBottom}px`)
      root.style.setProperty('--safe-area-inset-left', `${safeLeft}px`)
      root.style.setProperty('--safe-area-inset-right', `${safeRight}px`)
    }

    updateSafeAreaVars()
    window.addEventListener('resize', updateSafeAreaVars)
    return () => window.removeEventListener('resize', updateSafeAreaVars)
  }, [])

  useEffect(() => {
    addConsoleActivation(setActive)
  }, [setActive])

  useRequestInterception(module, isActive || false)

  const handleToggle = useCallback(() => {
    setOpen(prevState => !prevState)
  }, [])

  const handleToggleIfNotDragged = useCallback(() => {
    if (!didDrag.current) handleToggle()
  }, [handleToggle, didDrag])

  const handleChangePosition = useCallback((pos: PanelPosition) => {
    setPanelPosition(pos)
    localStorage.setItem(POSITION_KEY, pos)
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

    // Сохраняем raw спецификации для Preview
    const rawSpecsMap = new Map<string, unknown>()
    if (specs) {
      specs.forEach((parsedSpec, index) => {
        if (data[index]) {
          rawSpecsMap.set(parsedSpec.id, data[index])
        }
      })
    }
    setRawSpecs(rawSpecsMap)

    const getLocalEndpointHeader = module.getEndpointHeaders
    const endpoints = getEndpointsHeaders(getLocalEndpointHeader, specs)
    setEndpointsHeaders(endpoints)
  }

  useEffect(() => {
    if (defaultSpecs) {
      loadSpec(defaultSpecs)
      const specs = module.getSpecs()
      if (specs) {
        setDefaultSpecIds(new Set(specs.map(s => s.id)))
      }
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

  const handleRemoveSpec = (specId: string) => {
    // Don't allow removing default specs
    if (defaultSpecIds.has(specId)) {
      return
    }
    const updatedSpecs = spec?.filter(s => s.id !== specId) || []
    setSpec(updatedSpecs)
    const getLocalEndpointHeader = module.getEndpointHeaders
    const endpoints = getEndpointsHeaders(getLocalEndpointHeader, updatedSpecs)
    setEndpointsHeaders(endpoints)
  }

  const configs: TConfigs[] = []
  const initialUrlValues: StrRecord<string> = {}

  spec?.forEach(item => {
    const globalEnv = module.getGlobalEnv()[item.id]

    configs.push({
      specId: item.id,
      config: {
        urlList:
          item?.urls.map(url => {
            const newUrl = toPanelUrl(url)
            const storedEnvId = module.getUrlEnv(newUrl.id, item.id)

            // Если нет сохраненного значения или оно совпадает с глобальным,
            // используем маркер GLOBAL
            if (!storedEnvId || storedEnvId === globalEnv) {
              initialUrlValues[newUrl.id] = GLOBAL_ENV_MARKER
            } else {
              initialUrlValues[newUrl.id] = storedEnvId
            }

            return newUrl
          }) || [],
        envList: item?.envs.map(toPanelEnv) || [],
      },
      specDocument: rawSpecs.get(item.id) as object | undefined,
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
      <ActionWrapper
        $x={buttonPos.x}
        $y={buttonPos.y}
        hidden={isOpen}
        onPointerDown={onButtonPointerDown}>
        <PanelButton onClick={handleToggleIfNotDragged} />
      </ActionWrapper>
      {ReactDOM.createPortal(
        isOpen ? (
          <ThemeProvider theme={theme}>
            <PanelShell $position={panelPosition} $size={panelSize}>
              <ResizeHandle
                $position={panelPosition}
                onPointerDown={onDragPointerDown}
              />
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
                position={panelPosition}
                onChangePosition={handleChangePosition}
                onRemoveSpec={handleRemoveSpec}
                defaultSpecIds={defaultSpecIds}
              />
            </PanelShell>
          </ThemeProvider>
        ) : null,
        portalRoot,
      )}
    </ThemeProvider>
  )
}
