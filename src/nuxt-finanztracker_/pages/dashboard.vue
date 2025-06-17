<template>
  <div class="p-6 max-w-screen-xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <CurrentTime />
    </div>

    <!-- Finanzübersicht -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white shadow rounded p-4 text-center">
        <p>Kontostand</p>
        <p class="text-2xl font-bold text-blue-600">{{ currentBalance }}</p>
      </div>
      <div class="bg-green-200 shadow rounded p-4 text-center">
        <p>Gesamte Einnahmen</p>
        <p class="text-xl font-semibold text-green-700">{{ totalIncome }}</p>
      </div>
      <div class="bg-red-200 shadow rounded p-4 text-center">
        <p>Gesamte Ausgaben</p>
        <p class="text-xl font-semibold text-red-700">{{ totalExpenses }}</p>
      </div>
    </div>

    <!-- Letzte Bewegungen -->
    <div class="bg-white shadow rounded p-4">
      <h2 class="text-lg font-semibold mb-2">Letzte Kontobewegungen</h2>
      <ul class="divide-y">
        <li v-for="(t, index) in latestTransactions" :key="index" class="py-2 flex justify-between items-center">
          <div>
            <p class="font-medium">{{ t.purpose || t.source }}</p>
            <p class="text-sm text-gray-500">{{ t.date }} • {{ t.category }}</p>
          </div>
          <div :class="t.type === 'Einnahme' ? 'text-green-600' : 'text-red-600'">
            {{ t.amount }}
          </div>
        </li>
      </ul>
    </div>

   <!-- Schnellzugriff -->
<div class="flex flex-wrap justify-between gap-3">
  <NuxtLink to="/kontobewegung"
    class="flex-1 min-w-[120px] max-w-[200px] bg-green-100 hover:bg-green-200 text-green-700 rounded-md px-3 py-2 text-center text-sm font-medium shadow">
    + Einnahme
  </NuxtLink>
  <NuxtLink to="/kontobewegung"
    class="flex-1 min-w-[120px] max-w-[200px] bg-red-100 hover:bg-red-200 text-red-700 rounded-md px-3 py-2 text-center text-sm font-medium shadow">
    - Ausgabe
  </NuxtLink>
  <NuxtLink to="/kategorien"
    class="flex-1 min-w-[120px] max-w-[200px] bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md px-3 py-2 text-center text-sm font-medium shadow">
    Kategorien
  </NuxtLink>
</div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFetch } from '#app'

// Daten & Suche
const transactions = ref([])

onMounted(async () => {
  const { data, error } = await useFetch('/api/transactions')
  if (data.value) transactions.value = data.value
})

// Hilfsfunktion
function parseEuro(euroString) {
  if (!euroString) return 0
  let cleaned = euroString.replace(/[^0-9.,]/g, '')
  if (cleaned.includes('.') && cleaned.includes(',')) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.')
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.')
  }
  const value = parseFloat(cleaned)
  return isNaN(value) ? 0 : value
}

// Gesamtwerte
const currentBalance = computed(() => {
  return transactions.value.reduce((total, t) => {
    const amount = parseEuro(t.amount)
    return t.type === 'Einnahme' ? total + amount : total - amount
  }, 0).toFixed(2).replace('.', ',') + ' €'
})

const totalIncome = computed(() => {
  const sum = transactions.value
    .filter(t => t.type === 'Einnahme')
    .reduce((acc, t) => acc + parseEuro(t.amount), 0)
  return sum.toFixed(2).replace('.', ',') + ' €'
})

const totalExpenses = computed(() => {
  const sum = transactions.value
    .filter(t => t.type === 'Ausgabe')
    .reduce((acc, t) => acc + parseEuro(t.amount), 0)
  return sum.toFixed(2).replace('.', ',') + ' €'
})

// Letzte 5 Transaktionen
const latestTransactions = computed(() => {
  return [...transactions.value]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
})
</script>
