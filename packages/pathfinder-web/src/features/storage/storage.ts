import { DataStorage } from '../../types'
import { getItem, setItem } from './local-storage'

export const storage: DataStorage = {
  getItem,
  setItem,
}
