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
          <h2 class="text-2xl font-bold text-brand-600 dark:text-brand-600">Neue Einnahme</h2>

          <div class="grid gap-2">
            <label>Betrag (€)</label>
            <input v-model="incomeForm.amount" type="number" step="0.01" class="form-input" />

            <label>Datum</label>
            <input v-model="incomeForm.date" type="date" class="form-input" />

            <label>Quelle</label>
            <input v-model="incomeForm.source" type="text" class="form-input" />

            <label>Kategorie</label>
            <select v-model="incomeForm.category" class="form-input">
              <option disabled value="">Bitte wählen</option>
              <option v-for="cat in categories.filter(c => c.type === 'income')" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>


            <label>Kommentar</label>
            <textarea v-model="incomeForm.note" class="form-textarea"></textarea>

            <label>Zyklus</label>
            <select v-model="incomeForm.interval" class="form-select">
              <option value="once">Einmalig</option>
              <option value="weekly">Wöchendlich</option>
              <option value="monthly">Monatlich</option>
              <option value="semesterly">Semester</option>
              <option value="annual">Jährlich</option>
            </select>
          </div>

          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showIncomeModal = false" class="btn btn-secondary">Abbrechen</button>
            <button @click="submitIncome" class="btn btn-primary">
              Speichern
            </button>
          </div>
        </div>
      </div>

      <!-- Ausgabe Button -->
      <button @click="showExpenseModal = true"
        class="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-12 rounded shadow
         text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200">
        <i class="fas fa-minus text-4xl"></i>
        <span class="text-lg">Ausgabe hinzufügen</span>
      </button>

      <!-- Modal für Ausgabe -->
      <div v-if="showExpenseModal" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 relative">
          <h2 class="text-2xl font-bold text-brand-600 dark:text-brand-600">Neue Ausgabe</h2>

          <div class="grid gap-2">
            <label>Betrag (€)</label>
            <input v-model="expenseForm.amount" type="number" step="0.01" class="form-input" />

            <label>Datum</label>
            <input v-model="expenseForm.date" type="date" class="form-input" />

            <label>Zweck</label>
            <input v-model="expenseForm.use" type="text" class="form-input" />

            <label>Kategorie</label>
            <select v-model="expenseForm.category" class="form-select">
              <option disabled value="">Bitte wählen</option>
              <option v-for="cat in categories.filter(c => c.type === 'expense')" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>


            <label>Kommentar</label>
            <textarea v-model="expenseForm.note" class="form-textarea"></textarea>

            <label>Zyklus</label>
            <select v-model="expenseForm.interval" class="form-select">
              <option value="once">Einmalig</option>
              <option value="weekly">Wöchendlich</option>
              <option value="monthly">Monatlich</option>
              <option value="semesterly">Semester</option>
              <option value="annual">Jährlich</option>
            </select>
          </div>

          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showExpenseModal = false" class="btn btn-secondary">Abbrechen</button>
            <button @click="submitExpense" class="btn btn-primary">
              Speichern
            </button>
          </div>
        </div>
      </div>

      <!-- Kategorien -->
      <NuxtLink to="/kategorien"
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-4 rounded shadow
           text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200">
          <i class="fas fa-tags text-4xl"></i>
          <span class="text-lg">Kategorien verwalten</span>
      </NuxtLink>

      <!-- Daueraufträge Button -->
      <button @click="showRecurringModal = true"
        class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold py-4 rounded shadow
           text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200">
        <i class="fas fa-sync-alt text-4xl"></i>
        <span class="text-lg">Daueraufträge verwalten</span>
      </button>
       <!-- Modal Verwaltung Dauerauftrag -->
      <div v-if="showRecurringModal" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-4xl space-y-4 relative transition-theme">
          <h2 class="text-2xl font-bold text-brand-600 dark:text-brand-600">Daueraufträge verwalten</h2>
          <!-- Tabelle:-->
                <!-- css: text-teal-600 dark:text-teal-400': t.type === 'Einnahme',
                'text-red-500 dark:text-red-400': t.type === 'Ausgabe' -->
          <div class="table-container">
            <table v-if="formattedAuftraege.length" class="table dark:text-gray-700">
              <thead class="text-center">
                <tr class="dark:text-gray-100">
                  <th>Name</th>
                  <th>Kategorie</th>
                  <th>Betrag</th>
                  <th>Intervall</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="auftrag in formattedAuftraege" :key="auftrag.id" class="hover:bg-gray-100">
                  <td>{{ auftrag.name }}</td>
                  <td>{{ auftrag.kategorie }}</td>
                  <td
                    class="text-left"
                    :class="auftrag.betrag < 0 ? 'text-red-500 dark:text-red-400' : 'text-teal-600 dark:text-teal-400'"
                  >
                    {{ auftrag.betrag.toFixed(2) }}€  <!--Anzeige mit 2 Dezimalstellen-->
                  </td>
                  <td>{{ auftrag.intervall }}</td>
                  <td class="space-x-6">
                    <button
                      class="text-teal-600 hover:text-teal-400 transform hover:scale-150 transition"
                      @click="selectedAuftrag = { ...auftrag }; showEditModal = true" 
                      >
                      <i class="fas fa-pen"></i> <!-- Edit-Icon -->
                    </button>
                    <button
                      class="text-gray-700 hover:text-red-500 transform hover:scale-150 transition"
                      @click="selectedAuftrag = auftrag; showDeleteConfirm = true"
                    >
                      <i class="fas fa-trash"></i> <!-- Lösch-Icon -->
                    </button>
                  </td>

                    <!-- Modal: Dauerauftrag bearbeiten -->
                      <div v-if="showEditModal" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[90%] max-w-md space-y-4 relative">
                          <h2 class="text-2xl font-bold text-brand-600 dark:text-brand-400">Dauerauftrag bearbeiten</h2>

                          <div class="grid gap-2">
                            <label>Name</label>
                            <input v-model="selectedAuftrag.name" type="text" class="form-input" placeholder="Name / Beschreibung" />

                            <label>Betrag (€)</label>
                            <input v-model="selectedAuftrag.betrag" type="number" step="0.50" class="form-input" /> 

                            <label>Kategorie</label> 
                            <select v-model="selectedAuftrag.kategorie" class="form-select">
                              <option disabled value="">Bitte wählen</option>
                              <option>Miete</option>
                              <option>Einnahme</option>
                              <option>Versicherung</option>
                            </select>

                            <label>Intervall</label>
                            <select v-model="selectedAuftrag.intervall" class="form-select">
                              <option value="weekly">W - Wöchentlich</option>
                              <option value="monthly">M - Monatlich</option>
                              <option value="semesterly">S - Semesterlich</option>
                              <option value="annual">Y - Jährlich</option>
                            </select>
                          </div>

                          <div class="flex justify-end space-x-2 mt-4">
                            <button @click="showEditModal = false" class="btn btn-secondary">Abbrechen</button>
                            <button @click="saveEdit" class="btn btn-primary">Speichern</button>
                          </div>
                        </div>
                      </div>

                  
                    <!-- Bestätigungs-Popup: Dauerauftrag löschen -->
                    <div v-if="showDeleteConfirm"
                    class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-4xl space-y-4 relative transition-theme">
                        <h2 class="text-2xl font-bold text-brand-600 dark:text-brand-600">Verwaltung Dauerauftrag</h2>
                        <p class="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                          Wollen Sie den Dauerauftrag
                          <span class="font-semibold text-brand-600 dark:text-brand-400">
                            {{ selectedAuftrag?.name }}
                          </span> wirklich löschen?
                        </p>
                        <div class="flex justify-center space-x-4">
                          <button @click="deleteAuftrag" class="btn btn-danger">Löschen</button>
                          <button @click="showDeleteConfirm = false"class="btn btn-secondary">Zurück</button>
                        </div>
                      </div>
                    </div>
                </tr>
              </tbody>
            </table>

            <!-- Fallback anzeigen, wenn keine Einträge -->
            <div v-else class="p-6 text-center text-gray-600">
              Keine Daueraufträge vorhanden.
            </div>
          </div>

          <!--Button: Kategorie hinzufügen -->
          <div class="flex justify-center mt-2">
            <button class="btn btn-secondary flex items-center space-x-2">
              <i class="fas fa-plus-circle text-lg"></i> <!-- Icon -->
              <span>Kategorie hinzufügen</span>
            </button>
          </div>

          <!-- Button: schließen // danach vllt auch Button: Speichern dazu?-->
          <div class="flex justify-end mt-6">
            <button @click="showRecurringModal = false" class="btn btn-primary">
              Schließen
            </button>
          </div>
        </div>
      </div> 
    </div>

    <!-- Übersicht der Kontobewegung -->
    <bewegungstabelle :transactions="transactions" />
  </div> <!-- Ende von content-wrapper -->
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

