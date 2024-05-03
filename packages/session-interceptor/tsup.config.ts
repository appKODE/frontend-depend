import { defineConfig, Options } from 'tsup'

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ['./src/index.ts'],
  format: ['cjs'],
  dts: true,
  clean: true,
  external: ['axios'],
  ...options,
}))
