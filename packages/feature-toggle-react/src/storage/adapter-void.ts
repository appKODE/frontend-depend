import type { StorageAdapter } from './types'

export interface AdapterVoidConfig {
  keyArea?: any
}

/**
 * Void adapter. Does nothing. Useful for testing.
 */
export function adapterVoid({
  keyArea = '',
}: AdapterVoidConfig = {}): StorageAdapter {
  const adapter: StorageAdapter = () =>
    <any>{
      get() {},
      set() {},
    }

  adapter.keyArea = keyArea
  adapter.noop = true
  return adapter
}
adapterVoid.factory = true as const
