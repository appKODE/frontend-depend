import { InternalAxiosRequestConfig as AxiosRequestConfigBase } from 'axios'
import { CANCEL_TIMER, TIMEOUT_FLAG } from './constants'

declare module 'axios' {
  interface InternalAxiosRequestConfig<D = any>
    extends AxiosRequestConfigBase<D> {
    [TIMEOUT_FLAG]?: boolean
    [CANCEL_TIMER]?: NodeJS.Timeout
  }
}
