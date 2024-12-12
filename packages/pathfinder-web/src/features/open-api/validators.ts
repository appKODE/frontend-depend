/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CookieParameter,
  HeaderParameter,
  OpenApiSpec,
  Operation,
  OperationType,
  Parameter,
  PathParameter,
  Paths,
  QueryParameter,
  Server,
} from '../../types'

export function isOperationType(val: string): val is OperationType {
  return /^(get|put|post|delete|options|head|patch|trace)$/.test(val)
}
// @ts-ignore
export function isQueryParameter(obj: any): obj is QueryParameter {
  return true
}
// @ts-ignore
export function isPathParameter(obj: any): obj is PathParameter {
  return true
}
// @ts-ignore
export function isHeaderParameter(obj: any): obj is HeaderParameter {
  return true
}
// @ts-ignore
export function isCookieParameter(obj: any): obj is CookieParameter {
  return true
}

export function isOperation(obj: any): obj is Operation {
  if (!obj.hasOwnProperty('operationId') || !obj.hasOwnProperty('summary')) {
    return false
  }

  const keys = Object.keys(obj)
  return keys.reduce<boolean>((previous, key) => {
    if (key === 'operationId') {
      return previous && typeof obj[key] === 'string'
    }
    if (key === 'summary') {
      return previous && typeof obj[key] === 'string'
    }
    if (key === 'tags') {
      return previous && Array.isArray(obj[key])
    }

    if (key === 'description') {
      return previous && typeof obj[key] === 'string'
    }

    if (key === 'parameters') {
      return previous && isParameter(obj[key])
    }

    if (key === 'deprecated') {
      return previous && typeof obj[key] === 'boolean'
    }

    return previous
  }, true)
}

export function isParameter(obj: any): obj is Parameter {
  return (
    isQueryParameter(obj) ||
    isPathParameter(obj) ||
    isHeaderParameter(obj) ||
    isCookieParameter(obj)
  )
}

export function isPaths(obj: any): obj is Paths {
  const keys = Object.keys(obj)
  return keys.reduce<boolean>((previous, key) => {
    if (key === 'summary') {
      return previous && typeof obj[key] === 'string'
    }

    if (key === 'description') {
      return previous && typeof obj[key] === 'string'
    }

    if (key === 'parameters') {
      return previous && isParameter(obj[key])
    }

    if (isOperationType(key)) {
      return previous && isOperation(obj[key])
    }

    return previous
  }, true)
}

export function isServers(obj: any): obj is Server[] {
  return (
    Array.isArray(obj) &&
    obj.reduce<boolean>((previous, server) => {
      if (!server.hasOwnProperty('url') || typeof server['url'] !== 'string') {
        return false
      }

      if (server.hasOwnProperty('description')) {
        return previous && typeof server['description'] === 'string'
      }

      return previous
    }, true)
  )
}

export function isOpenApiSpec(obj: any): obj is OpenApiSpec {
  const hasInfo = obj.hasOwnProperty('info')
  const hasServers = obj.hasOwnProperty('servers') && isServers(obj.servers)
  const hasPaths = obj.hasOwnProperty('paths') && isPaths(obj.paths)
  return hasServers && hasPaths && hasInfo
}
