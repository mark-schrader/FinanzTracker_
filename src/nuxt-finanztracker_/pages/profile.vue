<template>
  <div
    class="max-w-6xl mx-auto mt-20 p-8 bg-white transparent rounded-2xl shadow-xl"
  >
    <div class="flex items-center gap-20 mb-20">
      <NuxtLink to="/">
        <i class="fas fa-arrow-left text-2xl dark:text-gray-900"></i>
      </NuxtLink>
      <h1 class="md:text-2xl underline text-sky-900 dark:text-gray-900 inline">
        Mein Profil - Persönliche Daten
      </h1>
    </div>

    <div class="pt-5 pb-20 mt-5">
      <h3 class="text-xs md:text-xl font-1xl dark:text-gray-900">
        In Mein Profil - Persönliche Daten können Sie Ihre persönliche Daten
        sehen und Ihre Profil verwalten
      </h3>
    </div>

    <div>
      <button
        @click="isEditing = !isEditing"
        class="focus:outline-none transition-all transform hover:translate-z-1 hover:scale-110 dark:text-gray-900"
      >
        <i class="fas fa-edit"></i>
        {{ isEditing ? "" : "Bearbeiten" }}
      </button>

      <div class="m-5 p-5 text-justify">
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-m font-bold text-gray-700 dark:text-gray-900">
            Familienname
          </dt>
          <dd class="md:col-span-2">
            <input
              v-if="isEditing"
              type="text"
              class="ml-30 text-m text-gray-900 focus:outline-none font-bold"
              placeholder="König"
            />
          </dd>
        </div>

        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-m font-bold text-gray-700 dark:text-gray-900">
            Vorname
          </dt>
          <dd class="md:col-span-2">
            <input
              v-if="isEditing"
              type="text"
              class="ml-30 text-m text-gray-900 focus:outline-none font-bold"
              placeholder="Anna"
            />
            <p v-else class=""></p>
          </dd>
        </div>

        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-m font-bold text-gray-700 dark:text-gray-900">
            Gebursdatum
          </dt>
          <!--Hier nut mit datum!!!!-->
          <dd class="md:col-span-2">
            <input
              v-if="isEditing"
              type="date"
              class="ml-30 text-m text-gray-900 focus:outline-none font-bold"
              min="1900-01-01"
              max="2090-01-01"
            />
          </dd>
        </div>

        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-m font-bold text-gray-700 dark:text-gray-900">
            Geburtsland
          </dt>
          <dd class="md:col-span-2">
            <select
              v-if="isEditing"
              class="ml-30 text-m text-gray-900 focus:outline-none font-bold"
            >
              <option>Deutschland</option>
              <option>Frankreich</option>
              <option>China</option>
              <option>Schweiz</option>
            </select>
          </dd>
        </div>

        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-m font-bold text-gray-700 dark:text-gray-900">
            Staatsangehörigkeit
          </dt>
          <dd class="md:col-span-2">
            <select
              v-if="isEditing"
              class="ml-30 text-m text-gray-900 focus:outline-none font-bold"
            >
              <option>Deutschland</option>
              <option>Frankreich</option>
              <option>China</option>
              <option>Schweiz</option>
            </select>
          </dd>
        </div>

        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-m font-bold text-gray-700 dark:text-gray-900">
            Meldeadresse
          </dt>
          <div class="md:col-span-2 space-y-4">
            <dd class="ml-30 text-m text-gray-900">
              <input
                v-if="isEditing"
                type="text"
                placeholder="Straße 123"
                class="text-m text-gray-900 focus:outline-none font-bold"
              />
            </dd>
            <dd class="ml-30 text-m text-gray-900">
              <input
                v-if="isEditing"
                type="text"
                maxlength="5"
                placeholder="Postleitzahl"
                class="text-m text-gray-900 focus:outline-none font-bold"
              />
            </dd>
            <dd class="ml-30 text-m text-gray-900">
              <input
                v-if="isEditing"
                type="text"
                placeholder="Stadt"
                class="text-m text-gray-900 focus:outline-none font-bold"
              />
            </dd>
          </div>
        </div>
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
</template>

<script setup>
import { ref } from "vue";

const isEditing = ref(false);

//Formulardaten mit datenbank verbinden und speichern

const saveProfile = () => {
  if (confirm("Änderungen wirklich speichern?")) {
    alert("Änderungen sind erfolgreich gespeichert");
    isEditing.value = false;
  }
};
</script>
