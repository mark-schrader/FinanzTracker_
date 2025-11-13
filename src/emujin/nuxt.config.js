export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css", "animate.css"],
  modules: ["@nuxtjs/tailwindcss"],
  //modules: ["@nuxtjs/i18n"],
  /*i18n: {
    locales: [
      {
        code: "de",
        iso: "de-DE",
        name: "Deutsch",
        file: "de.json",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json",
      },
    ],
    defaultLocale: "de",
    strategy: "prefix_except_default",
    langDir: "locales/",
    vueI18: {
      legacy: false,
      fallbackLocale: "de",
    },
  },*/
});
