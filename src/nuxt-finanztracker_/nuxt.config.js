export default defineNuxtConfig({
  srcDir: 'src/nuxt-finanztracker_/',
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/tailwind.css',
    'animate.css',
  ],
  modules: ['@nuxtjs/tailwindcss']
  })