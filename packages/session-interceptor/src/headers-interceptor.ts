import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { THeader } from './types'

type THeadersGetterArg = {
  instance: AxiosInstance
  config: InternalAxiosRequestConfig
}

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

    return instances.map(instance =>
      instance.interceptors.request.use(getOnRequest(instance)),
    )
  }

  return getInterceptor
}
