<template>
  <div class="p-6 max-w-screen-xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Kontobewegung</h1>
      <CurrentTime />
    </div>

    <!-- Kontostand -->
    <div class="bg-gray-100 text-center text-xl p-4 rounded shadow mb-6">
      Aktueller Kontostand: <strong>1.234,56 €</strong>
    </div>

    <!-- Buttons as NuxtLinks -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <!-- Einnahme -->
      <NuxtLink
        to="/einnahme"
        class="bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-12 rounded shadow text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200"
      >
        <i class="fas fa-plus text-4xl"></i>
        <span class="text-lg">Einnahme hinzufügen</span>
      </NuxtLink>

      <!-- Ausgabe -->
      <NuxtLink
        to="/ausgabe"
        class="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-12 rounded shadow text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200"
      >
        <i class="fas fa-minus text-4xl"></i>
        <span class="text-lg">Ausgaben hinzufügen</span>
      </NuxtLink>

      <!-- Kategorien -->
      <NuxtLink
        to="/kategorien"
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-4 rounded shadow text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200"
      >
        <span class="text-lg">Kategorien verwalten</span>
      </NuxtLink>

      <!-- Daueraufträge -->
      <NuxtLink
        to="/dauerauftraege"
        class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold py-4 rounded shadow text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200"
      >
        <span class="text-lg">Daueraufträge verwalten</span>
      </NuxtLink>
    </div>

    <!-- Overview -->
    <div class="bg-white shadow rounded p-4">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold">Übersicht der Kontobewegung</h2>
        <input
          type="text"
          v-model="search"
          placeholder="Suchen..."
          class="border border-gray-300 rounded px-2 py-1 text-sm hover:border-red-500"
        />
      </div>

      <table class="w-full table-auto border text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-2">Datum</th>
            <th class="border p-2">Uhrzeit</th>
            <th class="border p-2">Betrag</th>
            <th class="border p-2">Kontoinhaber</th>
            <th class="border p-2">Kategorie</th>
            <th class="border p-2">Kommentar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, index) in filteredTransactions" :key="index">
            <td class="border p-2">{{ t.date }}</td>
            <td class="border p-2">{{ t.time }}</td>
            <td class="border p-2 text-right">{{ t.amount }}</td>
            <td class="border p-2">{{ t.owner }}</td>
            <td class="border p-2">{{ t.category }}</td>
            <td class="border p-2">{{ t.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"; // Import Vue's reactive features

const search = ref("");
const transactions = ref([
  {
    date: "2025-06-01",
    time: "08:30",
    amount: "+1200,00 €",
    owner: "DEX01234",
    category: "Gehalt",
    comment: "Lohnzahlung",
  },
  {
    date: "2025-06-03",
    time: "16:45",
    amount: "-75,99 €",
    owner: "DEX01234",
    category: "Einkauf",
    comment: "Supermarkt",
  },
]);

// Filter transactions based on search input
const filteredTransactions = computed(() => {
  return transactions.value.filter((t) =>
    Object.values(t).some((field) =>
      String(field).toLowerCase().includes(search.value.toLowerCase())
    )
  );
});
</script>
