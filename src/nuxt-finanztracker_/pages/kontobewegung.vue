<template>
  <div class="content-wrapper">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-brand-600 dark:text-brand-300">Kontobewegung</h1>
      <CurrentTime />
    </div>

    <!-- Aktueller Kontostand -->
    <div class="card text-center text-xl font-semibold mb-6 bg-teal-50 dark:bg-gray-800">
      Aktueller Kontostand:
      <strong class="text-teal-600 dark:text-teal-400">{{ currentBalance }}</strong>
    </div>

    <!-- Aktionen: Einnahmen / Ausgaben / Verwaltung -->

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <!-- Einnahme hinzufügen -->
      <button @click="showIncomeModal = true"
        class="bg-teal-100 hover:bg-teal-200 text-teal-700 font-semibold py-12 rounded shadow
               text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200">
        <i class="fas fa-plus text-4xl"></i>
        <span class="text-lg">Einnahme hinzufügen</span>
      </button>

      <!-- Modal -->
      <div v-if="showIncomeModal" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 relative">
          <h2 class="text-xl font-bold">Neue Einnahme</h2>

          <div class="grid gap-2">
            <label class="block text-sm font-medium">Betrag (€)</label>
            <input v-model="incomeForm.amount" type="number" step="0.01" class="border px-2 py-1 rounded w-full" />

            <label class="block text-sm font-medium">Datum</label>
            <input v-model="incomeForm.date" type="date" class="border px-2 py-1 rounded w-full" />

            <label class="block text-sm font-medium">Quelle</label>
            <input v-model="incomeForm.source" type="text" class="border px-2 py-1 rounded w-full" />

            <label class="block text-sm font-medium">Kategorie</label>
            <select v-model="incomeForm.category" class="border px-2 py-1 rounded w-full">
              <option disabled value="">Bitte wählen</option>
              <option v-for="cat in categories.filter(c => c.type === 'income')" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>


            <label class="block text-sm font-medium">Kommentar</label>
            <textarea v-model="incomeForm.note" class="border px-2 py-1 rounded w-full"></textarea>

            <label class="block text-sm font-medium">Zyklus</label>
            <select v-model="incomeForm.interval" class="border px-2 py-1 rounded w-full">
              <option value="once">Einmalig</option>
              <option value="weekly">Wöchendlich</option>
              <option value="monthly">Monatlich</option>
              <option value="semesterly">Semester</option>
              <option value="annual">Jährlich</option>
            </select>
          </div>

          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showIncomeModal = false" class="text-gray-500 hover:text-blue-700">Abbrechen</button>
            <button @click="submitIncome" class="px-4 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-700">
              Speichern
            </button>
          </div>
        </div>
      </div>

      <!-- Ausgabe Button ersetzt NuxtLink -->
      <button @click="showExpenseModal = true"
        class="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-12 rounded shadow
         text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200">
        <i class="fas fa-minus text-4xl"></i>
        <span class="text-lg">Ausgabe hinzufügen</span>
      </button>

      <!-- Modal für Ausgabe -->
      <div v-if="showExpenseModal" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 relative">
          <h2 class="text-xl font-bold">Neue Ausgabe</h2>

          <div class="grid gap-2">
            <label class="block text-sm font-medium">Betrag (€)</label>
            <input v-model="expenseForm.amount" type="number" step="0.01" class="border px-2 py-1 rounded w-full" />

            <label class="block text-sm font-medium">Datum</label>
            <input v-model="expenseForm.date" type="date" class="border px-2 py-1 rounded w-full" />

            <label class="block text-sm font-medium">Zweck</label>
            <input v-model="expenseForm.use" type="text" class="border px-2 py-1 rounded w-full" />

            <label class="block text-sm font-medium">Kategorie</label>
            <select v-model="expenseForm.category" class="border px-2 py-1 rounded w-full">
              <option disabled value="">Bitte wählen</option>
              <option v-for="cat in categories.filter(c => c.type === 'expense')" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>


            <label class="block text-sm font-medium">Kommentar</label>
            <textarea v-model="expenseForm.note" class="border px-2 py-1 rounded w-full"></textarea>

            <label class="block text-sm font-medium">Zyklus</label>
            <select v-model="expenseForm.interval" class="border px-2 py-1 rounded w-full">
              <option value="once">Einmalig</option>
              <option value="weekly">Wöchendlich</option>
              <option value="monthly">Monatlich</option>
              <option value="semesterly">Semester</option>
              <option value="annual">Jährlich</option>
            </select>
          </div>

          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showExpenseModal = false" class="text-gray-500 hover:text-blue-700">Abbrechen</button>
            <button @click="submitExpense" class="px-4 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-700">
              Speichern
            </button>
          </div>
        </div>
      </div>

      <!-- Kategorien -->
      <NuxtLink to="/kategorien"
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-4 rounded shadow
           text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200">
        <span class="text-lg">Kategorien verwalten</span>
      </NuxtLink>

      <!-- Daueraufträge -->
      <NuxtLink to="/dauerauftraege"
        class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold py-4 rounded shadow
           text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200">
        <span class="text-lg">Daueraufträge verwalten</span>
      </NuxtLink>
    </div>

    <!-- Übersicht der Kontobewegung -->
    <bewegungstabelle :transactions="transactions" /> <!-- Importiere die Komponente bewegungstabelle.vue -->
  </div>
