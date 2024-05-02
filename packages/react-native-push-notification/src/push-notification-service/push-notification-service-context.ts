import React from 'react'

import { TPushNotificationBody } from './types'

export type PushEvents = {
  onOpen: (notification: TPushNotificationBody) => Promise<boolean>
  onReceive: (notification: TPushNotificationBody) => Promise<boolean>
}

export type TPushNotificationServiceContext = {
  subscribe: (uuid: string, mounted: boolean, options: PushEvents) => void
  unsubscribe: (uuid: string) => void
}

export const PushNotificationServiceContext =
  React.createContext<TPushNotificationServiceContext>({
    subscribe: () => null,
    unsubscribe: () => null,
  })
