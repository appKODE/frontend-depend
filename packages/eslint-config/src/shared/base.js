require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    '../rules/best-practices',
    '../rules/errors',
    '../rules/node',
    '../rules/style',
    '../rules/variables',
    '../rules/es6',
    '../rules/imports',
    '../rules/jest',
    '../rules/strict',
  ],
  plugins: ['import'],
}
