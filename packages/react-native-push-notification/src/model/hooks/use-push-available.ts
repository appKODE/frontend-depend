import { useEvent, useStore } from 'effector-react'
import { useCallback, useEffect, useState } from 'react'
import { AppState, AppStateStatus, Platform } from 'react-native'

import { useUnregisterDevice } from './use-unregister-device'
import { pushService } from '../../push-notification-service'
import * as pushSettings from '../push-settings'
import { isPermisionsGrantedByDefault } from '../constanst'

type TParams = {
  onFailEnabledPush: () => void
}

export const usePushAvailable = ({ onFailEnabledPush }: TParams) => {
  const [isLoading, setLoaderState] = useState(false)
  const enabledPush = useStore(pushSettings.$pushEnabled)
  const disablePush = useEvent(pushSettings.disablePush)
  const enablePush = useEvent(pushSettings.enablePush)
  const [hasPermissions, setHasPermissions] = useState(enabledPush)
  const [enabledPushNotifications, setEnabledPushNotifications] =
    useState(enabledPush)
  const { unregister } = useUnregisterDevice()

  useEffect(() => {
    setEnabledPushNotifications(hasPermissions && enabledPush)
  }, [hasPermissions, enabledPush])

  useEffect(() => {
    const checkPermissions = async () => {
      const hasPermission = await pushService.hasPermission()
      setHasPermissions(hasPermission)
    }

    checkPermissions()
    const callback = (state: AppStateStatus) => {
      if (state === 'active') {
        checkPermissions()
      }
    }
    const subscription = AppState.addEventListener('change', callback)
    return () => {
      subscription.remove()
    }
  }, [])

  const changeEnabledPushesHandler = useCallback(
    async (state: boolean) => {
      setLoaderState(true)

      async function checkPermission() {
        const hasPermission = await pushService.hasPermission()

        if (!hasPermission && !isPermisionsGrantedByDefault) {
          return await pushService.requestPermission()
        }
        return hasPermission
      }

      try {
        if (!state) {
          setEnabledPushNotifications(false)
          disablePush()
          unregister()
          pushService.cancelAllNotifications()
          return
        }

        const hasPermission = await checkPermission()
        if (hasPermission) {
          setEnabledPushNotifications(true)
        } else {
          onFailEnabledPush()
        }
        enablePush()
      } finally {
        setLoaderState(false)
      }
    },
    [onFailEnabledPush, enablePush, unregister, disablePush],
  )

  return {
    enabled: enabledPushNotifications,
    isLoading,
    changeNotificationEnabled: changeEnabledPushesHandler,
  }
}
