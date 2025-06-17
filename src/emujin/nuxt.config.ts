// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "animate.css"],
  app: {
    head: {
      script: [
        {
          src: "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js",
          type: "module",
        },
        {
          src: "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js",
          nomodule: true,
          defer: true,
        },
      ],
    },
  },
});

// npx run ....
