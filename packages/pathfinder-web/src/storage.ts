import {
  GetStorageFn,
  GlobalEnvGetter,
  GlobalEnvSetter,
  GlobalHeadersGetter,
  GlobalHeadersSetter,
  Header,
  Spec,
  SpecsGetter,
  Storage,
  StrRecord,
  UrlEnvGetter,
  UrlEnvSetter,
  UrlHeadersGetter,
  UrlHeadersSetter,
} from './types'

export const ENDPOINTS_KEY = 'endpoints'
export const GLOBAL_ENV_KEY = 'global'
export const SPEC_KEY = 'spec'
export const ENDPOINTS_HEADERS_KEY = 'edpoints-headers'
export const GLOBAL_HEADERS_KEY = 'global-headers'

export const getStorage: GetStorageFn = adapter => {
  const getEndpointsOptions = <T>(key: string): StrRecord<T> | undefined => {
    let result

    try {
      const optionsString = adapter.getItem(key)

      if (optionsString) {
        const parsedOptions = JSON.parse(optionsString) as StrRecord<T>

        if (typeof parsedOptions === 'object') {
          result = parsedOptions
        }
      }
    } catch (e) {
      console.error(e)
    }

    return result
  }

  /* Env */
  // Endpoints {"specId" : {"endpointName" : "enviromentId", "endpointName2" : "enviromentId"}, "specId2":...}
  // Global: { "specId" : envIdNumber,  }

  const getEndpointEnv: UrlEnvGetter = (urlId, specId) => {
    const options = getEndpointsEnv()
    const globalEnv = getGlobalEnv()[specId]
    if (options && options[specId] && options[specId][urlId]) {
      return options[specId][urlId]
    }
    return globalEnv || null
  }

  const getEndpointsEnv = () => {
    const rawData = adapter.getItem(ENDPOINTS_KEY)

    if (rawData) {
      try {
        return JSON.parse(rawData) as StrRecord<StrRecord<string>>
      } catch (e) {
        return {}
      }
    }

    return {}
  }

  const setEndpointEnv: UrlEnvSetter = (urlId, specId, envId) => {
    const options = getEndpointsEnv()
    const specEndpointEnv = options[specId]
    const res = {
      ...options,
      [specId]: { ...specEndpointEnv, [urlId]: envId },
    }
    adapter.setItem(ENDPOINTS_KEY, JSON.stringify(res))
  }

  const resetEndpointsEnv = () => {
    adapter.setItem(ENDPOINTS_KEY, '{}')
  }

  const resetGlobalEnv = () => {
    adapter.setItem(GLOBAL_ENV_KEY, '{}')
  }

  const getGlobalEnv: GlobalEnvGetter = () => {
    const rawEnv = adapter.getItem(GLOBAL_ENV_KEY)

    if (rawEnv) {
      try {
        return JSON.parse(rawEnv) as StrRecord<string>
      } catch (e) {
        return {}
      }
    }

    return {}
  }

  const setGlobalEnv: GlobalEnvSetter = (envId, specId) => {
    if (envId) {
      const envs = getGlobalEnv()
      adapter.setItem(
        GLOBAL_ENV_KEY,
        JSON.stringify({ ...envs, [specId]: envId }),
      )
    }
  }

  /* Specification */

  const setSpecs = (data: Spec[]) => {
    const newSpecsNames = new Set(data.map(spec => spec.id))
    const oldSpecs =
      getSpecs()?.filter(spec => !newSpecsNames.has(spec.id)) || []
    adapter.setItem(SPEC_KEY, JSON.stringify([...data, ...oldSpecs]))
  }

  const getSpecs: SpecsGetter = () => {
    const rawSpec = adapter.getItem(SPEC_KEY)

    if (rawSpec) {
      try {
        return JSON.parse(rawSpec) as Spec[]
      } catch (e) {
        return null
      }
    }
    return null
  }

  /* Headers */
  // {specIdNumber : [{key: key1, value: value1}, ...]}

  const setGlobalHeaders: GlobalHeadersSetter = (data, specId) => {
    const headers = getGlobalHeaders()

    adapter.setItem(
      GLOBAL_HEADERS_KEY,
      JSON.stringify({ ...headers, [specId]: data }),
    )
  }

  const getGlobalHeaders: GlobalHeadersGetter = () => {
    const rawData = adapter.getItem(GLOBAL_HEADERS_KEY)

    if (rawData) {
      try {
        return JSON.parse(rawData) as StrRecord<
          { key: string; value: string }[]
        >
      } catch (e) {
        return {}
      }
    }
    return {}
  }

  const setEndpointHeaders: UrlHeadersSetter = (urlId, headers, specId) => {
    const options = getEndpointsOptions<Header[]>(ENDPOINTS_HEADERS_KEY)
    const spec = options ? options[specId] : null
    const newSpec = spec ? { ...spec, [urlId]: headers } : { [urlId]: headers }
    const res = { ...options, [specId]: newSpec }
    adapter.setItem(ENDPOINTS_HEADERS_KEY, JSON.stringify(res))
  }

  const getEndpointHeaders: UrlHeadersGetter = (urlId, specId) => {
    const options = getEndpointsOptions<StrRecord<Header[]>>(
      ENDPOINTS_HEADERS_KEY,
    )
    if (options && options[specId] && options[specId][urlId]) {
      return options[specId][urlId]
    }

    return []
  }

  const resetGlobalHeaders: () => void = () => {
    adapter.setItem(GLOBAL_HEADERS_KEY, '{}')
  }

  const resetEndpointsHeaders: () => void = () => {
    adapter.setItem(ENDPOINTS_HEADERS_KEY, '')
  }

  const storage: Storage = {
    getSpecs,
    setSpecs,
    getEndpointEnv,
    setEndpointEnv,
    resetEndpointsEnv,
    resetGlobalEnv,
    getGlobalEnv,
    setGlobalEnv,
    getEndpointHeaders,
    getGlobalHeaders,
    resetEndpointsHeaders,
    resetGlobalHeaders,
    setEndpointHeaders,
    setGlobalHeaders,
  }

  return storage
}
