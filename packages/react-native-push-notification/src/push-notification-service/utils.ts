import notifee, {
  AndroidBigPictureStyle,
  AndroidStyle,
  AuthorizationStatus,
  IOSNotificationAttachment,
  InitialNotification,
  TriggerNotification,
} from '@notifee/react-native'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { Image, Linking, Platform } from 'react-native'

import { TFirebaseRemoteMessage, TPushNotificationBody } from './types'
import { isPermisionsGrantedByDefault } from '../model/constanst'

let initialRemotePushWasGetting = false
let initialLocalPushWasGetting = false

const isPermitted = (authorizationStatus: AuthorizationStatus) => {
  return (
    authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
  )
}

/**
 * Checks for permissions to send notifications
 */
export async function hasPermission() {
  const status = await notifee.getNotificationSettings()

  return isPermitted(status.authorizationStatus)
}

/**
 * Request permissions to receive push notifications
 */
export async function requestPermission() {
  const status = await notifee.requestPermission()

  return isPermitted(status.authorizationStatus)
}

/**
 * Checks and request permissions to receive push notifications
 */
export async function checkPermission() {
  const enabledNotifications = await hasPermission()

  if (!enabledNotifications && !isPermisionsGrantedByDefault) {
    return await requestPermission()
  }
  return enabledNotifications
}

/**
 * Generating message id
 */
const createUUIDService = () => {
  let id = 0

  return {
    getUuid: () => {
      return String(++id)
    },
  }
}
const UUIDService = createUUIDService()

/**
 * Receives scheduled local push notifications
 */
export function getScheduledLocalNotifications(): Promise<
  TriggerNotification[]
> {
  return new Promise((resolve, reject) => {
    try {
      const notifications = notifee.getTriggerNotifications()
      resolve(notifications)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Cancels all local pushes
 */
export function cancelAllNotifications(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const notifications = await getScheduledLocalNotifications()
      const notificationIds = notifications.map(
        item => item.notification.id ?? '',
      )
      resolve(notifee.cancelAllNotifications(notificationIds))
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Cancels local push by id
 */
export function cancelNotification(notificationId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      resolve(notifee.cancelNotification(notificationId))
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Gets the initial remote push (from Firebase)
 */
export function getInitialPush(): Promise<FirebaseMessagingTypes.RemoteMessage | null> {
  return new Promise((resolve, reject) => {
    try {
      if (initialRemotePushWasGetting) {
        return resolve(null)
      }
      const initialPush = messaging().getInitialNotification()
      resolve(initialPush)
      initialRemotePushWasGetting = true
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Gets the initial local push
 */
export function getInitialLocalPush(): Promise<InitialNotification | null> {
  return new Promise((resolve, reject) => {
    try {
      if (initialLocalPushWasGetting) {
        return resolve(null)
      }
      const initialPush = notifee.getInitialNotification()
      resolve(initialPush)
      initialLocalPushWasGetting = true
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Gets the Firebase FCM-token for push notifications
 */
export const getToken = async () => {
  try {
    const enabledNotifications = await checkPermission()

    if (!enabledNotifications) {
      return null
    }
  } catch (e) {
    return null
  }
  let fcmToken = null
  try {
    fcmToken = await messaging().getToken()
    return fcmToken
  } catch (e) {}
  return fcmToken
}

/**
 * Removes the FCM-token in Firebase. The device will not be able to receive push notifications
 */
export const removeToken = async () => {
  await messaging().deleteToken()
}

/**
 * Go to notification settings
 */
export const openSettings = Platform.select({
  ios: Linking.openSettings,
  android: notifee.openNotificationSettings,
})!

/**
 * Set the number on the badge (iOS)
 */
export const setApplicationIconBadgeNumber = (number: number) => {
  try {
    notifee.setBadgeCount(number)
  } catch (e) {}
}

/**
 * Increases the number on the badge (iOS)
 */
export const incrementApplicationIconBadgeNumber = () => {
  try {
    notifee.incrementBadgeCount()
  } catch (e) {}
}

/**
 * Decreases the number on the badge (iOS)
 */
export const decrementApplicationIconBadgeNumber = () => {
  try {
    notifee.decrementBadgeCount()
  } catch (e) {}
}

/**
 * Retrieves attachment on iOS from remoteMessage
 */
export const getIosAttachment = async (message: TFirebaseRemoteMessage) => {
  if (message.data?.fcm_options?.image) {
    try {
      /**
       * Let's make sure the attachment is available on iOS
       */
      await Image.prefetch(message.data.fcm_options.image)
    } catch (e) {
      delete message.data.fcm_options.image
    }
  }

  const attachment: IOSNotificationAttachment[] = message.data?.fcm_options
    ?.image
    ? [
        {
          url: message.data.fcm_options.image,
        },
      ]
    : []

  return attachment
}

/**
 * Retrieves attachment on Android from remoteMessage
 */
export const getAndroidAttachment = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  if (message.notification?.android?.imageUrl) {
    try {
      /**
       *  Let's make sure the attachment is available on Android
       */
      await Image.prefetch(message.notification.android.imageUrl)
    } catch (e) {
      delete message.notification.android.imageUrl
    }
  }

  const attachment: AndroidBigPictureStyle | undefined = message.notification
    ?.android?.imageUrl
    ? {
        type: AndroidStyle.BIGPICTURE,
        picture: message.notification.android.imageUrl,
      }
    : undefined

  return attachment
}

export const mapRemotePushToLocalPush = (
  remotePush: FirebaseMessagingTypes.RemoteMessage,
) => {
  const pushNotification: TPushNotificationBody = {
    id: UUIDService.getUuid(),
    title: remotePush.notification?.title ?? '',
    body: remotePush.notification?.body ?? '',
    data: remotePush.data,
  }
  return pushNotification
}
