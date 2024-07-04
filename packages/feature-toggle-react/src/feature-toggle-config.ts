import { FlagsStorage } from './flags-storage'
import { FeatureFlags, Storage } from './types'

interface Options<S> {
  storage: S
  storageKey: string
  defaultFlags: FeatureFlags
  fetcher?: () => Promise<Record<string, boolean>>
}

export class FeatureToggleConfig<S extends Storage = Storage> {
  public storage: FlagsStorage
  public defaultFlags: FeatureFlags
  public fetcher?: () => Promise<Record<string, boolean>>

  constructor({ storage, storageKey, defaultFlags, fetcher }: Options<S>) {
    this.defaultFlags = defaultFlags
    this.fetcher = fetcher
    this.storage = new FlagsStorage({
      defaultFlags,
      storage,
      storageKey,
    })
  }
}
