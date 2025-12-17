<template>
  <div class="p-6 max-w-screen-xl mx-auto">
    <!-- Titel -->
    <div class="flex items-center justify-between mb-6">
      <h1>Sparziele</h1>
      <CurrentTime /> <!-- Current time component -->
    </div>

    <!-- Grid für Sparziel Name & Hinzufügen -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Sparziel Name -->
      <div class="bg-gray-100 rounded-lg p-6 shadow-md flex flex-col justify-between">
        <div class="text-lg font-semibold mb-4">Sparziel Name</div>
        <div class="flex justify-center mb-4">
          <svg viewBox="0 0 36 36" class="w-32 h-32">
            <circle cx="18" cy="18" r="16" fill="#E0E0E0" />
            <path
              d="M18 2
                 A 16 16 0 0 1 34 18
                 L 18 18 Z"
              fill="#90CAF9"
            />
            <path
              d="M34 18
                 A 16 16 0 1 1 18 2
                 L 18 18 Z"
              fill="#424242"
            />
          </svg>
        </div>
        <div class="text-right">
          <button class="text-sm text-blue-600 hover:underline flex items-center">
            öffnen
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14 3h7v7m0 0L10 21l-7-7 11-11z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Sparziel Hinzufügen -->
      <div
        class="bg-gray-100 rounded-lg p-6 shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200">
        <div class="text-lg font-semibold mb-4">Sparziel Hinzufügen</div>
        <div class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-black" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Geschaffte Sparziele (darunter) -->
    <div class="mt-6">
      <div class="bg-gray-100 rounded-lg p-6 shadow-md flex flex-col items-center justify-center">
        <div class="text-lg font-semibold mb-4">Geschaffte Sparziele</div>
        <div class="w-24 h-24 bg-gray-300 rounded flex items-center justify-center">
          <svg class="w-12 h-12 text-black" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// kein Script-Teil nötig momentan
</script>

<style scoped>
/* keine zusätzlichen Styles notwendig */
</style>
