# Timeout-interceptor

[![Version][version-badge]][package]

## ℹ️ Why?

Axios always return `ERR_NETWORK` code of instead `ETIMEDOUT` even if you set `transitional: { clarifyTimeoutError: true }` for android,
because RN hasn't consistent behavior for XMLHttpRequest.ontimeout callback.
Check it here - https://github.com/facebook/react-native/issues?q=xmlhttprequest+timeout+android

To accurately detect a timeout error, you can using `timeout-interceptor`

## 📥 Install

Add `@kode-frontend/timeout-interceptor` dependency to your project.

```shell
# Using npm
npm i @kode-frontend/timeout-interceptor

# Using yarn
yarn add @kode-frontend/timeout-interceptor

# Using pnpm
pnpm add @kode-frontend/timeout-interceptor
```

## 🎮 Usage

```typescript
import {
  startTimeoutInterceptor,
  isTimeoutError,
} from '@kode-frontend/timeout-interceptor'

// Init interceptor
useEffect(() => {
  const clearInterceptor = startTimeoutInterceptor(axiosInstance)

  return () => {
    clearInterceptor()
  }
}, [])

// Usage with request
async function getUser() {
  try {
    return await axios.get('/user?ID=12345')
  } catch (error) {
    if (isTimeoutError(error)) {
      // to do something for timeout
    }
  }
}
```

# TODO

- [ ] Tests

[version-badge]: https://img.shields.io/npm/v/@kode-frontend/timeout-interceptor.svg?style=flat-square
[package]: https://www.npmjs.com/package/@kode-frontend/timeout-interceptor
