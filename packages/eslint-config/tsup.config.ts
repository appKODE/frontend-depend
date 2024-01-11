import { defineConfig } from 'tsup'

export default defineConfig({
  splitting: false,
  sourcemap: false,
  dts: true,
  minify: true,
  clean: true,
  esbuildOptions: options => {
    options.footer = {
      // This will ensure we can continue writing this config
      // as a modern ECMA module, while still publishing this as a CommonJS
      // library with a default export, as that's how ESLint expects configs to look.
      // @see https://github.com/evanw/esbuild/issues/1182#issuecomment-1011414271
      js: 'module.exports = module.exports.default;',
    }
  },
  entry: {
    'react-native': 'src/configs/react-native.ts',
    react: 'src/configs/react.ts',
  },
})
