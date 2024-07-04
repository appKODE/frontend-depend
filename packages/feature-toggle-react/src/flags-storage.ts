import { FeatureFlags, Storage } from './types'

interface Options<S> {
  storage: S
  storageKey: string
  defaultFlags: FeatureFlags
}

export class FlagsStorage<S extends Storage = Storage> {
  private _setItem: S['setItem']
  private _getItem: S['getItem']
  private _storageKey: string
  private _defaultFlags: FeatureFlags

  constructor({
    storage: { getItem, setItem },
    storageKey,
    defaultFlags,
  }: Options<S>) {
    this._setItem = setItem
    this._getItem = getItem
    this._storageKey = storageKey
    this._defaultFlags = defaultFlags
  }

  public setFeatureFlags = async (flags: FeatureFlags) => {
    await this._setItem(this._storageKey, JSON.stringify(flags))
  }

  public getFeatureFlags = async (): Promise<FeatureFlags> => {
    const localStorageFlags = await this._getItem(this._storageKey)

    if (!localStorageFlags) {
      await this.setFeatureFlags(this._defaultFlags)
      return this._defaultFlags
    } else {
      try {
        return JSON.parse(localStorageFlags)
      } catch (error) {
        console.log(`Feature Toggle: ${error}`)
        return this._defaultFlags
      }
    }
  }

  public changeFeatureFlag = async (
    flagName: keyof FeatureFlags,
    flagValue: boolean,
  ) => {
    const currentFlags = await this.getFeatureFlags()

    const newFlags = { ...currentFlags, [flagName]: flagValue }
    await this.setFeatureFlags(newFlags)

    return newFlags
  }
}
