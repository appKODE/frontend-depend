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
} from '@kode-frontend/session-interceptor'

type Props = { axiosInstances: AxiosInstance[]; children: ReactNode }

export const SessionProvider = ({ axiosInstances, children }: Props) => {
  const tokensGetter = async (): Promise<Tokens> => {
    // ... some logic to get new tokens
    const { data } = await refreshMutation.mutateAsync(
      $refreshTokenStore.getState(),
    )

    return data
  }

  const onInvalidRefreshResponse = () => {
    // ... some logic, for example logout user.
  }

  const getHeaders = () => {
    const currentAccessToken = $accessTokenStore.getState()
    return [{ key: 'Authorization', value: `Bearer ${currentAccessToken}` }]
  }

  useEffect(() => {
    startHeadersInterceptor({
      getHeaders,
    })(axiosInstances)

    startSessionInterceptor({
      storage: {
        storageGetter: localStorage.getItem,
        storageSetter: localStorage.setItem,
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
  }, [axiosInstances, tokensGetter, onInvalidRefreshResponse, getHeaders])

  return children
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
