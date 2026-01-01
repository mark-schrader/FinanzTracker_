<script setup>
import { useRoute, useRouter } from 'vue-router'
import DarkMode from '~/components/darkMode.vue' // Dark mode toggle component
import { ref, onMounted, onUnmounted } from 'vue'

//Reaktive Referenzen
const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()
const isScrolled = ref(false)

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error', error)
      return
    }
    // redirect to home/login after sign out
    await router.push('/')
  } catch (err) {
    console.error('Unexpected sign out error', err)
  }
}

onMounted(() => {
  const onScroll = () => (isScrolled.value = window.scrollY > 80) // wenn mehr als 80px gescrollt, setze isScrolled auf true
  window.addEventListener('scroll', onScroll)
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

const navItems = [
  { label: 'DASHBOARD', href: '/dashboard' },
  { label: 'KONTOBEWEGUNG', href: '/kontobewegung' },
  { label: 'CHALLENGE', href: '/challenge' },
  { label: 'EXPORT', href: '/export' },
]
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  />

  <!-- Header -->
  <header :class="['header', isScrolled ? 'header-scrolled' : '']">
    
    <!-- Left: Logo -->
    <NuxtLink to="/" class="group flex-shrink-0">
      <img
        src="/Logo.png"
        alt="Logo"
        class="h-20 w-auto transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105"
      />
    </NuxtLink>

    <!-- Center: Title + Navigation -->
    <div class="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center">
      <h1 class="font-bold text-5xl text-gray-800 dark:text-gray-100 mb-3">Pleitegeier</h1>
      <Navigation :nav-items="navItems" :active-path="route.path" layout="header" />
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-6">
      <!-- Dark Mode -->
      <div class="flex items-center gap-2 h-8">
        <i class="fas fa-adjust text-lg text-brand-600 dark:text-brand-300"></i>
        <div class="p-[3px] rounded-full border border-transparent dark:border-brand-700 transition-colors">
          <DarkMode />
        </div>
      </div>

      <!-- Language Selector -->
      <div class="flex items-center gap-2 h-8">
        <i class="fas fa-globe text-lg text-brand-600 dark:text-brand-300"></i>
        <select
          class="form-select px-2 py-1 rounded-md border border-brand-300 dark:border-brand-700 dark:bg-gray-800 dark:text-brand-200 h-8"
        >
          <option value="de">DE</option>
          <option value="en">EN</option>
        </select>
      </div>

      <!-- Avatar -->
      <div @click="router.push('/profile')" class="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-sky-900 transition-all cursor-pointer">
        <i class="fas fa-user"></i>
      </div>

      <!-- Logout -->
      <button @click="signOut" class="focus:outline-none transition-all hover:translate-x-1">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </header>
</template>
