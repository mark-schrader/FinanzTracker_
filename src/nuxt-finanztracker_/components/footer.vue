<script setup>
const year = new Date().getFullYear() // Get the current year
//Reaktive Referenzen
const route = useRoute() //hightlight current nav item
const isScrolled = ref(false) // pruef scroll zustand
</script>

<template>
  <footer class="footer"> 
    <p class="mb-2"> 
      © {{ year }} Budget Buddy ·
      <NuxtLink 
        v-for="item in [
          { to: '/footerItem/about', label: 'About' },
          { to: '/footerItem/authors', label: 'Authors' },
          { to: '/footerItem/archive', label: 'Archive' },
          { to: '/footerItem/terms', label: 'Terms' },
          { to: '/footerItem/cookies', label: 'Cookies' }
        ]" 
        :key="item.to"
        :to="item.to"
        :class="[
          'link-primary',
          route.path === item.to ? 'nav-link-active' : '' // Highlight current nav item
        ]"
      >
        {{ item.label }}
      </NuxtLink>
    </p>

    <p>Made with ❤️ for students.</p>
  </footer>
</template>