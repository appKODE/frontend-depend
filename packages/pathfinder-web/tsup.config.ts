import { defineConfig, Options } from 'tsup'

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ['./src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  ...options,
}))
