<template>
  <div class="p-6 max-w-screen-xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Kontobewegung</h1>
      <CurrentTime />
    </div>

    <!-- Kontostand -->
    <div class="bg-gray-100 text-center text-xl p-4 rounded shadow mb-6">
      Aktueller Kontostand: <strong>{{ currentBalance }}</strong>
    </div>

    <!-- Einnahmen -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <button @click="showIncomeModal = true"
        class="bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-12 rounded shadow
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
            <input v-model="incomeForm.category" type="text" class="border px-2 py-1 rounded w-full" />

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
            <button @click="showIncomeModal = false" class="text-gray-500 hover:text-red-600">Abbrechen</button>
            <button @click="submitIncome" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
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
            <input v-model="expenseForm.purpose" type="text" class="border px-2 py-1 rounded w-full" />

            <label class="block text-sm font-medium">Kategorie</label>
            <input v-model="expenseForm.category" type="text" class="border px-2 py-1 rounded w-full" />

            <label class="block text-sm font-medium">Kommentar</label>
            <textarea v-model="expenseForm.note" class="border px-2 py-1 rounded w-full"></textarea>

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
            <button @click="showExpenseModal = false" class="text-gray-500 hover:text-red-600">Abbrechen</button>
            <button @click="submitExpense" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
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


    <!-- Overview -->
    <div class="bg-white shadow rounded p-4">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold">Übersicht der Kontobewegung</h2>
        <input type="text" v-model="search" placeholder="Suchen..."
          class="border border-gray-300 rounded px-2 py-1 text-sm hover:border-red-500" />
      </div>

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
            <td class="border p-2 text-right" :class="{
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

// Reaktive Zustände und Lifecycle
import { ref, computed, onMounted } from 'vue'
import { useFetch } from '#app'

const search = ref('')
const transactions = ref([])


// später: const userId = 1
onMounted(async () => {
  //später Benutzer hier
  // const { data, error } = await useFetch(`/api/transactions?user_id=${userId}`)
  const { data, error } = await useFetch('/api/transactions')

  if (error.value) {
    console.error('Fehler beim Laden:', error.value)
  } else {
    transactions.value = data.value || []
  }
})

// Suchfilter für Tabelle
const filteredTransactions = computed(() => {
  return transactions.value.filter(t =>
    Object.values(t).some(field =>
      String(field).toLowerCase().includes(search.value.toLowerCase())
    )
  )
})

//Fkt. für aktuellen Kontostand
function parseEuro(euroString) {
  if (!euroString) return 0

  // Entferne alles außer Ziffern, Komma, Punkt (Vorzeichen bewusst NICHT übernehmen)
  let cleaned = euroString.replace(/[^0-9.,]/g, '')

  if (cleaned.includes('.') && cleaned.includes(',')) {
    cleaned = cleaned.replace(/\./g, '') // Tausenderpunkt entfernen
    cleaned = cleaned.replace(',', '.') // Dezimalzeichen anpassen
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.')
  }

  const value = parseFloat(cleaned)
  return isNaN(value) ? 0 : value
}


// Computed: Berechnet aktuellen Kontostand
const currentBalance = computed(() => {
  const sum = transactions.value.reduce((total, t) => {
    const amount = parseEuro(t.amount)
    if (t.type === 'Ausgabe') return total - amount
    if (t.type === 'Einnahme') return total + amount
    return total // fallback, falls Typ fehlt
  }, 0)

  return sum.toFixed(2).replace('.', ',') + ' €'
})


//Modal für Einnahme
const showIncomeModal = ref(false)

const incomeForm = ref({
  amount: '',
  date: '',
  source: '',
  category: '',
  note: '',
  interval: ''
})

function submitIncome() {
  // 👇 Hier später POST an /api/income oder ähnliche API
  console.log('Neue Einnahme:', incomeForm.value)

  // Temporär dem Array hinzufügen:
  transactions.value.push({
    type: 'Einnahme',
    date: incomeForm.value.date,
    time: '—',
    amount: `+${parseFloat(incomeForm.value.amount).toFixed(2)} €`,
    interval: incomeForm.value.interval,
    owner: 'Du', // evtl. dynamisch
    source: incomeForm.value.source,
    purpose: incomeForm.value.source,
    category: incomeForm.value.category,
    comment: incomeForm.value.note
  })

  // Formular zurücksetzen & schließen
  incomeForm.value = {
    amount: '',
    date: '',
    source: '',
    category: '',
    note: '',
    interval: ''
  }
  showIncomeModal.value = false
}

//Modal für Ausgaben
const showExpenseModal = ref(false)

const expenseForm = ref({
  amount: '',
  date: '',
  purpose: '',
  category: '',
  note: '',
  interval: ''
})

function submitExpense() {
  console.log('Neue Ausgabe:', expenseForm.value)

  transactions.value.push({
    type: 'Ausgabe',
    date: expenseForm.value.date,
    time: '—',
    amount: `-${parseFloat(expenseForm.value.amount).toFixed(2)} €`,
    interval: expenseForm.value.interval,
    owner: 'Du',
    source: expenseForm.value.purpose,
    purpose: expenseForm.value.purpose,
    category: expenseForm.value.category,
    comment: expenseForm.value.note
  })

  // Formular leeren & Modal schließen
  expenseForm.value = {
    amount: '',
    date: '',
    purpose: '',
    category: '',
    note: '',
    interval: ''
  }
  showExpenseModal.value = false
}

</script>
