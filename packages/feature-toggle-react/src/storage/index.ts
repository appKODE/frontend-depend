/**
 * Generic storage adapter.
 */
export { storageAdapter } from './storage-adapter'
export type { StorageAdapter, StorageConfig } from './types'

/**
 * LocalStorage adapter.
 */
export { adapterLocalStorage } from './adapter-local-storage'
export type { LocalStorageConfig } from './adapter-local-storage'

/**
 * Void adapter.
 */
export { adapterVoid } from './adapter-void'
export type { AdapterVoidConfig } from './adapter-void'
