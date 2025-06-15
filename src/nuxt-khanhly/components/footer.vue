<script setup>
const year = new Date().getFullYear() // Get the current year
</script>

<template>
  <footer class="border-t mt-12 py-4 text-center text-sm bg-gray-100"> 
    <p class="mb-2"> 
      © {{ year }} Budget Buddy ·
      <NuxtLink to="/about" class="underline hover:text-yellow-600">About</NuxtLink> ·
      <NuxtLink to="/authors" class="underline hover:text-yellow-600">Authors</NuxtLink> ·
      <NuxtLink to="/archive" class="underline hover:text-yellow-600">Archive</NuxtLink> ·
      <NuxtLink to="/terms" class="underline hover:text-yellow-600">Terms</NuxtLink> ·
      <NuxtLink to="/cookies" class="underline hover:text-yellow-600">Cookies</NuxtLink>
    </p>

    <p>
      Made with ❤️ for students.
    </p>
  </footer>
</template>

