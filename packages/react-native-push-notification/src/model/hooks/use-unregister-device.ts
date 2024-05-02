import { pushService } from '../../push-notification-service'
import { updateFcmToken } from '../push-settings'

const unregister = async () => {
  try {
    await pushService.removeToken()
    updateFcmToken(null)
  } catch {}
}

export const useUnregisterDevice = () => {
  return {
    unregister,
  }
}
