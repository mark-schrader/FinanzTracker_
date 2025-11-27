<template>
  <div class="card">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-brand-600 dark:text-brand-300">
        Übersicht der Kontobewegung
      </h2>

      <input
        type="text"
        v-model="search"
        placeholder="Suchen..."
        class="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm
               bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
               focus:ring-2 focus:ring-teal-400 focus:outline-none transition-colors"
      />
    </div>

    <!-- Tabelle mit horizontalem Scroll für kleine Bildschirme -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <th class="border p-2">Datum</th>
            <th class="border p-2 text-right">Betrag</th>
            <th class="border p-2">Zyklus</th>
            <th class="border p-2">Kontoinhaber</th>
            <th class="border p-2">Notiz</th>
            <th class="border p-2">Kategorie</th>
            <th class="border p-2">Kommentar</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(t, index) in filteredTransactions"
            :key="index"
            class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <td class="border p-2">{{ t.date }}</td>

            <td
              class="border p-2 text-right font-medium"
              :class="{
                'text-teal-600 dark:text-teal-400': t.type === 'Einnahme',
                'text-red-500 dark:text-red-400': t.type === 'Ausgabe'
              }"
            >
              {{ t.amount }}
            </td>

            <td class="border p-2">{{ t.interval }}</td>
            <td class="border p-2">{{ t.owner }}</td>
            <td class="border p-2">{{ t.purpose }}</td>
            <td class="border p-2">{{ t.category }}</td>
            <td class="border p-2">{{ t.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  transactions: { type: Array, required: true }
})

const search = ref('')

// Filtert Transaktionen basierend auf Suchbegriff
const filteredTransactions = computed(() => {
  return props.transactions.filter(t =>
    Object.values(t).some(field =>
      String(field).toLowerCase().includes(search.value.toLowerCase())
    )
  )
})
</script>
