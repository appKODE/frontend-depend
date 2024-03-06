export type TStorageGetter = (key: string) => string | null
export type TStorageSetter = (key: string, value: string) => void

export type TStorage = {
  storageGetter: TStorageGetter
  storageSetter: TStorageSetter
}
