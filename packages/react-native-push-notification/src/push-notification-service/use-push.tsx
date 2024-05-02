import React, { useCallback } from 'react'
import { v4 } from 'uuid'

import { PushNotificationServiceContext } from './push-notification-service-context'
import { TPushNotificationBody } from './types'

type TOptions = {
  /**
   * Condition under which the handler should be called
   */
  condition: (notification: TPushNotificationBody) => boolean
  /**
   * Event when a push is received while the application is running
   */
  onReceived: (notification: TPushNotificationBody) => void
  /**
   * Event when an application is opened by clicking on a push
   */
  onOpened: (notification: TPushNotificationBody) => void
}

export function usePush({ condition, onReceived, onOpened }: TOptions) {
  const mounted = React.useRef<boolean>(false)
  const { subscribe, unsubscribe } = React.useContext(
    PushNotificationServiceContext,
  )

  const uuid = React.useMemo(() => v4(), [])

  const onReceive = useCallback(
    async (notification: TPushNotificationBody) => {
      if (condition(notification)) {
        await onReceived(notification)
        return true
      }
      return false
    },
    [condition, onReceived],
  )

  const onOpen = useCallback(
    async (notification: TPushNotificationBody) => {
      if (condition(notification)) {
        await onOpened(notification)
        return true
      }
      return false
    },
    [condition, onOpened],
  )

  React.useEffect(() => {
    subscribe(uuid, !mounted.current, {
      onReceive,
      onOpen,
    })
    mounted.current = true
    return () => {
      unsubscribe(uuid)
    }
  }, [onReceive, onOpen, subscribe, unsubscribe, uuid])

  return null
}
