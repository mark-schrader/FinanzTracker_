<script setup>
import { useRoute } from "vue-router";
import DarkMode from "~/components/darkMode.vue"; // Dark mode toggle component
import { ref, onMounted, onUnmounted } from "vue";

//Reaktive Referenzen
const router = useRoute(); //hightlight current nav item
const isScrolled = ref(false); // pruef scroll zustand

const showLogoutAlert = () => {
  console.log("Logout clicked");
};

onMounted(() => {
  const onScroll = () => (isScrolled.value = window.scrollY > 80); // wenn mehr als 80px gescrollt, setze isScrolled auf true
  window.addEventListener("scroll", onScroll);
  onUnmounted(() => window.removeEventListener("scroll", onScroll));
});

const navItems = [
  { label: "DASHBOARD", href: "/dashboard" },
  { label: "KONTOBEWEGUNG", href: "/kontobewegung" },
  { label: "CHALLENGE", href: "/challenge" },
  { label: "EXPORT", href: "/export" },
];
</script>

<template>
  <!--!!!!Wrap everything into one single PARENT ELEMENT ansonsten beschwert sich nuxt!!!!-->
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    />
    <!-- Header -->
    <header
      :class="[
        'header',
        isScrolled ? 'header-scrolled' : '', //wenn sroll, header wird kleiner
      ]"
    >
      <!-- Left: Logo -->
      <NuxtLink to="/" class="group flex-shrink-0">
        <img
          src="/Logo.png"
          alt="Logo"
          class="h-20 w-auto transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105"
        />
      </NuxtLink>

      <!-- Center: Title + Navigation -->
      <div
        class="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center"
      >
        <h1 class="font-bold text-5xl text-gray-800 dark:text-gray-100 mb-3">
          Pleitegeier
        </h1>

        <Navigation
          :nav-items="navItems"
          :active-path="route.path"
          layout="header"
        />
        <!-- Navigation Komponente -->
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-5">
        <!-- Dark Mode -->
        <div class="flex flex-col items-center gap-1">
          <i class="fas fa-adjust text-lg text-gray-700 dark:text-gray-200"></i>
          <DarkMode />
        </div>

        <!-- Language Selector -->
        <div class="flex flex-col items-center gap-1">
          <i class="fas fa-globe text-lg text-gray-700 dark:text-gray-200"></i>
          <select
            class="text-sm border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="de">DE</option>
            <option value="en">EN</option>
          </select>
        </div>

        <!-- Avatar-->
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
