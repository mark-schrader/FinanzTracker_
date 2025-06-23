import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to, from) => {
  // Token aus localStorage holen (nur im Client)
  // Token aus localStorage holen (nur im Client)
  const token = process.client ? localStorage.getItem('auth_token') : null
  // Dashboard-Routen schützen
  if (to.path.startsWith('/dashboard') && !token) {
    // Optional: Info-Message anzeigen (z.B. mit useNuxtApp().$toast)
    // useNuxtApp().$toast?.error('Bitte zuerst einloggen!')

    // Weiterleitung zur Startseite
    return navigateTo('/')
  }

  // Optional: Weitere geschützte Routen hinzufügen
  // if (to.path.startsWith('/profile') && !token) {
  //   return navigateTo('/')
  // }
})