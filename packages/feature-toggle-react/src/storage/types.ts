export interface Adapter<State> {
  get(raw?: any, ctx?: any): State | Promise<State | undefined> | undefined
  set(value: State, ctx?: any): void
}

export interface DisposableAdapter<State> extends Adapter<State> {
  (): void
}

export interface StorageAdapter {
  <State>(
    key: string,
    update: (raw?: any) => void,
  ): Adapter<State> | DisposableAdapter<State>

  /** The key area for the storage adapter. */
  keyArea?: any

  /** A flag to indicate if the adapter is a no-operation adapter. */
  noop?: boolean
}

export interface StorageConfig {
  /**
   * Function that returns the Storage object (e.g., localStorage or sessionStorage).
   * @returns {Storage} The Storage object.
   */
  storage: () => Storage

  /**
   * Whether to synchronize the storage across different tabs.
   * If set to 'force', always calls the update function when the storage changes.
   * @default false
   */
  sync?: boolean | 'force'

  /**
   * Function to serialize the value before storing it.
   * @default JSON.stringify
   */
  serialize?: (value: any) => string

  /**
   * Function to deserialize the value after retrieving it from storage.
   * @default JSON.parse
   */
  deserialize?: (value: string) => any

  /**
   * Timeout in milliseconds before automatically flushing changes to storage.
   * If undefined, changes are flushed immediately.
   */
  timeout?: number

  /**
   * Default value to return if the key is not found in storage.
   */
  def?: any
}
