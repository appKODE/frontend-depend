import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'

export type TPushNotificationBody<T = Record<string, any>> = {
  id?: string
  title?: string
  body?: string
  data?: T
}

export type TFirebaseRemoteMessage = FirebaseMessagingTypes.RemoteMessage &
  Partial<TPushNotificationBody>
