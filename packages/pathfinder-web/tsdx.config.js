const postcss = require('rollup-plugin-postcss')
const replace = require('@rollup/plugin-replace')

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        modules: true,
      }),
    )

    return config
  },
}
