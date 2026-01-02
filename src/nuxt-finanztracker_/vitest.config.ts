import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['test/setup.frontend.ts'],
    include: [
      'test/unit/frontend/**/*.{spec,test}.ts',
      'test/unit/backend/**/*.{spec,test}.ts',
      'test/integration/backend/**/*.{spec,test}.ts'
    ]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.')
    }
  }
})