</template>


<script setup>
//Imports
import { ref, computed, onMounted } from 'vue'
import { useFetch } from '#app' // optional

//Reaktive Daten

// Suchfeld für die Tabelle (nicht sichtbar in Template, aber vorbereitet)
const search = ref('')

// Alle Transaktionen (Einnahmen & Ausgaben)
const transactions = ref([])

// Kategorien für Einnahmen & Ausgaben
const categories = ref([])

// Modalsteuerung für Einnahme & Ausgabe
const showIncomeModal = ref(false)
const showExpenseModal = ref(false)

// Formular-Daten für Einnahmen
const incomeForm = ref({
  amount: '',
  date: '',
  source: '',
  category: '',
  note: '',
  interval: ''
})

// Formular-Daten für Ausgaben
const expenseForm = ref({
  amount: '',
  date: '',
  purpose: '',
  category: '',
  note: '',
  interval: ''
})

//Lifecycle Hook zum Laden von Kategorien & Transaktionen

onMounted(async () => {
  try {
    // Kategorien (falls backend userId braucht, ergänzen)
    const catData = await $fetch('/api/categories?userId=1')
    categories.value = catData || []

    // Lade kombinierte Transaktionen mit userId query (wichtig für Backend)
    const transData = await $fetch('/api/transactions?userId=1')
    transactions.value = transData || []
  } catch (err) {
    console.error('Fehler beim Laden der Daten:', err)
  }
})


//Hilfsfunktionen & Computed Properties

// Filtert die Transaktionen anhand der Suchanfrage
const filteredTransactions = computed(() => {
  return transactions.value.filter(t =>
    Object.values(t).some(field =>
      String(field).toLowerCase().includes(search.value.toLowerCase())
    )
  )
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

//Modal-Handling & Form-Submit

// Einnahme speichern — POST an /api/incomes (plural)
async function submitIncome() {
  try {
    const res = await $fetch('/api/incomes', {
      method: 'POST',
      body: {
        amount: incomeForm.value.amount,
        date: incomeForm.value.date,
        source: incomeForm.value.source,
        categoryId: incomeForm.value.category,
        note: incomeForm.value.note,
        interval: incomeForm.value.interval,
        userId: 1
      }
    })

    const newTransaction = {
      type: 'Einnahme',
      date: incomeForm.value.date,
      time: '—',
      amount: `+${parseFloat(incomeForm.value.amount).toFixed(2)} €`,
      interval: incomeForm.value.interval,
      owner: 'Du',
      category: categories.value.find(c => c.id == incomeForm.value.category)?.name ?? '',
      source: incomeForm.value.source,
      note: incomeForm.value.note
    }

    //  Immutable Update, kein push mehr
    transactions.value = [...transactions.value, newTransaction]

    // Reset + Modal schließen
    incomeForm.value = {
      amount: '',
      date: '',
      source: '',
      category: '',
      note: '',
      interval: ''
    }
    showIncomeModal.value = false
  } catch (err) {
    console.error('Fehler beim Speichern:', err)
  }
}

// Ausgabe speichern — POST an /api/expenses (plural)
async function submitExpense() {
  try {
    const res = await $fetch('/api/expenses', {
      method: 'POST',
      body: {
        amount: expenseForm.value.amount,
        date: expenseForm.value.date,
        use: expenseForm.value.use,
        categoryId: expenseForm.value.category,
        note: expenseForm.value.note,
        interval: expenseForm.value.interval,
        userId: 1
      }
    })

    const newTransaction = {
      type: 'Ausgabe',
      date: expenseForm.value.date,
      time: '—',
      amount: `-${parseFloat(expenseForm.value.amount).toFixed(2)} €`,
      interval: expenseForm.value.interval,
      owner: 'Du',
      category: categories.value.find(c => c.id == expenseForm.value.category)?.name ?? '',
      use: expenseForm.value.use,
      note: expenseForm.value.note
    }

    // Immutable Update, kein push mehr
    transactions.value = [...transactions.value, newTransaction]

    // Reset + Modal schließen
    expenseForm.value = {
      amount: '',
      date: '',
      use: '',
      category: '',
      note: '',
      interval: ''
    }
    showExpenseModal.value = false
  } catch (err) {
    console.error('Fehler beim Speichern der Ausgabe:', err)
  }
}
</script>
