import type { StorageAdapter } from './types'

import { adapterVoid } from './adapter-void'
import { storageAdapter } from './storage-adapter'

function supports() {
  try {
    return typeof localStorage !== 'undefined'
  } catch (error) {
    // accessing `localStorage` could throw an exception only in one case -
    // when `localStorage` IS supported, but blocked by security policies
    return true
  }
}

export interface LocalStorageConfig {
  sync?: boolean | 'force'
  serialize?: (value: any) => string
  deserialize?: (value: string) => any
  timeout?: number
  def?: any
}

adapterLocalStorage.factory = true as const
export function adapterLocalStorage(
  config?: LocalStorageConfig,
): StorageAdapter {
  return supports()
    ? storageAdapter({
        storage: () => localStorage,
        sync: true,
        ...config,
      })
    : adapterVoid({ keyArea: 'local' })
}
