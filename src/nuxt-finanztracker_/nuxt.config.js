export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/tailwind.css',
    'animate.css',
  ],
  modules: ['@nuxtjs/tailwindcss']
  })