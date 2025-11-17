<script setup>
import { useRoute } from "vue-router"; //was useRoute
import darkMode from "~/components/darkMode.vue"; // Darkmode will be later implemented
import { navigateTo } from "#app";

const route = useRoute(); // Get the current route to highlight active navigation item
const isScrolled = ref(false); // pruef scroll zustand

onMounted(() => {
  const onScroll = () => (isScrolled.value = window.scrollY > 80);
  window.addEventListener("scroll", onScroll);
  onUnmounted(() => window.removeEventListener("scroll", onScroll));
});

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
      :class="[
        'header',
        isScrolled ? 'header-scrolled' : '', //wenn sroll, header wird kleiner
      ]"
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
        <Navigation
          :nav-items="navItems"
          :active-path="route.path"
          layout="header"
        />
        <!-- Navigation Komponente -->
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
