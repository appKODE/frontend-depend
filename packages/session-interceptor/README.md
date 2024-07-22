# Session-interceptor

[![Version][version-badge]][package]

## 📥 Install

Add `@kode-frontend/session-interceptor` dependency to your project.

```shell
# Using npm
npm i @kode-frontend/session-interceptor

# Using yarn
yarn add @kode-frontend/session-interceptor

# Using pnpm
pnpm add @kode-frontend/session-interceptor
```

## 🎮 Usage

### Session interceptor

Provides implementation of a mechanism for retrying failed requests due to `accessToken` invalid reasons.
Ensures that failed requests will be called again after successful `tokensGetter` resolve.

- Does not substitute new tokens into a repeated request
- Does not fulfill requests to update tokens

### Headers interceptor

Ensures that the required headers are inserted into requests.

The header getter `getHeaders` will be called on every request.
This is `the best place` to pass the actual authorization token.

### Example

```typescript
import {
  startSessionInterceptor,
  startHeadersInterceptor,
  THeadersGetterArg,
} from '@kode-frontend/session-interceptor'

const tokensGetter = async (): Promise<Tokens> => {
  const currentAccessToken = $accessToken.getState()

  if (currentAccessToken) {
    const newTokens = await authApi.postApiV1AuthRefresh({ body: {} })

    return {
      accessToken: newTokens.data.accessToken,
    }
  }
  throw new Error('not isLoggedIn')
}

const getHeaders = ({ config }: THeadersGetterArg) => {
  if (config.url.includes('/v1/auth/refresh')) {
    return []
  }

  const currentAccessToken = $accessTokenStore.getState()
  return [{ key: 'Authorization', value: `Bearer ${currentAccessToken}` }]
}

const onInvalidRefreshResponse = () => {
  // ... some logic, for example logout user.
}

// Should be invoked once in your app
export const startInterceptors = (axiosInstances: AxiosInstance) => {
  const headersInterceptor = startHeadersInterceptor({
    getHeaders,
  })(axiosInstances)

  const sessionInterceptor = startSessionInterceptor({
    storage: {
      storageGetter: key => localStorage.getItem(key),
      storageSetter: (key, value) => localStorage.setItem(key, value),
    },
    invalidAccessTokenErrors: [
      {
        code: 'AccessTokenInvalid',
        status: 401,
      },
    ],
    invalidRefreshTokenErrors: [
      {
        code: 'RefreshTokenInvalid',
        status: 401,
      },
    ],
    tokensGetter,
    onGotNewTokens: tokens => {
      setCredentials(tokens) // your logic to update apps tokens
    },
    onInvalidRefreshResponse,
  })(axiosInstances)
}
```

### Custom token validation

```typescript
startSessionInterceptor({
  // ...
  invalidAccessTokenErrors: [],
  invalidRefreshTokenErrors: [],
  checkAccessTokenInvalid: resp => {
    return resp.data.isAccessExpired === true
  },
  checkRefreshTokenInvalid: resp => {
    return resp.data.isRefreshInvalid === true
  },
})
```

# TODO

- [x] Multiple axios instances support
- [ ] Tests
- [x] Add headers interceptor
- [x] Add doc
- [x] Share Subscripbers.isAllowToRefetch beteween tabs

[version-badge]: https://img.shields.io/npm/v/@kode-frontend/session-interceptor.svg?style=flat-square
[package]: https://www.npmjs.com/package/@kode-frontend/session-interceptor
