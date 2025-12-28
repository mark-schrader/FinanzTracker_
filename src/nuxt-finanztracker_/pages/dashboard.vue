
<template>
  <div class="p-6 max-w-screen-xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1>Dashboard</h1>
      <CurrentTime />
    </div>

    <!-- Aktueller Kontostand -->
    <h2 class="card text-center mb-6 bg-teal-50 dark:bg-gray-800">
      Aktueller Kontostand:
      <strong class="text-teal-600 dark:text-teal-400">{{ currentBalance }}</strong>
    </h2>
    <!-- Filtersegment -->
    <div class="card flex flex-col gap-4 mb-6 bg-gray-100 dark:bg-gray-800">
      <h3>Filter</h3>
      <!-- Checkbox zum Umschalten -->
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" v-model="manualRange" class="w-4 h-4" />
        <span class="font-medium">Zeitraum genau bestimmen</span>
      </label>

      <!-- Intervall-Auswahl -->
      <div v-if="!manualRange" class="flex flex-wrap items-center gap-3 border-2 border-brand-300 dark:border-brand-600 rounded w-48">
        <select v-model="selectedInterval"
                class="form-select w-48">
          <option value="all">Alle Daten</option>
          <option value="week">Woche</option>
          <option value="month">Monat</option>
          <option value="semester">Semester</option>
          <option value="year">Jahr</option>
        </select>
      </div>

      <!-- Manuelle Datumsauswahl -->
      <div v-else class="flex flex-wrap items-center gap-4">
        <div class="flex flex-col">
          <label class="mb-1">Startdatum</label>
          <input type="date" v-model="startDate"
                class="form-input">
        </div>

        <div class="flex flex-col">
          <label class="mb-1">Enddatum</label>
          <input type="date" v-model="endDate"
                class="form-input">
        </div>

        <button @click="clearManualDates"
                class="btn btn-primary mt-6">
          Reset
        </button>
      </div>
    </div>
    <!-- Verlauf Vollständig -->
    <div class="bg-gray-100 rounded-md p-6 min-h-[220px] shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800">
      <h4 class="mb-4 text-center">Verlauf des Kontostands (letztes Jahr)</h4>
      <verlaufChart :transactions="filteredTransactions" />
    </div>

    <!-- Ausgaben & Einnahmen nebeneinander -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Ausgaben Intervall -->
      <div
        class="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <h4 class="mb-2 text-center">Ausgaben</h4>
        <div class="w-full h-[260px]">
          <expenseslast7days :transactions="filteredTransactions" />
        </div>
      </div>

      <!-- Einnahmen Interval -->
      <div
        class="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <h4 class="mb-2 text-center">Einnahmen</h4>
        <div class="w-full h-[260px]">
          <incomelast7days :transactions="filteredTransactions" />
        </div>
      </div>
    </div>

    <!-- Kategorien Blockcharts -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Kategorien Ausgaben -->
      <div
        class="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <h4 class="mb-2 text-center">Ausgaben je Kategorie</h4>
        <div class="w-full h-[260px]">
          <graph_categories_expenses :transactions="filteredTransactions" />
        </div>
      </div>

      <!-- Kategorien Einnahmen -->
      <div
        class="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
      >
        <h4 class="mb-2 text-center">Einnahmen je Kategorie</h4>
        <div class="w-full h-[260px]">
          <graph_categories_incomes :transactions="filteredTransactions" />
        </div>
      </div>
    </div>

    <!-- Tabelle -->
    <bewegungstabelle :transactions="filteredTransactions" />
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
import expenseslast7days from '../components/expenseintervall.vue'
import incomelast7days from '../components/incomeintervall.vue'
import graph_categories_expenses from '../components/graph_categories_expenses.vue'
import graph_categories_incomes from '../components/graph_categories_incomes.vue'
import bewegungstabelle from '../components/bewegungstabelle.vue'

const user = useSupabaseUser()

// Alle Transaktionen (Einnahmen & Ausgaben)
const transactions = ref([]);

// Filter Zeitraum & Logik (useTransactionFilter composable)
const {
  manualRange,
  selectedInterval,
  startDate,
  endDate,
  clearManualDates,
  filteredTransactions
} = useTransactionFilter(transactions)

// Kategorien für Einnahmen & Ausgaben
const categories = ref([]);

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
    console.error("Fehler beim Laden der Daten:", err);
  }
});
// Euro String in Zahl umwandeln
function parseEuro(euroString) {
  if (!euroString) return 0;

  let cleaned = euroString.replace(/[^0-9.,]/g, "");
  if (cleaned.includes(".") && cleaned.includes(",")) {
    cleaned = cleaned.replace(/\./g, "");
    cleaned = cleaned.replace(",", ".");
  } else if (cleaned.includes(",")) {
    cleaned = cleaned.replace(",", ".");
  }

  const value = parseFloat(cleaned);
  return isNaN(value) ? 0 : value;
}

// Berechnet den aktuellen Kontostand auf Basis der Transaktionen
const currentBalance = computed(() => {
  const sum = transactions.value.reduce((total, t) => {
    const amount = parseEuro(t.amount);
    if (t.type === "Ausgabe") return total - amount;
    if (t.type === "Einnahme") return total + amount;
    return total; // fallback
  }, 0);

  return sum.toFixed(2).replace(".", ",") + " €";
});

</script>
