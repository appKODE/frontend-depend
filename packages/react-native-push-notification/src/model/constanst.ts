import { Platform } from 'react-native'

export const isPermisionsGrantedByDefault =
  Platform.OS === 'android' && Platform.Version < 33
