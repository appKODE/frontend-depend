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

- Podfile, AndroidManifest - add permissions to push notifications
- Set up messaging in Firebase, add “APNs auth key”
- Add PushNotificationService in app-container.tsx with config
- Add NotificationPushHandler
- Call useRegisterDevice when application starts (e.g. in protected-navigator-connector.tsx)
- Call useUnregisterDevice on logout
- Use usePushAvailable to turn notifications on/off in settings

# TODO

- [] Add doc

[version-badge]: https://img.shields.io/npm/v/@kode-frontend/react-native-push-notification.svg?style=flat-square
[package]: https://www.npmjs.com/package/@kode-frontend/react-native-push-notification
