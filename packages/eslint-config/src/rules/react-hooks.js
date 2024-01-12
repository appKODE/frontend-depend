// React-Hooks Plugin
// The following rules are made available via `eslint-plugin-react-hooks`

module.exports = {
  plugins: ['react-hooks'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
  },
}
