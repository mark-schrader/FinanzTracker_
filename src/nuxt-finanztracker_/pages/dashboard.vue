
<template>
  <div class="p-6 max-w-screen-xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Dashboard:</h1>
      <CurrentTime />
    </div>
    
    <!-- Aktueller Kontostand -->
    <div class="card text-center text-xl font-semibold mb-6 bg-teal-50 dark:bg-gray-800">
      Aktueller Kontostand:
      <strong class="text-teal-600 dark:text-teal-400">{{ currentBalance }}</strong>
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
          <graph_categories_expenses :transactions="transactions" />
        </div>
      </div>

      <!-- Zeile 3 rechts -->
      <div
        class="bg-gray-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <p class="font-medium mb-2 text-center">Einnahmen je Kategorie</p>
        <div class="w-full h-[260px]">
          <graph_categories_incomes :transactions="transactions" />
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

definePageMeta({
  middleware: 'auth' // Auth-Middleware für diese Seite
})

import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
//import { useSupabaseUser } from '#supabase/composables'

// Komponenten
import verlaufChart from '../components/verlaufChart.vue'
import CurrentTime from '../components/currentTime.vue'
import expenseslast7days from '../components/expenseslast7days.vue'
import incomelast7days from '../components/incomelast7days.vue'
import graph_categories_expenses from '../components/graph_categories_expenses.vue'
import graph_categories_incomes from '../components/graph_categories_incomes.vue'
import bewegungstabelle from '../components/bewegungstabelle.vue'

const user = useSupabaseUser()

// Alle Transaktionen (Einnahmen & Ausgaben)
const transactions = ref([])

// Kategorien für Einnahmen & Ausgaben
const categories = ref([])

onMounted(async () => {
    
    // Sicherstellen, dass ein Benutzer angemeldet ist
    if (!user.value) {
    console.warn('Kein angemeldeter Benutzer gefunden.')
    return
    }
    
  try {
    // userId aus dem angemeldeten Benutzer abrufen
    const userId = user.value.id
    
    // catData mit userId query laden
    const catData = await $fetch(`/api/categories?userId=${userId}`)
    
    // categories setzen
    categories.value = catData || []

    // Lade kombinierte Transaktionen mit userId query (wichtig für Backend)
    const transData = await $fetch(`/api/transactions?userId=${userId}`)
    
    transactions.value = transData || []

    //console.log('Angemeldeter Benutzer ID:', userId)
    //console.log('Geladene Transaktionen:', transactions.value)
    //console.log('Geladene Kategorien:', categories.value)

  } catch (err) {
    console.error('Fehler beim Laden der Daten:', err)
  }
})
// Konvertiert einen Euro-String ("1.234,56 €") in eine Float-Zahl (1234.56)
function parseEuro(euroString) {
  if (!euroString) return 0

  let cleaned = euroString.replace(/[^0-9.,]/g, '') // Entfernt Symbole
  if (cleaned.includes('.') && cleaned.includes(',')) {
    cleaned = cleaned.replace(/\./g, '') // Punkt = Tausendertrennzeichen → entfernen
    cleaned = cleaned.replace(',', '.') // Komma = Dezimaltrennzeichen → umwandeln
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.')
  }

  const value = parseFloat(cleaned)
  return isNaN(value) ? 0 : value
}

// Berechnet den aktuellen Kontostand auf Basis der Transaktionen
const currentBalance = computed(() => {
  const sum = transactions.value.reduce((total, t) => {
    const amount = parseEuro(t.amount)
    if (t.type === 'Ausgabe') return total - amount
    if (t.type === 'Einnahme') return total + amount
    return total // fallback
  }, 0)

  // Gibt Wert formatiert als z.B. "123,45 €" zurück
  return sum.toFixed(2).replace('.', ',') + ' €'
})
</script>

