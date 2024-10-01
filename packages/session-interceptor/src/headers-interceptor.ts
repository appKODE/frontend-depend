import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { THeader, THeadersGetterArg } from './types'

type TStartHeadersInterceptorArg = {
  getHeaders: (arg: THeadersGetterArg) => THeader[]
}

export const startHeadersInterceptor = ({
  getHeaders,
}: TStartHeadersInterceptorArg) => {
  const getInterceptor = (instances: AxiosInstance[]) => {
    const getOnRequest =
      (instance: AxiosInstance) => (config: InternalAxiosRequestConfig) => {
        const headers = getHeaders({
          config,
          instance,
        })

        headers.forEach(header => (config.headers[header.key] = header.value))

        return config
      }

    const ejectors = instances.map(instance => {
      const interceptor = instance.interceptors.request.use(
        getOnRequest(instance),
      )

      return () => {
        instance.interceptors.response.eject(interceptor)
      }
    })
    const ejectAll = () => {
      ejectors.forEach(eject => {
        eject()
      })
    }

    return { ejectAll }
  }

  return getInterceptor
}
