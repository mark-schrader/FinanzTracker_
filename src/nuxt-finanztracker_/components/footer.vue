<script setup>
const year = new Date().getFullYear(); // Get the current year
</script>

<template>
  <footer class="footer">
    <p class="mb-2">
      © {{ year }} Budget Buddy ·
      <NuxtLink to="/footerItem/about" class="link-primary">About</NuxtLink>
      ·
      <NuxtLink to="/footerItem/authors" class="link-primary">Authors</NuxtLink>
      ·
      <NuxtLink to="/footerItem/archive" class="link-primary">Archive</NuxtLink>
      ·
      <NuxtLink to="/footerItem/terms" class="link-primary">Terms</NuxtLink>
      ·
      <NuxtLink to="/footerItem/cookies" class="link-primary">Cookies</NuxtLink>
    </p>

    <p>Made with ❤️ for students.</p>
  </footer>
</template>
