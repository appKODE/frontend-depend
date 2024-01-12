require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [require.resolve('../shared/typescript'), '../shared/web-base'],
}
