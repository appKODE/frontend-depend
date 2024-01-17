require('@rushstack/eslint-patch/modern-module-resolution')

/**
 * Base react eslint config (common rules for both web and native) */

module.exports = {
  extends: [
    '../common-rules/node',
    '../common-rules/es6',
    '../common-rules/strict',
    '../common-rules/variables',

    '../common-rules/errors',
    '../common-rules/best-practices',
    '../common-rules/style',

    '../common-rules/imports',

    '../common-rules/react/react',
    '../common-rules/react/react-hooks',
  ],

  ignorePatterns: [
    '.eslintrc.cjs',
    'babel.config.js',
    'metro.config.js',
    'jest.config.js',
  ],
}
