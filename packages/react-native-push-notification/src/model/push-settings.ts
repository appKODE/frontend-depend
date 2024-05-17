import { createEvent, createStore } from 'effector'
import { persist } from 'effector-storage/rn/async'

import { TPushSettings } from './types'
import { isPermisionsGrantedByDefault } from './constanst'

const initialState: TPushSettings = {
  fcmToken: null,
  isNotificationEnabled: isPermisionsGrantedByDefault,
  needFirstRequestPermission: true,
}

export const $pushSettings = createStore<TPushSettings>(initialState)

export const updateFcmToken = createEvent<string | null>()
export const enablePush = createEvent()
export const disablePush = createEvent()
export const skipRequestPermissions = createEvent()
export const resetPushSettings = createEvent()

$pushSettings
  .on(updateFcmToken, (state, fcmToken) => ({
    ...state,
    fcmToken,
  }))
  .on(enablePush, state => ({
    ...state,
    isNotificationEnabled: true,
    needFirstRequestPermission: false,
  }))
  .on(disablePush, state => ({ ...state, isNotificationEnabled: false }))
  .on(skipRequestPermissions, state => ({
    ...state,
    isNotificationEnabled: false,
    needFirstRequestPermission: false,
  }))
  .on(resetPushSettings, state => ({
    ...initialState,
    needFirstRequestPermission: state.needFirstRequestPermission,
    isNotificationEnabled: state.isNotificationEnabled,
  }))

persist({
  store: $pushSettings,
  key: 'pushSettings',
})

export const $pushEnabled = $pushSettings.map(settings =>
  Boolean(settings.isNotificationEnabled && settings.fcmToken),
)

export const $fcmToken = $pushSettings.map(settings => settings.fcmToken)

export const $needFirstRequestPermission = $pushSettings.map(
  settings => settings.needFirstRequestPermission,
)
