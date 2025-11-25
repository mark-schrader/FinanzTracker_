<template>
  <div class="layout-container relative text-gray-800 dark:text-gray-100">
    <!-- Background -->
    <div
      class="absolute inset-0 -z-10 bg-cover bg-center opacity-20 dark:opacity-30"
      style="background-image: url('/background.png')"
    ></div>

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="grow mt-[160px] content-wrapper">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
// Import the components
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";
</script>
