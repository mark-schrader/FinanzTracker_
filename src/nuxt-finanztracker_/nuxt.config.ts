
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({



  css: [
    //'~/assets/css/tailwind.css',
    //'animate.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase' 
  ],
  supabase: {
    
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,

    redirectOptions: {
      login: '/',              
      callback: '/confirm',
      include: undefined,
      exclude: [],
      saveRedirectToCookie: true
    }
  }
})