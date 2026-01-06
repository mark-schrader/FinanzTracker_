import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to, from) => {
  
const user = useSupabaseUser()
  //const token = process.client ? localStorage.getItem('auth_token') : null

  if (to.path.startsWith('/dashboard') && !user.value) {

    return navigateTo('/')
  }

  
})