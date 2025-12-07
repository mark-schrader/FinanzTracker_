<template>
  <div class="p-6 max-w-screen-xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Dashboard: Account Balance</h1>
      <CurrentTime />
    </div>

    <!-- Verlauf des letzten Jahres -->
    <div class="bg-gray-200 rounded-md p-6 min-h-[220px] shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800">
      <p class="text-base font-medium mb-4 text-center">Verlauf des Kontostands (letztes Jahr)</p>
      <verlaufChart :transactions="transactions" />
    </div>

    <!-- Ausgaben & Einnahmen nebeneinander -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Ausgaben -->
      <div
        class="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <p class="font-medium mb-2 text-center">Ausgaben – letzte 7 Tage</p>
        <div class="w-full h-[260px]">
          <expenseslast7days :transactions="transactions" />
        </div>
      </div>

      <!-- Einnahmen -->
      <div
        class="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <p class="font-medium mb-2 text-center">Einnahmen – letzte 7 Tage</p>
        <div class="w-full h-[260px]">
          <incomelast7days :transactions="transactions" />
        </div>
      </div>
    </div>

     <!-- Kategorien Blockcharts -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Ausgaben -->
      <div
        class="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <p class="font-medium mb-2 text-center">Ausgaben je Kategorie</p>
        <div class="w-full h-[260px]">
          <graph_catagories_expenses :transactions="transactions" />
        </div>
      </div>

      <!-- Zeile 3 rechts -->
      <div
        class="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <p class="font-medium mb-2 text-center">Einnahmen je Kategorie</p>
        <div class="w-full h-[260px]">
          <graph_catagories :transactions="transactions" />
        </div>
      </div>
    </div>

    <!--Weitere Kacheln -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Ausgaben pro Kategorie -->
      <div
        class="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <p class="font-medium mb-2">Ausgaben pro Kategorie</p>
        <svg
          class="w-10 h-10 text-gray-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 3v18m4-14h6M5 9h6m4 10h6M5 19h6" />
        </svg>
      </div>

      <!-- Individuelles Dashboard -->
      <div
        class="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <p class="font-medium mb-2">Individuelles Dashboard</p>
        <svg
          class="w-10 h-10 text-gray-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>

    <!-- 🧾 Tabelle -->
    <bewegungstabelle :transactions="transactions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

// Komponenten
import verlaufChart from '../components/verlaufChart.vue'
import CurrentTime from '../components/currentTime.vue'
import expenseslast7days from '../components/expenseslast7days.vue'
import incomelast7days from '../components/incomelast7days.vue'
import graph_catagories_expenses from '../components/graph_catagories_expenses.vue'
import graph_catagories_incomes from '../components/graph_catagories_incomes.vue'
import bewegungstabelle from '../components/bewegungstabelle.vue'

const transactions = ref([])

onMounted(async () => {
  //User-ID (?userId=1) hardcodiert für Demo-Zwecke
  const { data } = await useFetch('/api/transactions?userId=1')
  if (data.value) transactions.value = data.value
})
</script>

