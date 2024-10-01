import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

export type Tokens = Record<string, string>

export type ErrorData = {
  code: string
  status: number
}

export type BusinessError = {
  code: string
  message: string
}

export type THeader = {
  key: string
  value: string
}

export type THeadersGetterArg = {
  instance: AxiosInstance
  config: InternalAxiosRequestConfig
}
