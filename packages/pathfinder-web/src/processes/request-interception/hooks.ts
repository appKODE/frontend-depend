import { useEffect } from 'react'
import intercept from 'fetch-intercept'

import { createTemplatesBySpec } from '../../lib'
import { Header, Pathfinder } from '../../types'
import { findSpecIdByOrigin } from '../../features/web-core/find-spec-id'
import { findBaseApi } from '../../features/web-core/find-base-api'

type TMergeGlobalEndEndpointHeadersArg = {
  globalHeaders: Header[]
  endpointHeaders: Header[]
}
const mergeGlobalAndEndpointHeaders = ({
  endpointHeaders,
  globalHeaders,
}: TMergeGlobalEndEndpointHeadersArg): Record<string, string> => {
  if (globalHeaders.length === 0) {
    return endpointHeaders.reduce((acc, current) => {
      return { ...acc, [current.key]: current.value }
    }, {})
  }

  return globalHeaders.reduce((acc, current) => {
    const endpointHeader = endpointHeaders.find(h => h.key === current.key)

    const headerValue = endpointHeader?.value || current.value

    return { ...acc, [current.key]: headerValue }
  }, {})
}

export function useRequestInterception(
  pathfinder: Pathfinder,
  active: boolean,
) {
  // fetch
  useEffect(() => {
    if (!active) {
      return
    }

    const unregister = intercept.register({
      request(
        url: string,
        config: RequestInit | undefined,
      ): Promise<any[]> | any[] {
        const specs = pathfinder.getSpecs()

        if (!specs) {
          return [url, config]
        }
        const requestOrigin = new URL(url).origin
        const specId = findSpecIdByOrigin(specs, requestOrigin)
        const basePath = findBaseApi(specs, requestOrigin)
        const spec = specs.find(spec => spec.id === specId)

        if (!spec) {
          return [url, config]
        }
        const templatesBySpec = spec.urls
          ? createTemplatesBySpec(spec.urls)
          : null

        const method = config?.method || 'GET'

        const endpointSpec = templatesBySpec
          ? pathfinder.findSpec(templatesBySpec, method, url, basePath)
          : null

        const endpointHeaders: Header[] = endpointSpec
          ? pathfinder.getEndpointHeaders(endpointSpec.id, specId)
          : []

        const globalHeaders = pathfinder.getGlobalHeaders()

        const newHeaders = mergeGlobalAndEndpointHeaders({
          globalHeaders: globalHeaders[specId] || [],
          endpointHeaders,
        })

        if (config?.headers) {
          config.headers = { ...config.headers, ...newHeaders }
        } else {
          config = { ...config, headers: { ...newHeaders } }
        }

        const envSpecs = spec?.envs

        const newUrl = templatesBySpec
          ? pathfinder.buildUrl({
              templatesBySpec,
              method,
              url,
              envSpecs,
              specs,
            })
          : url

        return [newUrl, config]
      },
    })

    return () => {
      unregister()
    }
  }, [pathfinder, active])

  // XMLHttpRequest
  useEffect(() => {
    if (!active) {
      return
    }
    const open = XMLHttpRequest.prototype.open
    const setRequestHeader = XMLHttpRequest.prototype.setRequestHeader

    XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL,
    ) {
      const urlString = typeof url === 'string' ? url : url.toString()
      const specs = pathfinder.getSpecs()

      if (!specs) {
        return
      }
      const origin = typeof url === 'string' ? new URL(url).origin : url.origin
      const specId = findSpecIdByOrigin(specs, origin)
      const spec = specs.find(spec => spec.id === specId)

      if (!spec) {
        return
      }
      const basePath = findBaseApi(specs, origin)

      const envSpecs = spec?.envs
      const templatesBySpec = spec?.urls
        ? createTemplatesBySpec(spec.urls)
        : null

      const endpointSpec = templatesBySpec
        ? pathfinder.findSpec(
            templatesBySpec,
            method.toUpperCase(),
            urlString,
            basePath,
          )
        : null

      const endpointHeaders: Header[] = endpointSpec
        ? pathfinder.getEndpointHeaders(endpointSpec.id, specId)
        : []

      const globalHeaders = pathfinder.getGlobalHeaders()

      const newUrl = templatesBySpec
        ? pathfinder.buildUrl({
            templatesBySpec,
            method,
            url: urlString,
            envSpecs,
            specs,
          })
        : urlString

      arguments[1] = newUrl

      const newHeaders = mergeGlobalAndEndpointHeaders({
        globalHeaders: globalHeaders[specId] || [],
        endpointHeaders,
      })

      open.apply(this, arguments as any)

      Object.getOwnPropertyNames(newHeaders).forEach(header => {
        if (newHeaders[header]) {
          setRequestHeader.apply(this, [header, newHeaders[header]])
        }
      })
    }

    return () => {
      XMLHttpRequest.prototype.open = open
      XMLHttpRequest.prototype.setRequestHeader = setRequestHeader
    }
  }, [pathfinder, active])
}
