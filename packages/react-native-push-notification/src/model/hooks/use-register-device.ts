import { useStore } from 'effector-react'
import { useCallback, useEffect } from 'react'
import { AppState, AppStateStatus, Platform } from 'react-native'

import { pushService } from '../../push-notification-service'
import { $pushSettings, updateFcmToken } from '../push-settings'

type TUseRegisterDeviceParams = {
  isNotificationsAvailable: boolean
  updatePushToken: (
    token: string,
    config: {
      onSuccess: () => void
    },
  ) => void
}

type TRegisterParams = {
  force?: boolean
}

export const useRegisterDevice = ({
  isNotificationsAvailable,
  updatePushToken,
}: TUseRegisterDeviceParams) => {
  const { fcmToken, isNotificationEnabled } = useStore($pushSettings)

  const register = useCallback(
    async ({ force }: TRegisterParams = {}) => {
      if (!isNotificationsAvailable || !isNotificationEnabled) {
        return
      }

      try {
        const token = await pushService.getToken()

        if (!token) {
          return
        }

        if (fcmToken !== token || force) {
          updatePushToken(token, {
            onSuccess: () => {
              updateFcmToken(token)
            },
          })
        }
      } catch (e) {}
    },
    [
      isNotificationsAvailable,
      isNotificationEnabled,
      fcmToken,
      updatePushToken,
    ],
  )

  useEffect(() => {
    register()

    const focusEvent = Platform.OS === 'android' ? 'focus' : 'change';

    const onChangeAppState = () => {
      if (AppState.currentState === 'active') {
        register();
      }
    };

    const subscription = AppState.addEventListener(
      focusEvent,
      onChangeAppState,
    );
    return () => {
      subscription.remove()
    }
  }, [register])

  return {
    registerDevice: register,
  }
}
