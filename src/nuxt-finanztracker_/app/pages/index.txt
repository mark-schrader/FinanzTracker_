<template>
  <div> 
    <div class="max-w-2xl mx-auto text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-600 animate__animated animate__fadeInDown">
        Willkommen bei Pleitegeier
      </h1>

      <p class="mt-4 text-lg text-gray-600 animate__animated animate__fadeInUp">
        Wir machen bei deinen Finanzen Klarschiff und veranschaulichen dir deine Geldbewegungen im Alltag.
      </p>

      <NuxtLink
        to="/kontobewegung"
        class="inline-block mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-300 rounded shadow animate__animated animate__fadeIn"
      >
        ➡️ Kontobewegung ansehen
      </NuxtLink>
    </div>
  </div>
</template>

<style>
@import url("animate.css");
</style>
