// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      '#app': '/node_modules/nuxt/dist/app',
    },
  },

  test: {
    globals: true,
    environment: 'happy-dom',

    // ONE setup file – logic inside decides what to do
    setupFiles: ['./test/setup.ts'],

    include: [
      'test/unit/frontend/**/*.{spec,test}.ts',
      'test/unit/backend/**/*.{spec,test}.ts',
      'test/integration/backend/**/*.{spec,test}.ts',
    ],
  },
})
