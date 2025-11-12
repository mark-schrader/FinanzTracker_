<template>
  <div class="p-6 max-w-screen-xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Dashboard: Account Balance</h1>
      <CurrentTime /> <!-- Current time component -->
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Verlauf des Kontostands -->
    <div class="col-span-1 md:col-span-2 bg-gray-200 rounded-md p-6 min-h-[180px]">
      <p class="text-base font-medium mb-4">Verlauf des Kontostands</p>
      <verlaufChart :transactions="transactions" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Ausgaben -->
      <div class="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
        <p class="font-medium mb-2 text-center">Ausgaben nächste 7 Tage</p>
        <div class="w-full h-[260px]">
          <expensesnext7days :transactions="transactions" />
        </div>
      </div>

      <!-- Einnahmen -->
      <div class="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
        <p class="font-medium mb-2 text-center">Einnahmen nächste 7 Tage</p>
        <div class="w-full h-[260px]">
          <incomenext7days :transactions="transactions" />
        </div>
      </div>
    </div>

      <!-- Ausgaben pro Kategorie -->
      <div class="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px]">
        <p class="font-medium mb-2">Ausgaben pro Kategorie</p>
        <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 3v18m4-14h6M5 9h6m4 10h6M5 19h6" />
        </svg>
      </div>

      <!-- Individuelles Dashboard -->
      <div class="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px]">
        <p class="font-medium mb-2">Individuelles Dashboard</p>
        <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>

    <!-- Kontobewegungstabelle -->
    <bewegungstabelle :transactions="transactions" /> 

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFetch } from '#app'
import expensesnext7days from '../components/expensesnext7days.vue'
import incomenext7days from '../components/incomenext7days.vue'

const transactions = ref([])
const search = ref('')

onMounted(async () => {
  const { data, error } = await useFetch('/api/transactions')
  if (data.value) transactions.value = data.value
})

// Search filter
const filteredTransactions = computed(() =>
  transactions.value.filter(t =>
    Object.values(t).some(field =>
      String(field).toLowerCase().includes(search.value.toLowerCase())
    )
  )
)
</script>
