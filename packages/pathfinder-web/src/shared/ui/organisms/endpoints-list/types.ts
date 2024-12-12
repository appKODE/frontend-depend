import { UrlMethod } from '../../../../types'

export type TUrlItem = {
  id: string
  method: UrlMethod
  template: string
  name: string
  responses: any
}

export type TBasePathChangeHandler = (urlId: string, envId?: string) => void

export type THeadersChangeHandler = (
  headers: string,
  endpointId: string,
  specId: string,
) => void

type TUrlId = string

export type TUrlHeaders = Record<TUrlId, string>
