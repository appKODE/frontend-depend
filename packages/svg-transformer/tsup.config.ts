import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: './dist',
  splitting: false,
  sourcemap: false,
  format: ['cjs'],
  target: 'esnext',
  platform: 'node',
  minify: 'terser',
})
