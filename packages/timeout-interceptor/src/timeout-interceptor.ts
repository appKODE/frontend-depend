import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios'

import { CANCEL_TIMER, TIMEOUT_FLAG } from './constants'

export const startTimeoutInterceptor = (instance: AxiosInstance) => {
  const onRequest = (
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig => {
    const { timeout } = config

    if (!timeout) {
      return config
    }

    const controller = new AbortController()

    config.signal = controller.signal

    config[CANCEL_TIMER] = setTimeout(() => {
      controller.abort()

      config[TIMEOUT_FLAG] = true
    }, timeout)

    return config
  }

  const onSuccess = (response: AxiosResponse) => {
    if (response.config) {
      clearTimeout(response.config[CANCEL_TIMER])
    }
    return response
  }
  const onFailure = async (error: AxiosError) => {
    if (error.config) {
      clearTimeout(error.config[CANCEL_TIMER])
    }
    return Promise.reject(error)
  }

  const interceptorRequest = instance.interceptors.request.use(onRequest)
  const interceptorResponse = instance.interceptors.response.use(
    onSuccess,
    onFailure,
  )

  return () => {
    instance.interceptors.request.eject(interceptorRequest)
    instance.interceptors.response.eject(interceptorResponse)
  }
}
