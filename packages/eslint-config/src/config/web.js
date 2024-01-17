require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [require.resolve('../shared/base')],

  env: {
    browser: true,
    es2020: true,
  },

  parserOptions: {
    sourceType: 'module',
  },

  globals: {},
}
