import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: './dist',
  splitting: false,
  sourcemap: false,
  format: ['cjs'],
  target: 'node16',
  platform: 'node',
  minify: 'terser',
  banner: {
    js: '#!/usr/bin/env node',
  },
})
