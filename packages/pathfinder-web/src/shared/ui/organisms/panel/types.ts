import { TUrlHeaders, TUrlItem } from '../endpoints-list/types'

export type TPanelEnv = {
  id: string
  name: string
}

export type TPanelUrl = TUrlItem

export type TConfig = {
  envList: TPanelEnv[]
  urlList: TPanelUrl[]
}

export type TConfigs = {
  specId: string
  config: TConfig
}

export type THeaders = {
  specId: string
  headers: TUrlHeaders | {}
}
