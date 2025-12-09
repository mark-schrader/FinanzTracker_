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
        class="form-input w-1/3 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100" 
      />
    </div>

    <!-- Tabelle mit horizontalem Scroll für kleine Bildschirme -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Datum</th>
            <th class="text-right">Betrag</th>
            <th>Zyklus</th>
            <th>Kontoinhaber</th>
            <th>Notiz</th>
            <th>Kategorie</th>
            <th>Kommentar</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(t, index) in filteredTransactions"
            :key="index"
            class="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <td>{{ t.date }}</td> 

            <td
              class="text-right font-medium"
              :class="{
                'text-teal-600 dark:text-teal-400': t.type === 'Einnahme',
                'text-red-500 dark:text-red-400': t.type === 'Ausgabe'
              }"
            >
              {{ t.amount }}
            </td>

            <td>{{ t.interval }}</td>
            <td>{{ t.owner }}</td>
            <td>{{ t.purpose }}</td>
            <td>{{ t.categoryName }}</td>
            <td>{{ t.comment }}</td>
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
