import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

import { BusinessError, ErrorData, Tokens } from './types'
import { Subscribers } from './utils/subscribers'
import { TStorage } from './utils/types'

type SessionInterceptorArg<T, K extends BusinessError = BusinessError> = {
  invalidAccessTokenErrors: ErrorData[]
  invalidRefreshTokenErrors: ErrorData[]
  storage: TStorage
  tokensGetter: () => Promise<T>
  onGotNewTokens?: (tokens: T) => void
  onInvalidRefreshResponse: () => void
  onRefreshError?: () => void
  onUnhandledError?: (e: AxiosError<K>) => void
  /** If specified then `invalidAccessTokenErrors` will be ignored */
  checkAccessTokenInvalid?: (response: AxiosResponse<any, any>) => boolean
  /** If specified then `invalidRefreshTokenErrors` will be ignored */
  checkRefreshTokenInvalid?: (response: AxiosResponse<any, any>) => boolean
}

export const startSessionInterceptor = <
  T extends Tokens,
  K extends BusinessError = BusinessError,
>({
  invalidAccessTokenErrors,
  invalidRefreshTokenErrors,
  storage,
  tokensGetter,
  onGotNewTokens,
  onInvalidRefreshResponse,
  onRefreshError,
  onUnhandledError,
  checkRefreshTokenInvalid,
  checkAccessTokenInvalid,
}: SessionInterceptorArg<T, K>) => {
  const subscribers = new Subscribers(storage)

  subscribers.startInvokes()

  const getInterceptor = (instances: AxiosInstance[]) => {
    const onSuccess = (request: AxiosResponse) => {
      return request
    }

    const getOnFailure =
      (instance: AxiosInstance) => async (error?: AxiosError<K>) => {
        const response = error?.response

        if (!response) {
          return Promise.reject(error)
        }

        let isNeedToRefreshTokens = false
        if (typeof checkAccessTokenInvalid === 'function') {
          isNeedToRefreshTokens = checkAccessTokenInvalid(response)
        } else {
          isNeedToRefreshTokens = Boolean(
            invalidAccessTokenErrors.find(
              err =>
                err.status === response.status &&
                err.code === response.data.code,
            ),
          )
        }

        let isRefreshTokenInvalid = false

        if (typeof checkRefreshTokenInvalid === 'function') {
          isRefreshTokenInvalid = checkRefreshTokenInvalid(response)
        } else {
          isRefreshTokenInvalid = Boolean(
            invalidRefreshTokenErrors.find(
              err =>
                err.status === response.status &&
                err.code === response.data.code,
            ),
          )
        }

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

        if (subscribers.getAllowToRefetch()) {
          subscribers.setAllowToRefetch(false)

          try {
            const tokensResponse = await tokensGetter()

            if (tokensResponse?.accessToken) {
              if (onGotNewTokens) {
                onGotNewTokens(tokensResponse)
              }
            }
          } catch {
            onRefreshError?.()
            return
          } finally {
            subscribers.setAllowToRefetch(true)
          }
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

    const ejectors = instances.map(instance => {
      const interceptor = instance.interceptors.response.use(
        onSuccess,
        getOnFailure(instance),
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
