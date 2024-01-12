// Fix eslint shareable config (https://github.com/eslint/eslint/issues/3458)
require('@rushstack/eslint-patch/modern-module-resolution')

// base used for both React web and React Native
module.exports = {
  extends: [
    require.resolve('./base'),
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    '../rules/react',
    '../rules/react-hooks',
  ],

  env: {
    es6: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: ['react', 'react-hooks', 'jest'],

  // Map from global var to bool specifying if it can be redefined
  globals: {
    __DEV__: true,
    __dirname: false,
    __fbBatchedBridgeConfig: false,
    AbortController: false,
    Blob: true,
    alert: false,
    cancelAnimationFrame: false,
    cancelIdleCallback: false,
    clearImmediate: true,
    clearInterval: false,
    clearTimeout: false,
    console: false,
    document: false,
    ErrorUtils: false,
    escape: false,
    Event: false,
    EventTarget: false,
    exports: false,
    fetch: false,
    File: true,
    FileReader: false,
    FormData: false,
    global: false,
    Headers: false,
    Intl: false,
    Map: true,
    module: false,
    navigator: false,
    process: false,
    Promise: false,
    requestAnimationFrame: true,
    requestIdleCallback: true,
    require: false,
    Set: true,
    setImmediate: true,
    setInterval: false,
    setTimeout: false,
    queueMicrotask: true,
    URL: false,
    URLSearchParams: false,
    WebSocket: true,
    window: false,
    XMLHttpRequest: false,
  },

  overrides: [
    {
      files: [
        '*.{spec,test}.{js,ts,tsx}',
        '**/__{mocks,tests}__/**/*.{js,ts,tsx}',
      ],
      env: {
        jest: true,
        'jest/globals': true,
      },
      rules: {
        'react-native/no-inline-styles': 0,
        quotes: [
          1,
          'single',
          { avoidEscape: true, allowTemplateLiterals: true },
        ],
      },
    },
  ],
}
