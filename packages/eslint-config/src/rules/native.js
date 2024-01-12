// React-Native Plugin
// The following rules are made available via `eslint-plugin-react-native` and `eslint-plugin-react-native-a11y`

module.exports = {
  plugins: ['eslint-plugin-react-native'],

  rules: {
    'react-native/no-inline-styles': 1,
    'react-native-a11y/has-accessibility-hint': 'off', // hint should not always be used when label used
    'no-console': [1],
  },
}
