require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    'plugin:react-native-a11y/all',
    require.resolve('../shared/typescript'),
    require.resolve('../shared/native-base'),
    '../rules/native',
  ],
}
