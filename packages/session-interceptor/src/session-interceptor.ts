import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

import { BusinessError, ErrorData, Tokens } from './types'
import { Subscribers } from './utils/subscribers'

type SessionInterceptorArg = {
  invalidAccessTokenErrors: ErrorData[]
  invalidRefreshTokenErrors: ErrorData[]
  tokensGetter: () => Promise<Tokens>
  onGotNewTokens?: (tokens: Tokens) => void
  onInvalidRefreshResponse: () => void
  onUnhandledError?: (e: AxiosError) => void
}

export const startSessionInterceptor = ({
  invalidAccessTokenErrors,
  invalidRefreshTokenErrors,
  tokensGetter,
  onGotNewTokens,
  onInvalidRefreshResponse,
  onUnhandledError,
}: SessionInterceptorArg) => {
  const subscribers = new Subscribers()

  subscribers.startInvokes()

  const getInterceptor = (instance: AxiosInstance) => {
    const onSuccess = (request: AxiosResponse) => {
      return request
    }

    const onFailure = async (error?: AxiosError<BusinessError>) => {
      const response = error?.response

      if (!response) {
        return Promise.reject(error)
      }

      // TODO: Добавить проверку ошибок как опциональный колбэк в конфиге
      const isNeedToRefreshTokens = Boolean(
        invalidAccessTokenErrors.find(
          err =>
            err.status === response.status && err.code === response.data.code,
        ),
      )

      const isRefreshTokenInvalid = invalidRefreshTokenErrors.find(
        err =>
          err.status === response.status && err.code === response.data.code,
      )

      if (isRefreshTokenInvalid) {
        onInvalidRefreshResponse()
        return Promise.reject(error)
      }

      if (!isNeedToRefreshTokens) {
        if (onUnhandledError) {
          onUnhandledError(error)
        }

        return Promise.reject(error)
      }

      if (subscribers.isAllowToRefetch) {
        subscribers.setAllowToRefetch(false)

        const tokensResponse = await tokensGetter()

        if (tokensResponse?.accessToken) {
          if (onGotNewTokens) {
            onGotNewTokens(tokensResponse)
          }
        }

        subscribers.setAllowToRefetch(true)
      }

      return new Promise(resolve => {
        subscribers.subscribe(() => {
          if (!error.config) {
            return
          }

          resolve(instance(error.config))
        })
      })
    }

    return instance.interceptors.response.use(onSuccess, onFailure)
  }

  return getInterceptor
}
