import { TUrlHeaders, TUrlItem } from '../endpoints-list/types'

export type TPanelEnv = {
  id: string
  name: string
  baseUrl?: string
}

export type TPanelUrl = TUrlItem

export type TConfig = {
  envList: TPanelEnv[]
  urlList: TPanelUrl[]
}

export type TConfigs = {
  specId: string
  config: TConfig
  specDocument?: object
}

export type THeaders = {
  specId: string
  headers: TUrlHeaders | {}
}
