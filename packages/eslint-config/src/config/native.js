require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    require.resolve('../shared/base'),
    require.resolve('../specific-rules/react-native'),
  ],

  env: {
    es6: true,
  },

  parserOptions: {
    sourceType: 'module',
  },

  overrides: [
    {
      /**
       * @see https://www.npmjs.com/package/eslint-plugin-ft-flow
       */
      files: ['*.js'],
      parser: '@babel/eslint-parser',
      plugins: ['ft-flow'],
      rules: {
        'ft-flow/define-flow-type': 1,
        'ft-flow/use-flow-type': 1,
      },
    },
    {
      files: ['*.jsx'],
      parser: '@babel/eslint-parser',
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 1,
        'no-undef': 'off',
        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': 1,
      },
    },
  ],

  /** Map from global var to bool specifying if it can be redefined */
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
    Promise: true,
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
}
