export type FeatureFlags = Record<string, boolean>

export type FeatureToggleContext = {
  flags: FeatureFlags
  isFetching?: boolean
  hasFeatureFlag: (flagName: keyof FeatureFlags) => boolean
}

type FetcherParameters = {
  setter: (flags: FeatureFlags) => void
}

export type FeatureToggleProviderOptions = {
  storageKey: string
  defaultFlags: FeatureFlags
  fetcher?: (parameters: FetcherParameters) => Promise<FeatureFlags>
}

export interface Storage {
  setItem: (key: string, value: string) => void | Promise<void>
  getItem: (key: string) => string | null | Promise<string | null>
}

export type FlagsNameProp = { name: keyof FeatureFlags }
