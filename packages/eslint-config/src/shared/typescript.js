require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json',
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    '../rules/typescript',
  ],

  plugins: ['@typescript-eslint'],

  settings: {
    'import/resolver': {
      typescript: 'tsconfig.json', // load tsconfig.json
    },
  },
}
