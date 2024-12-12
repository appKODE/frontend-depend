import { StorageAdapterFn } from '../../types'

export const getStorageAdapter: StorageAdapterFn = (data, storageKey) => ({
  getItem: (key: string) => data.getItem(key, storageKey),
  setItem: (key: string, value: string) => data.setItem(key, value, storageKey),
})
