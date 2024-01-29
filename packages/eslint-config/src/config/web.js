require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [require.resolve('../shared/base')],

  env: {
    browser: true,
    es2020: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },

  globals: {},

  ignorePatterns: ['dist', '.eslintrc.cjs'],
}
