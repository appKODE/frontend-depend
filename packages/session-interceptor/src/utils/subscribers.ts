import { TStorage, TStorageGetter, TStorageSetter } from './types'

type TSubscriber = () => void

const STORAGE_KEY = 'SESSION_IS_ALLOW_TO_REFETCH'
export class Subscribers {
  constructor({ storageGetter, storageSetter }: TStorage) {
    this.storageGetter = storageGetter
    this.storageSetter = storageSetter

    this.setAllowToRefetch(true)
  }

  storageGetter: TStorageGetter = () => {
    return ''
  }
  storageSetter: TStorageSetter = () => null

  $subscribers: TSubscriber[] = []

  subscribe(callback: () => void) {
    this.$subscribers.push(callback)
  }

  #clear() {
    this.$subscribers = []
  }

  #invokeAll() {
    return this.$subscribers.forEach(cb => cb())
  }

  startInvokes() {
    setInterval(() => {
      if (this.getAllowToRefetch() && this.$subscribers.length > 0) {
        this.#invokeAll()
        this.#clear()
      }
    }, 1000)
  }

  getAllowToRefetch() {
    return this.storageGetter(STORAGE_KEY) === 'true' ? true : false
  }

  setAllowToRefetch(payload: boolean) {
    this.storageSetter(STORAGE_KEY, payload ? 'true' : 'false')
  }
}
