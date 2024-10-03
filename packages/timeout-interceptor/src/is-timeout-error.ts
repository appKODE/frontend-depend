import { TIMEOUT_FLAG } from './constants'

export const isTimeoutError = (error: any): boolean => {
  // custom timeout
  if (error?.config && error.config[TIMEOUT_FLAG]) {
    return true
  }

  // native timeout (works only iOS)
  return error && !error.response && error.code === 'ETIMEDOUT'
}
