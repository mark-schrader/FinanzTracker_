/** vitest.config.ts
Vitest Configuration File for Nuxt Finanztracker Project
This configuration sets up the testing environment for both frontend and backend tests,
including necessary plugins, aliases, and test file patterns. */

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  /** Path Aliases for Cleaner Imports */
  resolve: {
    alias: {
      '#app': '/node_modules/nuxt/dist/app', // Nuxt App Alias
      '@': resolve(__dirname, '.'), // Project Root Alias
    },
  },

  test: {
    globals: true,

    /** Frontend needs a DOM */
    environment: 'happy-dom',

    /** Setup-Datafiles*/
    setupFiles: [
      './test/setup.frontend.ts',
      './test/setup.prisma.ts',
    ],

    /** Wich tests to include*/
    include: [
      'test/unit/frontend/**/*.{spec,test}.ts',
      'test/unit/backend/**/*.{spec,test}.ts',
      'test/integration/backend/**/*.{spec,test}.ts',
    ],

    /**SQLite + Prisma → Forked Database Connections*/
    isolate: false,
    pool: 'forks',
  },
})
