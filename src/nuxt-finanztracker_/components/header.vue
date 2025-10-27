<script setup>
import { useRoute } from 'vue-router'
import DarkMode from '~/components/darkMode.vue' // Dark mode toggle component
import { ref, onMounted, onUnmounted } from 'vue' 

const route = useRoute() //hightlight current nav item
const isScrolled = ref(false) // pruef scroll zustand

onMounted(() => {
  const onScroll = () => (isScrolled.value = window.scrollY > 80)
  window.addEventListener('scroll', onScroll)
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

const navItems = [
  { label: "DASHBOARD", href: "/dashboard" },
  { label: "KONTOBEWEGUNG", href: "/kontobewegung" },
  { label: "CHALLENGE", href: "/challenge" },
  { label: "EXPORT", href: "/export" },
]
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
/>
  <!-- Header -->
  <header
     :class="[
      'sticky top-0 z-50 flex items-center justify-between px-8 border-b transition-all duration-300',
      isScrolled // wenn gescrollt, kleinere header
        ? 'h-28 bg-white/90 dark:bg-gray-900/80 shadow-md'
        : 'h-40 bg-white dark:bg-gray-900'
    ]"
  >
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
      <h1 class="font-bold text-5xl text-gray-800 dark:text-gray-100 mb-3">
        Pleitegeier
      </h1>

      <nav>
        <ul class="flex gap-6 text-sm font-semibold">
          <li v-for="(item, i) in navItems" :key="i">
            <NuxtLink
              :to="item.href"
              :class="[
                'pb-1 border-b-2 transition-colors duration-200',
                route.path === item.href
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400'
              ]"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-5">
      <!-- Dark Mode -->
      <div class="flex flex-col items-center gap-1">
        <i class="fas fa-adjust text-lg text-gray-700 dark:text-gray-200"></i>
        <DarkMode />
      </div>

      <!-- Language Selector -->
      <div class="flex flex-col items-center gap-1">
        <i class="fas fa-globe text-lg text-gray-700 dark:text-gray-200"></i>
        <select
          class="text-sm border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5
                 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="de">DE</option>
          <option value="en">EN</option>
        </select>
      </div>

      <!-- Avatar-->
      <div
        class="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center text-white dark:text-gray-800"
      >
        <i class="fas fa-user"></i>
      </div>
    </div>
  </header>
</template>
