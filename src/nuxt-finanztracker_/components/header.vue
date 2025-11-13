<script setup>
import { useRoute } from "vue-router"; //was useRoute
import darkMode from "~/components/darkMode.vue"; // Darkmode will be later implemented
import { navigateTo } from "#app";

const route = useRoute(); // Get the current route to highlight active navigation item
const navItems = [
  { label: "DASHBOARD", href: "/dashboard" },
  { label: "KONTOBEWEGUNG", href: "/kontobewegung" },
  { label: "CHALLENGE", href: "/challenge" },
  { label: "EXPORT", href: "/export" },
];

//*******Alert wird nicht angezeigt!!! Bug aufheben******
const showLogoutAlert = () => {
  //funktioniert soweit nicht
  const confirm = confirm("Möchtest du wirklich abmelden?");

  if (confirm) {
    alert("Du hast dich erfolgreich abgemeldet!");
    navigateTo("/");
  }
};
</script>

<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    />
    <!-- Header is fixed -->
    <header
      class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-35 px-6 bg-white shadow-lg"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="shrink-0 group">
        <!-- flex-shrink for original Logo -->
        <img
          src="/Logo.png"
          alt="Logo"
          class="h-20 w-auto transition-transform duration-300 group-hover:rotate-5 group-hover:scale-105"
        />
        <!-- Logo with Hover effect and animation rotate -->
      </NuxtLink>

      <!-- Center: Title + Navigation -->
      <div class="flex flex-col items-center justify-center">
        <h1 class="font-bold text-4xl py-5">Pleitegeier</h1>
        <nav class="mt-1">
          <!-- Navigation -->
          <ul class="flex space-x-6 text-sm font-semibold">
            <li v-for="(item, i) in navItems" :key="i">
              <NuxtLink
                :to="item.href"
                :class="[
                  route.path === item.href // check if the current route matches the href
                    ? 'pb-1 border-b-2 text-red-500 border-red-500' //highlight active link
                    : 'border-transparent text-gray-600 hover:text-sky-600 pb-1 border-b-2 hover:border-indigo-600', // default style for inactive links
                  'transition-colors duration-200 ease-out',
                ]"
              >
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
          <i class="fas fa-adjust text-lg"></i>
          <darkMode />
        </div>

        <!-- Language -->
        <div class="flex flex-col items-center space-y-1">
          <i class="fas fa-globe text-lg"></i>
          <select class="text-sm border rounded px-1 py-0.5">
            <option value="de">DE</option>
            <option value="en">EN</option>
          </select>
        </div>

        <!-- Avatar -->
        <div
          @click="$router.push('/profile')"
          class="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-sky-900 transition-all duration-600"
        >
          <i class="fas fa-user"></i>
        </div>

        <!-- Log Out -->
        <div class="group flex items-center hover: transition-all duration-200">
          <button
            @click="showLogoutAlert"
            class="focus:outline-none transition-all duration-200 transform hover:translate-x-1"
          >
            <i class="fas fa-sign-out-alt transition-transform"></i>
          </button>
        </div>
      </div>
    </header>
  </div>
</template>