// Daueraufträge (echte Daten von DB)
const auftraege = ref([])

// Modalsteuerung für Einnahme & Ausgabe
const showIncomeModal = ref(false)
const showExpenseModal = ref(false)

// Modalsteuerung für Daueraufträge  ----NEU----
const showRecurringModal = ref(false)
const showEditModal = ref(false) // Modal zum Bearbeiten eines Dauerauftrags
const showDeleteConfirm = ref(false) // Bestätigungsmodal für das Löschen eines Dauerauftrags
const selectedAuftrag = ref(null) // Der aktuell ausgewählte Dauerauftrag zum Bearbeiten/Löschen

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

    // Lade Daueraufträge (echt aus DB)
    const recurringData = await $fetch('/api/transactions?type=recurring')
    auftraege.value = recurringData || []

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

// Mapping für Daueraufträge (nur Anzeige in Tabelle)
const formattedAuftraege = computed(() => {
  if (!auftraege.value.length) return []

  return auftraege.value.map(a => ({
    id: a.id,
    
    // Name: Einnahme → a.source | Ausgabe → a.use | fallback
    name: a.purpose || a.source || a.use || '—',

    // Kategorie
    kategorie: a.category || '—',

    // Betrag: chuyển "+120.00 €" | "-80.00 €" → số
    betrag: Number(
      (a.amount || '0')
        .replace('€', '')
        .replace('+', '')
        .replace('-', '')
        .replace(',', '.')
    ) * (a.type === 'Ausgabe' ? -1 : 1),

    // Interval 
    intervall: a.interval
  }))
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

// löscht den ausgewählten Dauerauftrag
function deleteAuftrag() {
  auftraege.value = auftraege.value.filter(a => a.id !== selectedAuftrag.value.id)
  showDeleteConfirm.value = false
  selectedAuftrag.value = null
}
</script>
