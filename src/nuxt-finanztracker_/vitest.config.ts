import { defineVitestConfig } from '@nuxt/test-utils/config'
import { resolve } from 'path'

export default defineVitestConfig({
  root: resolve(__dirname, '.'),

  test: {
    globals: true,
    environment: 'nuxt',
    include: ['test/**/*.{spec,test}.ts'],
  }
})
