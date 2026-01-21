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
    // Set default environment to happy-dom for frontend tests
    environment: 'happy-dom',

    // ONE setup file – logic inside decides what to do for frontend/backend
    setupFiles: ['./test/setup.ts'],
    // Specify test files for frontend and backend
    include: [
      'test/unit/frontend/**/*.{spec,test}.ts',
      'test/unit/backend/**/*.{spec,test}.ts',
      'test/integration/backend/**/*.{spec,test}.ts',
    ],
  },
})
