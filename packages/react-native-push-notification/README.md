# react-native-push-notification

[![Version][version-badge]][package]

## 📥 Install

Add `@kode-frontend/react-native-push-notification` dependency to your project.

```shell
# Using npm
npm i @kode-frontend/react-native-push-notification

# Using yarn
yarn add @kode-frontend/react-native-push-notification

# Using pnpm
pnpm add @kode-frontend/react-native-push-notification
```

## 🎮 Usage

### react-native-push-notification

- Add `<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>` notification permission in AndroidManifest
- Set up messaging in Firebase, add “APNs auth key”
- Wrap your App in PushNotificationService provider (e.g. in app-container.tsx)

```typescript
import { getApplicationName } from 'react-native-device-info';

// move into shared/config/static
const config = {
  pushNotifications: {
    channelId: 'appname-main',
    channelName: `Уведомления ${getApplicationName()}`,
  },
};

export const AppConnector = () => {

  return (
    <PushNotificationService
      channelId={config.pushNotifications.channelId}
      channelName={config.pushNotifications.channelName}>
      <App />
    </PushNotificationService>
  );
}
```

- Call useRegisterDevice on application startup to send the fcm-token to the backend (e.g. in protected-navigator-connector.tsx)

```typescript
export const ProtectedNavigatorConnector = () => {
  const { mutateAsync } = usePostNotificationsToken();

  const updatePushToken = useCallback(
    (token: string, { onSuccess }: { onSuccess: Void }) => {
      mutateAsync(token, {
        onSuccess,
      });
    },
    [mutateAsync],
  );

  useRegisterDevice({
    isNotificationsAvailable: true,
    updatePushToken,
  });

  return (
    <ProtectedNavigator />
  );
};
```

- Call useUnregisterDevice on logout to remove fcm-token
- Use usePushAvailable to turn notifications on/off (e.g. on settings page)

```typescript
const handleOpenSettings = () =>
  Alert.alert(
    'Allow notifications',
    'To receive notifications, go to settings and allow the application to send them',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Settings', onPress: pushService.openSettings },
    ],
  );

  export const NotificationsSettingsConnector = () => {
  const {
    enabled: pushEnabled,
    isLoading: isNotificationsLoading,
    changeNotificationEnabled,
  } = usePushAvailable({
    onFailEnabledPush: handleOpenSettings,
  });

  const onSwitchNotifications = useCallback(
    (value: boolean) => {
      changeNotificationEnabled(value);
      // POST value to backend
    },
    [changeNotificationEnabled],
  );

  return (
    <NotificationsSettings
      isNotificationsEnable={pushEnabled}
      onSwitchNotifications={onSwitchNotifications}
    />
  );
};
```

- Use usePush hook if you want to listen for receive and open events of push notifications. For this create NotificationPushHandler (e.g. in features/notifications/handrers) and add it in navigation (e.g. in protected-navigator.tsx)

```typescript
type TNotificationPushHandlerProps = {
  onOpenNotificationsScreen: () => void
}

const condition = () => {
  return true
}

export const NotificationPushHandler = ({
  onOpenNotificationsScreen,
}: TNotificationPushHandlerProps) => {
  const onOpened = useCallback(
    (push: TPushNotificationBody) => {
      onOpenNotificationsScreen()
    },
    [onOpenNotificationsScreen],
  )

  usePush({
    condition,
    onOpened: onOpened,
    onReceived: noop,
  })

  return null
}
```

```typescript
export const ProtectedNavigator = () => {
  const rootNavigation =
    useNavigation<NavigationProp<TProtectedStackParamList>>();

  const openNotificationsScreenHandler = useCallback(
    () => {
      rootNavigation.navigate('notifications');
    },
    [rootNavigation],
  );

  return (
    <>
      <Stack.Navigator initialRouteName="main">
      // ...
      </Stack.Navigator>
      <NotificationPushHandler
        onOpenNotificationsScreen={openNotificationsScreenHandler}
      />
    </>
  );
};
```

[version-badge]: https://img.shields.io/npm/v/@kode-frontend/react-native-push-notification.svg?style=flat-square
[package]: https://www.npmjs.com/package/@kode-frontend/react-native-push-notification
