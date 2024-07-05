# feature-toggle-react

## Installation

```
$ yarn add @kode-frontend/feature-toggle-react

# or
$ npm i @kode-frontend/feature-toggle-react

```

## How to use

1. Configure feature toggle

Create a `feature-toggle` directory in your project.
Add some files:

| File             | Description                                    | Example                                                          |
| :--------------- | :--------------------------------------------- | :--------------------------------------------------------------- |
| config.ts        | Initial feature toggle and config it.          | [config.ts](example/src/feature-toggle/config.ts)                |
| default-flags.ts | Default flags.                                 | [default-flags.ts ](example/src/feature-toggle/default-flags.ts) |
| types.d.ts       | Type declaration for provide flags keys types. | [types.d.ts ](example/src/feature-toggle/types.d.ts)             |
| ft-provider.tsx  | Configure provider.                            | [ft-provider.tsx](example/src/feature-toggle/ft-provider.tsx)    |

2. Wrap your app to `FTProvider`
3. Use feature toggles in your code.

## API

### useFeatureToggle

```jsx
import { useFeatureToggle } from '@kode-frontend/feature-toggle-react'

export const Page = () => {
  const FT = useFeatureToggle()

  const isSomeFeatureAvailable = FT.hasFeatureFlag('someFlagName')

  return <>{isSomeFeatureAvailable && <SomeFeature />}</>
}
```

### FeatureToggle Component

```jsx
import { FeatureToggle } from '@kode-frontend/feature-toggle-react'

export const Page = () => {
  return (
    <>
      <FeatureToggle
        name='flag2'
        active={<h2>Active feature content</h2>}
        inactive={<h3>Inactive feature content</h3>}
      />
      <FeatureToggle
        name='flag1'
        active={<h2>Active feature2 content</h2>}
        inactive={<h2>Inactive feature2 content</h2>}
      />
    </>
  )
}
```

### Is fetching remote config

```jsx
import { useFeatureToggle } from '@kode-frontend/feature-toggle-react'

export const Page = () => {
  const { hasFeatureFlag, isFetching } = useFeatureToggle()

  const isFlag3Available = hasFeatureFlag('someFlagName')

  if (isFetching) {
    return <>Loading...</>
  }

  return <>{isFlag3Available && 'page content'}</>
}
```
