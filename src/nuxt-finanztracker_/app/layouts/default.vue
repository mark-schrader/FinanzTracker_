<template>
  <div class="relative flex flex-col min-h-screen text-gray-800 dark:text-black-400">
    <!-- Background -->
    <div class="absolute inset-0 bg-center bg-cover -z-10" style="background-image: url('/background.png')">
    </div>

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow mt-[160px]">
      <slot />
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
