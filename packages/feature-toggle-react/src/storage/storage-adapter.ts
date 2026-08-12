import type { StorageAdapter, StorageConfig } from './types'

/**
 * Creates a generic Storage adapter.
 *
 * @param {StorageConfig} config - Configuration object for the storage adapter.
 * @param {() => Storage} config.storage - Function that returns the Storage object (e.g., localStorage or sessionStorage).
 * @param {boolean | 'force'} [config.sync=false] - Whether to synchronize the storage across different tabs. If set to 'force', always calls the update function when the storage changes.
 * @param {(value: any) => string} [config.serialize=JSON.stringify] - Function to serialize the value before storing it.
 * @param {(value: string) => any} [config.deserialize=JSON.parse] - Function to deserialize the value after retrieving it from storage.
 * @param {number} [config.timeout] - Timeout in milliseconds before automatically flushing changes to storage. If undefined, changes are flushed immediately.
 * @param {any} [config.def] - Default value to return if the key is not found in storage.
 *
 * @returns {StorageAdapter} The storage adapter.
 *
 * @example
 * const adapter = storageAdapter({
 *   storage: () => localStorage,
 *   sync: true,
 *   timeout: 500,
 * });
 *
 * const store = adapter('myKey', (newValue) => {
 *   console.log('Updated value:', newValue);
 * });
 *
 * store.set('newValue');
 * console.log(store.get()); // Outputs: 'newValue'
 */
export function storageAdapter({
  storage,
  sync = false,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  timeout,
  def,
}: StorageConfig): StorageAdapter {
  const adapter: StorageAdapter = <State>(
    key: string,
    update: (raw?: any) => void,
  ) => {
    let scheduled: ReturnType<typeof setTimeout> | undefined
    let unsaved: State
    let storageInstance: Storage = storage()
    let beforeunloadListenerAdded = false

    const flush = () => storageInstance.setItem(key, serialize(unsaved))

    const postponedFlush = (e?: BeforeUnloadEvent | 1) => {
      scheduled = clearTimeout(scheduled) as undefined
      if (e) flush()
      if (beforeunloadListenerAdded) {
        window.removeEventListener('beforeunload', postponedFlush)
        beforeunloadListenerAdded = false
      }
    }

    const scheduleFlush = () => {
      scheduled = setTimeout(postponedFlush, timeout, 1)
      if (!beforeunloadListenerAdded) {
        window.addEventListener('beforeunload', postponedFlush)
        beforeunloadListenerAdded = true
      }
    }

    let syncListener: ((e: StorageEvent) => void) | undefined
    if (sync) {
      syncListener = e => {
        if (e.storageArea === storageInstance && e.key === key) {
          update(sync === 'force' ? undefined : e.newValue)
        } else if (e.key === null) {
          update(null)
        }
      }
      window.addEventListener('storage', syncListener)
    }

    const dispose = () => {
      if (scheduled) postponedFlush(1)
      if (syncListener) window.removeEventListener('storage', syncListener)
    }

    return Object.assign(dispose, {
      get(raw?: string | null) {
        postponedFlush()
        const item = raw ?? storageInstance.getItem(key)
        return item === null ? def ?? raw : deserialize(item)
      },
      set(value: State) {
        unsaved = value
        if (timeout === undefined) {
          flush()
        } else if (!scheduled) {
          scheduleFlush()
        }
      },
    })
  }

  try {
    adapter.keyArea = storage()
  } catch (error) {
    // Do nothing
  }

  return adapter
}
storageAdapter.factory = true as const
