<template>
  <div class="flex flex-col min-h-screen text-gray-800 dark:text-black-400 bg-gray-300 dark:bg-gray-900">
    <!-- Header -->
    <Header />

    <!-- Inhalt -->
    <main class="container m-auto pt-45 flex-grow">  <!-- flex-grow allows the main content to expand -->
      <NuxtPage />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
// Import the components
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
</script>
