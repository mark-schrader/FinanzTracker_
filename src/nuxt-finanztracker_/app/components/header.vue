<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute() // Get the current route to highlight active navigation item

const navItems = [
  { label: "DASHBOARD", href: "/dashboard" },
  { label: "KONTOBEWEGUNG", href: "/kontobewegung" },
  { label: "CHALLENGE", href: "/challenge" },
  { label: "EXPORT", href: "/export" },
];
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

  <!-- Header is fixed -->
  <header class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-40 px-6 bg-white border-b">
    <!-- Logo -->
    <NuxtLink to="/" class="flex-shrink-0 group"> <!-- flex-shrink for original Logo -->
      <img src="/Logo.png" alt="Logo"
        class="w-auto h-20 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105" />
      <!-- Logo with Hover effect and animation rotate -->
    </NuxtLink>

    <!-- Center: Title + Navigation -->
    <div class="flex flex-col items-center justify-center">
      <h1 class="py-5 text-5xl font-bold">Pleitegeier</h1>
      <nav class="mt-1"> <!-- Navigation -->
        <ul class="flex space-x-6 text-sm font-semibold">
          <li v-for="(item, i) in navItems" :key="i">
            <NuxtLink :to="item.href" :class="[
              route.path === item.href // check if the current route matches the href
                ? 'pb-1 border-b-2 text-red-600 border-red-600' //highlight active link
                : 'text-gray-700 hover:text-blue-700 pb-1 border-b-2 border-transparent' // default style for inactive links
            ]">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Right actions -->
    <div class="flex items-center gap-x-4">
      <!-- Theme toggle/Darkmode -->
      <div class="flex flex-col items-center space-y-1">
        <i class="text-lg fas fa-adjust"></i>
        <darkMode />
      </div>

      <!-- Language -->
      <div class="flex flex-col items-center space-y-1">
        <i class="text-lg fas fa-globe"></i>
        <select class="text-sm border rounded px-1 py-0.5">
          <option value="de">DE</option>
          <option value="en">EN</option>
        </select>
      </div>

      <!-- Avatar -->
      <!-- will be later implemented-->
      <div class="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full">
        <i class="fas fa-user"></i>
      </div>
    </div>
  </header>
</template>
