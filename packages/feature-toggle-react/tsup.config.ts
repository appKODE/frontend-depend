import { defineConfig, Options } from 'tsup'

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  clean: true,
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-native'],
  ...options,
}))
