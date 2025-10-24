<template>
<div class="p-6 max-w-screen-xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Dashboard: {{ userid }}</h1>
      <CurrentTime /> <!-- Current time component -->
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Verlauf des Kontostands -->
    <div class="col-span-1 md:col-span-2 bg-gray-200 rounded-md p-6 min-h-[180px]">
      <p class="text-base font-medium mb-4">Verlauf des Kontostands</p>
      <verlaufChart :transactions="transactions" />
    </div>

      <!-- Einnahme nächste 7 Tage -->
      <div class="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px]">
        <p class="font-medium mb-2">Einnahme nächste 7 Tage</p>
        <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>

      <!-- Ausgaben nächste 7 Tage -->
      <div class="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px]">
        <p class="font-medium mb-2">Ausgabe nächste 7 Tage</p>
        <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
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

<script setup lang="ts">
definePageMeta({
  middleware: 'auth' // Auth-Middleware für diese Seite
})


import { ref, computed, onMounted } from 'vue'
import { useFetch } from '#app'

const transactions = ref([])
const search = ref('')

//user-id-filterung

import { useRoute } from 'vue-router'

const route = useRoute()
const userid = route.params.userid



//onMounted(async () => {
  // { data, error } = await useFetch(`/api/transactions?userid=${userid}`)
  
 // console.log('FETCH DATA:', data.value)
  //console.log('FETCH ERROR:', error)
  
  //if (data.value) transactions.value = data.value

//})

// Search filter
//const filteredTransactions = computed(() =>
  //transactions.value.filter(t =>
    //Object.values(t).some(field =>
      //String(field).toLowerCase().includes(search.value.toLowerCase())
    //)
  //)
//)
</script>
