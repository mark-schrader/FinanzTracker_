<template>
  <div class="max-w-6xl mx-auto bg-white transparent rounded-2xl shadow-xl">
    <div
      class="text-center bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl p-4 shadow-md"
    >
      <div class="flex items-center gap-20 mb-10">
        <NuxtLink to="/">
          <i class="fas fa-arrow-left text-2xl dark:text-gray-900"></i>
        </NuxtLink>
        <h1
          class="md:text-2xl underline text-sky-900 dark:text-gray-900 inline"
        >
          Mein Profil - Persönliche Daten
        </h1>
      </div>

      <div class="pt-5 pb-20 mt-5">
        <h3 class="italic text-xs md:text-xl font-1xl dark:text-gray-900">
          In Mein Profil - Persönliche Daten können Sie Ihre persönliche Daten
          sehen und Ihre Profil verwalten
        </h3>
      </div>
    </div>

    <div class="p-8">
      <button
        @click="isEditing = !isEditing"
        class="focus:outline-none transition-all transform hover:translate-z-1 hover:scale-110 dark:text-gray-900"
      >
        <i class="fas fa-edit"></i>
        {{ isEditing ? "" : "Bearbeiten" }}
      </button>

      <div class="m-5 p-5 text-justify">
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-lg font-bold text-gray-700 dark:text-gray-900">
            Familienname
          </dt>
          <dd class="md:col-span-2">
            <input
              v-if="isEditing"
              v-model="profile.lastname"
              type="text"
              class="ml-30 text-lg text-gray-900 focus:outline-none font-bold"
            />
            <p v-else class="text-lg text-gray-900">{{ profile.lastname }}</p>
          </dd>
        </div>

        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-lg font-bold text-gray-700 dark:text-gray-900">
            Vorname
          </dt>
          <dd class="md:col-span-2">
            <input
              v-if="isEditing"
              v-model="profile.firstname"
              type="text"
              class="ml-30 text-lg text-gray-900 focus:outline-none font-bold"
            />
            <p v-else class="text-lg text-gray-900">{{ profile.firstname }}</p>
          </dd>
        </div>

        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-lg font-bold text-gray-700 dark:text-gray-900">
            Geburtsdatum
          </dt>
          <dd class="md:col-span-2">
            <input
              v-if="isEditing"
              v-model="profile.birthdate"
              type="date"
              class="ml-30 text-lg text-gray-900 focus:outline-none font-bold"
              min="1900-01-01"
              max="2090-01-01"
            />
            <p v-else class="text-lg text-gray-900">{{ profile.birthdate }}</p>
          </dd>
        </div>

        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-lg font-bold text-gray-700 dark:text-gray-900">
            Email-Adresse
          </dt>
          <dd class="md:col-span-2">
            <input
              v-if="isEditing"
              v-model="profile.email"
              type="text"
              class="ml-30 text-lg text-gray-900 focus:outline-none font-bold"
            />
            <p v-else class="text-lg text-gray-900">{{ profile.email }}</p>
          </dd>
        </div>

        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-lg font-bold text-gray-700 dark:text-gray-900">
            Universität
          </dt>
          <dd class="md:col-span-2">
            <input
              v-if="isEditing"
              v-model="profile.university"
              type="text"
              class="ml-30 text-lg text-gray-900 focus:outline-none font-bold"
            />
            <p v-else class="text-lg text-gray-900">{{ profile.university }}</p>
          </dd>
        </div>
      </div>

      <!-- Save Button -->
      <div v-if="isEditing" class="flex justify-end mt-10 text-center m-4">
        <button
          @click="saveProfile"
          class="flex items-right px-4 py-2 bg-sky-900 focus:outline-none text-white rounded-xl font-semibold transition-all duration-300 shadow-xl transform hover:translate-y-1"
        >
          Speichern
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isEditing = ref(false);

const profile = ref({
  firstname: "",
  lastname: "",
  university: "",
  birthdate: "",
  email: "",
});

const supabaseid = "USER_SUPABASE_ID";

//Daten aus der datenbank holen und hier zeigen
onMounted(async () => {
  const data = await $fetch("/api/user/me", {
    method: "GET",
    query: { supabaseid },
  });
  profile.value = data;
});

// Formulardaten mit datenbank verbinden und speichern + Button aktivieren
const saveProfile = async () => {
  if (confirm("Änderungen wirklich speichern?")) {
    try {
      await $fetch("/api/user", {
        method: "PUT",
        body: {
          supabaseid,
          ...profile.value,
        },
      });
      alert("Änderungen sind erfolgreich gespeichert");
      isEditing.value = false;
    } catch (err) {
      console.error("Fehler beim Speichern", err);
      alert("Fehler beim Speichern. Bitte versuchen Sie es erneut.");
    }
  }
};
///Das Problem mit Aufladen aufheben!!!
</script>
