import { getStorage } from './storage'
import { parseJSON } from './features/open-api'
import {
  DataResolver,
  EnvSpec,
  GlobalEnvGetter,
  GlobalEnvSetter,
  PathfinderBuilder,
  ResetHandler,
  Spec,
  SpecGetter,
  SpecsGetter,
  SpecsLibSetter,
  UrlEnvGetter,
  UrlEnvSetter,
  UrlSpec,
} from './types'
import {
  createUrl,
  parseUrl,
  findSpec,
  getStorageAdapter,
  makeBuildUrl,
} from './features/web-core'

export const openApiResolver: DataResolver = {
  parse: parseJSON,
}

export function createTemplatesBySpec(
  urlList: UrlSpec[],
): Map<UrlSpec, string> {
  const templatesBySpec = new Map<UrlSpec, string>()

  for (const urlSpec of urlList) {
    templatesBySpec.set(urlSpec, urlSpec.template)
  }

  return templatesBySpec
}

const createSpec = () => {
  let id: string = ''
  let urls: UrlSpec[] = []
  let envs: EnvSpec[] = []
  return {
    setUrls(data: UrlSpec[]) {
      urls = data
    },
    setEnvs(data: EnvSpec[]) {
      envs = data
    },
    setId(newId: string) {
      id = newId
    },
    getTemplatesBySpec() {
      return createTemplatesBySpec(urls)
    },
    getUrls() {
      return [...urls]
    },
    getEnvs() {
      return [...envs]
    },
    getId() {
      return id
    },
    getEnv(id: string) {
      return envs.find(envItem => envItem.id === id)
    },
  }
}

export const createPathFinder: PathfinderBuilder = ({
  resolver,
  data,
  dataKey,
}) => {
  const storage = getStorage(getStorageAdapter(data, dataKey))

  const getGlobalEnv: GlobalEnvGetter = () => storage.getGlobalEnv()
  const getUrlEnv: UrlEnvGetter = (urlId, specId) =>
    storage.getEndpointEnv(urlId, specId)

  const getSpecs: SpecsGetter = () => storage.getSpecs()

  const buildUrl = makeBuildUrl({
    specGetter: findSpec,
    urlEnvGetter: getUrlEnv,
    createUrl,
    parseUrl,
    specs: getSpecs(),
  })

  const setGlobalEnv: GlobalEnvSetter = (envId, specId) => {
    storage.setGlobalEnv(envId, specId)
  }

  const setUrlEnv: UrlEnvSetter = (urlId, specId, envId) => {
    storage.setEndpointEnv(urlId, specId, envId)
  }

  const setSpecs: SpecsLibSetter = (obj: unknown[]) => {
    try {
      const specs = []
      const storageSpec: Spec[] = []
      obj.forEach(element => {
        const spec = createSpec()
        const resolveSpec = resolver.parse(element)
        const { envs, urls, id } = resolveSpec
        specs.push(resolveSpec)
        spec.setEnvs(envs)
        spec.setUrls(urls)
        spec.setId(id)
        storageSpec.push(resolveSpec)
      })
      storage.setSpecs(storageSpec)
    } catch (e) {
      console.log(e)
    }
  }

  const getSpecById: SpecGetter = (id: string) =>
    storage.getSpecs()?.find(spec => spec.id === id) || null

  const reset: ResetHandler = () => {
    storage.resetEndpointsEnv()
    storage.resetGlobalEnv()
    storage.resetGlobalHeaders()
    storage.resetEndpointsHeaders()
  }

  const { setGlobalHeaders } = storage
  const { getGlobalHeaders } = storage
  const { setEndpointHeaders } = storage
  const { getEndpointHeaders } = storage

  return {
    findSpec,
    getSpecs,
    setSpecs,
    getSpecById,
    buildUrl,
    setGlobalEnv,
    getGlobalEnv,
    setUrlEnv,
    getUrlEnv,
    reset,
    getEndpointHeaders,
    getGlobalHeaders,
    setEndpointHeaders,
    setGlobalHeaders,
  }
}
