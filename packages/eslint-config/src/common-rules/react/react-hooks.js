/** @see https://www.npmjs.com/package/eslint-plugin-react-hooks */

module.exports = {
  plugins: ['react-hooks'],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
  },
}
