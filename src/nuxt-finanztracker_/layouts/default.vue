<template>
  <div class="flex flex-col relative min-h-screen text-gray-800 dark:text-black-400">
    <!-- Background -->
    <div
      class="absolute inset-0 -z-10 bg-cover bg-center" style="background-image: url('/background.png')">
    </div>

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow mt-[160px]">
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
