<template>
  <div class="card">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h3>
        Übersicht der Kontobewegung
      </h3>

      <input type="text" v-model="search" placeholder="Suchen..."
        class="form-input w-1/3 border-2 border-brand-300 dark:border-brand-600 " />
    </div>

    <!-- Tabelle mit horizontalem Scroll für kleine Bildschirme -->
    <div class="table-container">
      <table class="table dark:text-gray-200">
        <thead>
          <tr class="border-b dark:border-gray-700">
            <th class="min-w-[110px]">Datum</th>
            <th class="px-4 py-2 text-right !text-right">Betrag</th>
            <th>Zyklus</th>
            <th>Kontoinhaber</th>
            <th class="px-4 py-2">Beschreibung</th>
            <th>Kategorie</th>
            <th class="px-4 py-2 min-w-[110px]">Kommentar</th>
            <th class="px-4 py-2 w-[100px] text-center">Aktion</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(t, index) in filteredTransactions" :key="index"
            class="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <td class="px-4 py-2">{{ t.date }}</td>

            <td class="text-right font-medium" :class="{
              'text-teal-600 dark:text-teal-400': t.type === 'Einnahme',
              'text-red-500 dark:text-red-400': t.type === 'Ausgabe'
            }">
              {{ t.amount }}
            </td>

            <td class="px-4 py-2">{{ t.interval }}</td>
            <td class="px-4 py-2">{{ t.owner }}</td>
            <td class="px-4 py-2">{{ t.purpose }}</td>
            <td class="px-4 py-2">{{ t.categoryName }}</td>
            <td class="px-4 py-2 min-w-[110px]">{{ t.comment }}</td>
            <td class="px-4 py-2 w-[100px] flex justify-center space-x-4">
              <!-- Bearbeiten -->
              <button class="text-teal-600 hover:text-teal-400"
                @click="$emit('edit', t)">
                <i class="fas fa-pen"></i>
              </button>

              <!-- Löschen-->
              <button class="text-red-600 hover:text-red-400"
                @click="$emit('delete', t.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>

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
