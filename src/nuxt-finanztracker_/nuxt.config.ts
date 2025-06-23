
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: [
    '~/assets/css/tailwind.css',
    'animate.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase' 
  ],
  supabase: {
    redirectOptions: {
      login: '/',              
      callback: '/confirm',
      include: undefined,
      exclude: [],
      saveRedirectToCookie: true
    }
  }
})