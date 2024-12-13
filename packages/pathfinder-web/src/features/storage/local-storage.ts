import { DataStorageItemGetter, DataStorageItemSetter } from '../../types'

export const setItem: DataStorageItemSetter = (key, value, prefix) => {
  if (typeof localStorage === 'undefined') {
    return
  }
  if (value === undefined) {
    localStorage.removeItem(`${prefix}-${key}`)
    return
  }
  localStorage.setItem(`${prefix}-${key}`, value)
}

export const getItem: DataStorageItemGetter = (key, prefix) => {
  if (typeof localStorage === 'undefined') {
    return ''
  }
  return localStorage.getItem(`${prefix}-${key}`) || ''
}
