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

`SessionProvider` example

```typescript
type Props = { axiosInstance: AxiosInstance; children: ReactNode }

export const SessionProvider = ({ axiosInstance, children }: Props) => {
  const refreshMutation = useUpdateAccessToken()

  // get new token pair
  const tokensGetter = useCallback(async (): Promise<Tokens> => {
    const { data } = await refreshMutation.mutateAsync($refreshToken.getState())

    return data
  }, [refreshMutation])

  useEffect(() => {
    startSessionInterceptor({
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
    })(axiosInstance)
  }, [axiosInstance, tokensGetter])

  return children
}
```
