import { FindSpecFn, Spec, UrlBuilder, UrlEnvGetter } from '../../types'
import { CreateUrlFn } from './create-url'

import { ParseUrlFn } from './parse-url'
import { findSpecIdByOrigin } from './find-spec-id'
import { findBaseApi } from './find-base-api'

type UrlBuilderFabric = (arg: {
  specGetter: FindSpecFn
  urlEnvGetter: UrlEnvGetter
  createUrl: CreateUrlFn
  parseUrl: ParseUrlFn
  specs: Spec[] | null
}) => UrlBuilder

/**
 *
 * Преобразует переданный URL с учетом параметров которые укзаны для данного запроса в pathfinder
 * Параметры: baseUrl, env query params (UrlSpec)
 *
 */
export const makeBuildUrl: UrlBuilderFabric =
  ({ specGetter, urlEnvGetter, createUrl, parseUrl, specs }) =>
  ({ templatesBySpec, method, url, envSpecs }) => {
    if (!specs) {
      return url
    }
    const basePath = findBaseApi(specs, new URL(url).origin)

    const urlSpec = specGetter(templatesBySpec, method, url, basePath)

    const parsedUrl = parseUrl(url)
    const possiblePrefix = new URL(basePath).pathname
    const prefix = possiblePrefix === '/' ? '' : possiblePrefix // url.pathname если адресс вида https://dev.ru/ выдает '/'
    // А при https://dev.ru/api/, api/

    if (!urlSpec || !parsedUrl) {
      return url
    }

    const specId = findSpecIdByOrigin(specs, new URL(url).origin)
    const envId = urlEnvGetter(urlSpec.id, specId)

    const env = envSpecs?.find(item => item.id === envId)
    if (!env) {
      return url
    }
    if (env?.baseUrl) {
      parsedUrl.baseUrl = env.baseUrl
    }

    if (env?.queryParams) {
      for (const queryKey of Object.keys(env.queryParams)) {
        const queryVal = env.queryParams[queryKey]
        parsedUrl.query.set(queryKey, queryVal)
      }
    }

    parsedUrl.path = parsedUrl.path.replace(prefix, '')
    const result = createUrl({ ...parsedUrl })

    return result || url
  }
