<template>
  <div class="bg-white shadow rounded p-4">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold">Übersicht der Kontobewegung</h2>
      <input type="text" v-model="search" placeholder="Suchen..."
        class="border border-gray-300 rounded px-2 py-1 text-sm hover:border-red-500" />
    </div>
  <div class="overflow-x-auto"> <!-- horizontal scrolling wenn Bildschirm klein ist -->
    <table class="w-full table-auto border text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="border p-2">Datum</th>
          <th class="border p-2">Betrag</th>
          <th class="border p-2">Zyklus</th>
          <th class="border p-2">Kontoinhaber</th>
          <th class="border p-2">Notiz</th>
          <th class="border p-2">Kategorie</th>
          <th class="border p-2">Kommentar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t, index) in filteredTransactions" :key="index">
          <td class="border p-2">{{ t.date }}</td>
          <td class="border p-2 text-right"
              :class="{
                'text-green-600': t.type === 'Einnahme',
                'text-red-600': t.type === 'Ausgabe'
              }">
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

const filteredTransactions = computed(() => {
  return props.transactions.filter(t =>
    Object.values(t).some(field =>
      String(field).toLowerCase().includes(search.value.toLowerCase())
    )
  )
})
</script>
