import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import React, { ReactNode, useMemo } from 'react'
import { Platform } from 'react-native'

import {
  PushEvents,
  PushNotificationServiceContext,
  TPushNotificationServiceContext,
} from './push-notification-service-context'
import { TFirebaseRemoteMessage, TPushNotificationBody } from './types'
import {
  getAndroidAttachment,
  getInitialLocalPush,
  getInitialPush,
  getIosAttachment,
  mapRemotePushToLocalPush,
} from './utils'

const isAndroid = Platform.OS === 'android'

type TPushNotificationServiceProps = {
  children: ReactNode
  // for android
  channelId: string
  channelName: string
  smallIcon?: string
}

export const PushNotificationService = ({
  channelId,
  channelName,
  children,
}: TPushNotificationServiceProps) => {
  const subscriptions = React.useRef<Record<string, PushEvents>>({})

  const lastOpened = React.useRef<TPushNotificationBody | null>(null)
  const lastReceived = React.useRef<TPushNotificationBody | null>(null)

  const onOpenNotification = async (
    pushNotification: TPushNotificationBody,
  ) => {
    lastOpened.current = pushNotification

    const onOpenResults = Object.values(subscriptions.current).map(e =>
      e.onOpen(pushNotification),
    )
    if ((await Promise.all(onOpenResults)).filter(Boolean).length) {
      lastOpened.current = null
    }
  }

  const onReceiveNotification = async (
    pushNotification: TPushNotificationBody,
  ) => {
    lastReceived.current = pushNotification

    const onReceiveResults = Object.values(subscriptions.current).map(e =>
      e.onReceive(pushNotification),
    )
    if ((await Promise.all(onReceiveResults)).filter(Boolean).length) {
      lastReceived.current = null
    }
  }

  // Local push:
  // - IOS:
  //   - foreground state: onForegroundEvent
  //   - background state: onForegroundEvent
  //   - quit state: onForegroundEvent (getInitialLocalPush too, but not used so as not to process 2 times)
  // - Android:
  //   - foreground state: onForegroundEvent
  //   - background state: onBackgroundEvent
  //   - quit state: getInitialLocalPush
  //
  // Remote push from Firebase:
  // - IOS:
  //   - foreground state: onForegroundEvent
  //   - background state: onForegroundEvent
  //   - quit state: onForegroundEvent (getInitialPush too, but not used so as not to process 2 times)
  // - Android:
  //   - foreground state: onForegroundEvent
  //   - background state: onNotificationOpenedApp
  //   - quit state: getInitialPush

  React.useEffect(() => {
    const init = async () => {
      // Let's check whether the application was opened by clicking on the push notification.
      const initialPush = await getInitialPush()
      if (initialPush && isAndroid) {
        const pushNotification = mapRemotePushToLocalPush(initialPush)
        onOpenNotification(pushNotification)
      }

      const initialLocalPush = await getInitialLocalPush()
      if (initialLocalPush && isAndroid) {
        onOpenNotification(initialLocalPush.notification)
      }

      const onNotificationOpenedAppUnsubscribe =
        messaging().onNotificationOpenedApp(remoteMessage => {
          if (remoteMessage && isAndroid) {
            const pushNotification = mapRemotePushToLocalPush(remoteMessage)
            onOpenNotification(pushNotification)
          }
        })

      const onForegroundEventUnsubscribe = notifee.onForegroundEvent(
        async ({ type, detail }) => {
          if (!detail.notification) {
            return
          }

          const pushNotification: TPushNotificationBody = detail.notification

          switch (type) {
            case EventType.DELIVERED:
              onReceiveNotification(pushNotification)
              break
            case EventType.PRESS:
              onOpenNotification(pushNotification)
              break
          }
        },
      )

      notifee.onBackgroundEvent(async ({ type, detail }) => {
        if (!detail.notification) {
          return
        }
        const pushNotification: TPushNotificationBody = detail.notification

        switch (type) {
          case EventType.DELIVERED:
            onReceiveNotification(pushNotification)
            break
          case EventType.PRESS:
            onOpenNotification(pushNotification)
            break
        }
      })

      await notifee.createChannel({
        id: channelId,
        name: channelName,
        sound: 'default',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
      })

      /**
       * Foreground (remote) pushes are not displayed natively,
       * so the push will be received by firebase, and we will display it locally
       */
      const onMessageReceived = async (
        remoteMessage: TFirebaseRemoteMessage,
      ) => {
        if (!remoteMessage.notification) {
          return
        }

        const pushNotification = mapRemotePushToLocalPush(remoteMessage)
        const iosAttachment = await getIosAttachment(remoteMessage)
        const androidAttachment = await getAndroidAttachment(remoteMessage)
        const iosBadgeCount = Number(remoteMessage.notification.ios?.badge ?? 0)

        notifee.displayNotification({
          ...pushNotification,
          ios: {
            attachments: iosAttachment,
            badgeCount: iosBadgeCount,
          },
          android: {
            channelId,
            importance: AndroidImportance.HIGH,
            smallIcon: 'ic_small_icon',
            ...(androidAttachment
              ? {
                  largeIcon: androidAttachment.picture,
                  style: androidAttachment,
                }
              : {
                  style: {
                    type: AndroidStyle.BIGTEXT,
                    text: pushNotification.body ?? '',
                  },
                }),
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
              id: 'default',
            },
          },
        })
      }

      const onMessageReceivedUnsubscribe =
        messaging().onMessage(onMessageReceived)

      const unsubscribe = () => {
        onNotificationOpenedAppUnsubscribe()
        onForegroundEventUnsubscribe()
        onMessageReceivedUnsubscribe()
      }

      return unsubscribe
    }

    const unsubscribe = init()

    return () => {
      unsubscribe.then(result => result())
    }
  }, [channelId, channelName])

  const value: TPushNotificationServiceContext = useMemo(
    () => ({
      subscribe: async (uuid, mounted, events) => {
        subscriptions.current[uuid] = events

        if (
          lastOpened.current &&
          mounted &&
          !lastReceived.current &&
          (await events.onOpen(lastOpened.current))
        ) {
          lastOpened.current = null
        }

        if (
          lastReceived.current &&
          mounted &&
          (await events.onReceive(lastReceived.current))
        ) {
          lastReceived.current = null
        }
      },
      unsubscribe: uuid => {
        delete subscriptions.current[uuid]
      },
    }),
    [],
  )

  return (
    <PushNotificationServiceContext.Provider value={value}>
      {children}
    </PushNotificationServiceContext.Provider>
  )
}
