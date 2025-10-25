export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  devtools: { enabled: true },

  css: [
    '~/assets/css/tailwind.css',
    'animate.css',
  ],

  modules: ['@nuxtjs/tailwindcss'],

  nitro: {
    experimental: {
      asyncContext: true,
    },
    logging: {
      level: 'warn',
    },
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

 // devServer: {
 //   host: '0.0.0.0',
 //   port: 3000,
 // },

  hooks: {
    'nitro:log': (log) => {
      if (log.args[0]?.includes?.('Fetch handler error: Premature close')) return false
      if (log.args[0]?.includes?.('Fetch handler error: aborted')) return false
    },
  },
})
