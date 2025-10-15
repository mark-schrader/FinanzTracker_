<script setup>
const year = new Date().getFullYear() // Get the current year
</script>

<template>
  <footer class="border-t mt-12 py-4 text-center text-sm bg-gray-100"> 
    <p class="mb-2"> 
      © {{ year }} Budget Buddy ·
      <NuxtLink to="/footerItem/about" class="underline hover:text-blue-700">About</NuxtLink> ·
      <NuxtLink to="/footerItem/authors" class="underline hover:text-blue-700">Authors</NuxtLink> ·
      <NuxtLink to="/footerItem/archive" class="underline hover:text-blue-700">Archive</NuxtLink> ·
      <NuxtLink to="/footerItem/terms" class="underline hover:text-blue-700">Terms</NuxtLink> ·
      <NuxtLink to="/footerItem/cookies" class="underline hover:text-blue-700">Cookies</NuxtLink>
    </p>

    <p>
      Made with ❤️ for students.
    </p>
  </footer>
</template>

