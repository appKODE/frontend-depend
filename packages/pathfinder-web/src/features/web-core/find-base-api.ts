import { Spec } from '../../types'

export const findBaseApi = (specs: Spec[], requestOrigin: string) => {
  let baseApi = requestOrigin
  specs.forEach(spec => {
    const possibleBaseApi = spec.envs.find(env =>
      env.baseUrl?.includes(requestOrigin),
    )
    baseApi = possibleBaseApi ? possibleBaseApi.baseUrl || baseApi : baseApi
  })
  return baseApi
}
