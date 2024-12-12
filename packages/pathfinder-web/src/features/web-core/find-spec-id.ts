import { Spec } from '../../types'

export const findSpecIdByOrigin = (specs: Spec[], requestOrigin: string) => {
  let specId = ''

  specs.forEach(spec => {
    const isEnv = spec.envs.find(env => env.baseUrl?.includes(requestOrigin))
    specId = isEnv ? spec.id : specId
  })
  return specId
}
