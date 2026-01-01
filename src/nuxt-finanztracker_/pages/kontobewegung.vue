<template>
  <div class="content-wrapper">
    <!-- Inline Alert -->
    <InlineAlert v-if="showAlertBox" :message="alertMessage" :type="alertType" />

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1>Kontobewegung</h1>
      <CurrentTime />
    </div>

    <!-- Aktueller Kontostand -->
    <h2 class="card text-center mb-6 bg-teal-50 dark:bg-gray-800">
      Aktueller Kontostand:
      <strong class="text-teal-600 dark:text-teal-400">{{ currentBalance }}</strong>
    </h2>

    <!-- Aktionen: Einnahmen / Ausgaben / Verwaltung -->

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <!-- Einnahme hinzufügen -->
      <button
        @click="showIncomeModal = true"
        class="bg-teal-100 hover:bg-teal-200 text-teal-700 font-semibold py-12 rounded shadow text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200"
      >
        <i class="fas fa-plus text-4xl"></i>
        <span class="text-lg">Einnahme hinzufügen</span>
      </button>

      <!-- Modal -->
      <div v-if="showIncomeModal" class="modal-overlay">
        <div class="modal-md">
          <h3>Neue Einnahme</h3>

          <div class="grid gap-2">
            <label>Betrag (€)</label>
            <input
              v-model="incomeForm.amount"
              type="number"
              step="0.01"
              class="form-input"
            />

            <label>Datum</label>
            <input v-model="incomeForm.date" type="date" class="form-input" />

            <label>Quelle</label>
            <input v-model="incomeForm.source" type="text" class="form-input" />

            <label>Kategorie</label>
            <select v-model="incomeForm.category" class="form-input">
              <option disabled value="">Bitte wählen</option>
              <option v-for="cat in categories" :value="cat.id" :key="cat.id">
                {{ cat.name }}
              </option>
            </select>

            <label>Kommentar</label>
            <textarea
              v-model="incomeForm.note"
              class="form-textarea"
            ></textarea>

            <label>Zyklus</label>
            <select v-model="incomeForm.interval" class="form-select">
              <option value="once">Einmalig</option>
              <option value="weekly">Wöchentlich</option>
              <option value="monthly">Monatlich</option>
              <option value="semesterly">Semester</option>
              <option value="annual">Jährlich</option>
            </select>
          </div>

          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showIncomeModal = false" class="btn btn-secondary">
              Abbrechen
            </button>
            <button @click="submitIncome" class="btn btn-primary">
              Speichern
            </button>
          </div>
        </div>
      </div>

      <!-- Ausgabe Button -->
      <button
        @click="showExpenseModal = true"
        class="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-12 rounded shadow text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200"
      >
        <i class="fas fa-minus text-4xl"></i>
        <span class="text-lg">Ausgabe hinzufügen</span>
      </button>

      <!-- Modal für Ausgabe -->
      <div v-if="showExpenseModal" class="modal-overlay">
        <div class="modal-md">
          <h3>Neue Ausgabe</h3>

          <div class="grid gap-2">
            <label>Betrag (€)</label>
            <input
              v-model="expenseForm.amount"
              type="number"
              step="0.01"
              class="form-input"
            />

            <label>Datum</label>
            <input v-model="expenseForm.date" type="date" class="form-input" />

            <label>Zweck</label>
            <input v-model="expenseForm.use" type="text" class="form-input" />

            <label>Kategorie</label>
            <select v-model="expenseForm.category" class="form-select">
              <option disabled value="">Bitte wählen</option>
              <option
                v-for="cat in categories.filter((c) => c.type === 'expense')"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>

            <label>Kommentar</label>
            <textarea
              v-model="expenseForm.note"
              class="form-textarea"
            ></textarea>

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
            <button @click="showExpenseModal = false" class="btn btn-secondary">
              Abbrechen
            </button>
            <button @click="submitExpense" class="btn btn-primary">
              Speichern
            </button>
          </div>
        </div>
      </div>

      <!-- Kategorien -->
      <categoryManager />

      <!-- Daueraufträge Button -->
      <button
        @click="showRecurringModal = true"
        class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold py-4 rounded shadow text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition-transform duration-200"
      >
        <i class="fas fa-sync-alt text-4xl"></i>
        <span class="text-lg">Daueraufträge verwalten</span>
      </button>
      <!-- Modal Verwaltung Dauerauftrag -->
      <div v-if="showRecurringModal" class="modal-overlay">
        <div class="modal-lg">
          <h3 class="mb-2">Daueraufträge verwalten</h3>
          <!-- Tabelle:-->
          <!-- css: text-teal-600 dark:text-teal-400': t.type === 'Einnahme',
                'text-red-500 dark:text-red-400': t.type === 'Ausgabe' -->
          <div class="table-container">
            <table v-if="formattedAuftraege.length" class="table dark:text-gray-200">
              <thead class="text-center">
                <tr class="border-b dark:border-gray-700">
                  <th>Name</th>
                  <th>Kategorie</th>
                  <th>Betrag</th>
                  <th>Intervall</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="auftrag in formattedAuftraege" :key="auftrag.id"
                  class="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <td>{{ auftrag.name }}</td>
                  <td>{{ auftrag.categoryName }}</td>
                  <td class="text-left font-medium"
                    :class="auftrag.betrag < 0 ? 'text-red-500 dark:text-red-400' : 'text-teal-600 dark:text-teal-400'">
                    {{ auftrag.betrag.toFixed(2) }}€ <!--Anzeige mit 2 Dezimalstellen-->
                  </td>
                  <td>{{ displayInterval(auftrag.intervall) }}</td> <!-- Intervall auf Deutsch anzeigen -->

                  <td class="space-x-6">
                    <button class="text-teal-600 hover:text-teal-400" @click="openEdit(auftrag)">
                      <i class="fas fa-pen"></i> <!-- Edit-Icon -->
                    </button>
                    <button class="text-red-600 hover:text-red-400"
                      @click="selectedAuftrag = { ...auftrag }; showDeleteConfirm = true">
                      <i class="fas fa-trash"></i> <!-- Lösch-Icon -->
                    </button>
                  </td>

                  <!-- Modal: Dauerauftrag bearbeiten -->
                  <div v-if="showEditModal" class="modal-overlay">
                    <div class="modal-md">
                      <h3>Dauerauftrag bearbeiten</h3>

                      <div class="grid gap-2">
                        <label>Name</label>
                        <input v-model="selectedAuftrag.name" type="text" class="form-input"
                          placeholder="Name / Beschreibung" />

                        <label>Betrag (€)</label>
                        <input v-model="selectedAuftrag.betrag" type="number" step="0.50" class="form-input" />

                        <label>Datum</label>
                        <input v-model="selectedAuftrag.date" type="date" class="form-input" />

                        <label>Kategorie</label>
                        <select v-model="selectedAuftrag.categoryId" class="form-select">
                          <option disabled value="">Bitte wählen</option>
                          <option v-for="cat in categories" :value="cat.id" :key="cat.id">
                            {{ cat.name }}</option>
                        </select>

                        <label>Intervall</label>
                        <select v-model="selectedAuftrag.intervall" class="form-select">
                          <option value="weekly">Wöchentlich</option>
                          <option value="monthly">Monatlich</option>
                          <option value="semesterly">Semesterlich</option>
                          <option value="annual">Jährlich</option>
                        </select>
                      </div>

                      <div class="flex justify-end space-x-2 mt-4">
                        <button @click="showEditModal = false" class="btn btn-secondary">Abbrechen</button>
                        <button @click="saveEdit" class="btn btn-primary">Speichern</button>
                      </div>
                    </div>
                  </div>
                </tr>
              </tbody>
            </table>

            <!-- Bestätigungs-Popup: Dauerauftrag löschen -->
            <div v-if="showDeleteConfirm" class="modal-overlay">
              <div class="modal-md">
                <h3>Verwaltung Dauerauftrag</h3>
                <p class="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                  Wollen Sie den Dauerauftrag
                  <span
                    class="font-semibold text-brand-600 dark:text-brand-400"
                  >
                    {{ selectedAuftrag?.name }}
                  </span>
                  wirklich löschen?
                </p>
                <div class="flex justify-center space-x-4 mt-2">
                  <button @click="deleteAuftrag" class="btn btn-danger">Löschen</button>
                  <button @click="showDeleteConfirm = false" class="btn btn-secondary">Abbrechen</button>
                </div>
              </div>
            </div>

            <!-- Fallback anzeigen, wenn keine Einträge -->
            <div v-if="!formattedAuftraege.length" class="modal-md text-center">
              Keine Daueraufträge vorhanden.
            </div>
          </div>

          <!-- Button: schließen // danach vllt auch Button: Speichern dazu?-->
          <div class="flex justify-end mt-6">
            <button
              @click="showRecurringModal = false"
              class="btn btn-secondary"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Übersicht der Kontobewegung -->
    <bewegungstabelle :transactions="transactions" @edit="handleEdit" @delete="handleDelete" />

    <!-- Modal für Bearbeiten/Löschen -->
    <bewegungstabelle_aktion v-if="showActionModal" :item="selectedTransaction" :mode="actionMode"
      :categories="categories" @save-edit="saveTransactionEdit" @confirm-delete="confirmDeleteTransaction"
      @close="closeActionModal" />
  </div> <!-- Ende von content-wrapper -->
</template>

<script setup>
//Imports
import { ref, computed, onMounted } from 'vue'
import { useFetch } from '#app'


definePageMeta({
  middleware: 'auth' // Auth-Middleware für diese Seite
})


//Reaktive Daten

// Alert handling, erfolgreich oder fehlerhaft
const { showAlertBox, alertMessage, alertType, showAlert } = useAlert();

// Suchfeld für die Tabelle (nicht sichtbar in Template, aber vorbereitet)

const search = ref('')

// Alle Transaktionen (Einnahmen & Ausgaben)
const transactions = ref([]);

// Kategorien für Einnahmen & Ausgaben
const categories = ref([]);

// Modalsteuerung für Einnahme & Ausgabe
const showIncomeModal = ref(false);
const showExpenseModal = ref(false);

// Modalsteuerung für Daueraufträge  ----NEU----
const showRecurringModal = ref(false);
const showEditModal = ref(false); // Modal zum Bearbeiten eines Dauerauftrags
const showDeleteConfirm = ref(false); // Bestätigungsmodal für das Löschen eines Dauerauftrags
const selectedAuftrag = ref(null); // Der aktuell ausgewählte Dauerauftrag zum Bearbeiten/Löschen

// Modal für Transaktionen bearbeiten/löschen
const showActionModal = ref(false)
const selectedTransaction = ref(null)
const actionMode = ref('') // 'edit' or 'delete'

// Funktion zum Öffnen des Edit-Modals mit den Daten des ausgewählten Auftrags
function openEdit(auftrag) {
  selectedAuftrag.value = {
    id: auftrag.id,
    recordType: auftrag.recordType,
    name: auftrag.name,
    betrag: Math.abs(auftrag.betrag),
    intervall: auftrag.intervall,
    categoryId: auftrag.categoryId, //  ID der Kategorie von ausgewähltem Auftrag
    categoryName: auftrag.categoryName,
    note: auftrag.note ?? "",
    date: auftrag.date, //  Datum des Auftrags
  };

  showEditModal.value = true;
}

// Formular-Daten für Einnahmen
const incomeForm = ref({
  amount: "",
  date: "",
  source: "",
  category: "",
  note: "",
  interval: "",
});

// Formular-Daten für Ausgaben
const expenseForm = ref({
  amount: '',
  date: '',
  purpose: '',
  category: '',
  note: '',
  interval: ''
})

// user wird über Supabase Auth bereitgestellt
const user = await useSupabaseUser()

//Lifecycle Hook zum Laden von Kategorien & Transaktionen

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
    const catData = await $fetch(`/api/categories`)
    
    // categories setzen
    categories.value = catData || []

    // Lade kombinierte Transaktionen mit userId query (wichtig für Backend)
    const transData = await $fetch(`/api/transactions`)
    
    transactions.value = transData || []

  } catch (err) {
    console.error("Fehler beim Laden der Daten:", err);
  }
});

//Hilfsfunktionen & Computed Properties

// Filtert die Transaktionen anhand der Suchanfrage
const filteredTransactions = computed(() => {
  return transactions.value.filter((t) =>
    Object.values(t).some((field) =>
      String(field).toLowerCase().includes(search.value.toLowerCase())
    )
  );
});

// Daueraufträge = alle Transaktionen, deren Intervall NICHT "once" ist
const auftraege = computed(() => {
  return transactions.value.filter(t =>
    t.interval && t.interval !== 'once'
  )
})

// Formatiert Daueraufträge für die Tabelle
const formattedAuftraege = computed(() =>
  auftraege.value.map((a) => {
    // Parse amount string to float
    const val = parseFloat(String(a.amount).replace(/[^0-9.-]/g, "")) || 0;

    return {
      id: a.id,
      recordType: a.recordType, // income oder expense
      type: a.type, // Einnahme oder Ausgabe
      name: a.purpose || a.source || a.use || "—",
      categoryName: a.categoryName || "—",
      categoryId: a.categoryId ?? null, // Kategorie-ID
      intervall: a.interval,
      betrag: val,
      note: a.note || "",
      date: a.date,
    };
  })
);

// Konvertiert einen Euro-String ("1.234,56 €") in eine Float-Zahl (1234.56)
function parseEuro(euroString) {
  if (!euroString) return 0;

  let cleaned = euroString.replace(/[^0-9.,]/g, ""); // Entfernt Symbole
  if (cleaned.includes(".") && cleaned.includes(",")) {
    cleaned = cleaned.replace(/\./g, ""); // Punkt = Tausendertrennzeichen → entfernen
    cleaned = cleaned.replace(",", "."); // Komma = Dezimaltrennzeichen → umwandeln
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

  // Gibt Wert formatiert als z.B. "123,45 €" zurück
  return sum.toFixed(2).replace(".", ",") + " €";
});

//Modal-Handling & Form-Submit

// Einnahme speichern — POST an /api/incomes (plural)
async function submitIncome() {

  //console.log("Aktueller User beim Senden:", user.value);

 
  if (!user.value || !user.value.id) {
    alert("Fehler: Benutzer nicht geladen. Bitte Seite neu laden.");
    return;
  }


  try {
    const res = await $fetch("/api/incomes", {
      method: "POST",
      body: {
        amount: incomeForm.value.amount,
        date: incomeForm.value.date,
        source: incomeForm.value.source,
        categoryId: incomeForm.value.category,
        note: incomeForm.value.note,
        interval: incomeForm.value.interval,
        userId: user.value.id
      }
    })

    const newTransaction = {
      type: "Einnahme",
      date: incomeForm.value.date,
      time: "—",
      amount: `+${parseFloat(incomeForm.value.amount).toFixed(2)} €`,
      interval: incomeForm.value.interval,
      owner: "Du",
      //alt: category: categories.value.find(c => c.id == incomeForm.value.category)?.name ?? '',
      categoryName:
        categories.value.find((c) => c.id == incomeForm.value.category)?.name ??
        "",
      categoryId: Number(incomeForm.value.category),
      //
      source: incomeForm.value.source,
      note: incomeForm.value.note,
    };

    //  Immutable Update, kein push mehr
    transactions.value = [...transactions.value, newTransaction];

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
    showAlert("Einnahme wurde erfolgreich gespeichert!"
      , "success")
  } catch (err) {
    console.error("Fehler beim Speichern der Einnahme:", err);
    showAlert("Fehler beim Speichern der Einnahme", "error");
  }
}

// Ausgabe speichern — POST an /api/expenses (plural)
async function submitExpense() {
  try {
    const res = await $fetch("/api/expenses", {
      method: "POST",
      body: {
        amount: expenseForm.value.amount,
        date: expenseForm.value.date,
        use: expenseForm.value.use,
        categoryId: expenseForm.value.category,
        note: expenseForm.value.note,
        interval: expenseForm.value.interval,
        userId: user.value.id
      }
    })

    const newTransaction = {
      type: "Ausgabe",
      date: expenseForm.value.date,
      time: "—",
      amount: `-${parseFloat(expenseForm.value.amount).toFixed(2)} €`,
      interval: expenseForm.value.interval,
      owner: "Du",
      //alt: category: categories.value.find(c => c.id == expenseForm.value.category)?.name ?? '',
      categoryName:
        categories.value.find((c) => c.id == expenseForm.value.category)
          ?.name ?? "",
      categoryId: Number(expenseForm.value.category),
      //
      use: expenseForm.value.use,
      note: expenseForm.value.note,
    };

    // Immutable Update, kein push mehr
    transactions.value = [...transactions.value, newTransaction];

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
    showAlert("Ausgabe wurde erfolgreich gespeichert!", "success")
  } catch (err) {
    console.error("Fehler beim Speichern der Ausgabe:", err);
    showAlert("Fehler beim Speichern der Ausgabe", "error");
  }
}

// Dauerauftrag bearbeiten & in DB speichern
async function saveEdit() {
  if (!selectedAuftrag.value) return;

  try {
    const a = selectedAuftrag.value;

    // Kategorie anhand ID suchen
    const cat = categories.value.find((c) => c.id === a.categoryId);
    if (!a.categoryId) {
      showAlert("Kategorie fehlt", "error");
      return;
    }

    // API Endpunkt bestimmen
    const baseUrl =
      a.recordType === "income"
        ? `/api/incomes/${a.id}`
        : `/api/expenses/${a.id}`;

    // Payload korrekt bauen
    const payload =
      a.recordType === "income"
        ? { // für Einnahme
          amount: Number(a.betrag),
          interval: a.intervall,
          note: a.note || "",
          categoryId: cat.id,
          date: a.date,
          source: a.name
        }
        : { // für Ausgabe
          amount: Number(a.betrag),
          interval: a.intervall,
          note: a.note || "",
          categoryId: cat.id,
          date: a.date,
          use: a.name
        };

    // 4) Sende PUT Anfrage
    await $fetch(baseUrl, {
      method: "PUT",
      body: payload,
    });

    // Aktualisierte Transaktionen neu laden
    const transData = await $fetch("/api/transactions");
    transactions.value = transData || [];

    // schließen & reset
    showEditModal.value = false;
    selectedAuftrag.value = null;

    showAlert("Dauerauftrag wurde erfolgreich aktualisiert!", "success");
  } catch (err) {
    console.error(err);
    showAlert("Fehler beim Aktualisieren des Dauerauftrags", "error");
  }
}

// löscht den ausgewählten Dauerauftrag (auch in DB)
async function deleteAuftrag() {
  if (!selectedAuftrag.value) return;

  try {
    const a = selectedAuftrag.value;

    const baseUrl =
      a.recordType === "income"
        ? `/api/incomes/${a.id}`
        : `/api/expenses/${a.id}`;

    await $fetch(baseUrl, {
      method: "DELETE",
    });

    const updated = await $fetch('/api/transactions');
    transactions.value = updated || []

    showDeleteConfirm.value = false
    selectedAuftrag.value = null
    showAlert("Dauerauftrag wurde erfolgreich gelöscht", "success")

    showDeleteConfirm.value = false;
    selectedAuftrag.value = null;
    showAlert("Dauerauftrag gelöscht", "success");
  } catch (err) {
    console.error(err);
    showAlert("Fehler beim Löschen des Dauerauftrags", "error");
  }
}

// Handler für Bearbeiten einer Transaktion
function handleEdit(transaction) {
  const raw = Number(
    String(transaction.amount).replace(/[^0-9.-]/g, "")
  )

  selectedTransaction.value = {
    ...transaction,
    amount: isNaN(raw) ? null : Math.abs(raw)
  }

  actionMode.value = "edit"
  showActionModal.value = true
}



// Handler für Löschen einer Transaktion
function handleDelete(transactionId) {
  const transaction = transactions.value.find(t => t.id === transactionId)
  if (transaction) {
    selectedTransaction.value = { ...transaction }
    actionMode.value = 'delete'
    showActionModal.value = true
  }
}

// Speichern der bearbeiteten Transaktion
async function saveTransactionEdit(updatedTransaction) {
  try {
    const original = selectedTransaction.value
    const isIncome = original.type === 'Einnahme'
    const baseUrl = isIncome ? `/api/incomes/${original.id}` : `/api/expenses/${original.id}`

    // Bereite den Payload vor
    const payload = {
      amount: Number(updatedTransaction.amount), // Sicherstellen, dass es eine Zahl ist (positive Zahl)
      type: updatedTransaction.type, // Einnahme oder Ausgabe
      date: updatedTransaction.date,
      interval: updatedTransaction.interval,
      note: updatedTransaction.comment || '',
      categoryId: updatedTransaction.categoryId,
      userId: user.value.id
    }

    if (isIncome) {
      payload.source = updatedTransaction.purpose || original.source
    } else {
      payload.use = updatedTransaction.purpose || original.use
    }

    await $fetch(baseUrl, {
      method: 'PUT',
      body: payload
    })

    // Transaktionen neu laden
    const transData = await $fetch('/api/transactions')
    transactions.value = transData || []

    closeActionModal()
    showAlert("Transaktion wurde erfolgreich aktualisiert!", "success")
  } catch (err) {
    console.error('Fehler beim Aktualisieren der Transaktion:', err)
    showAlert('Fehler beim Aktualisieren der Transaktion', 'error')
  }
}

// Bestätigen des Löschens einer Transaktion
async function confirmDeleteTransaction() {
  try {
    const transaction = selectedTransaction.value
    const isIncome = transaction.type === 'Einnahme'
    const baseUrl = isIncome ? `/api/incomes/${transaction.id}` : `/api/expenses/${transaction.id}`

    await $fetch(baseUrl, {
      method: 'DELETE'
    })

    // Transaktionen neu laden
    const transData = await $fetch('/api/transactions')
    transactions.value = transData || []

    closeActionModal()
    showAlert("Transaktion wurde erfolgreich gelöscht!", "success")
  } catch (err) {
    console.error('Fehler beim Löschen der Transaktion:', err)
    showAlert('Fehler beim Löschen der Transaktion', 'error')
  }
}

// Schließen des Action Modals
function closeActionModal() {
  showActionModal.value = false
  selectedTransaction.value = null
  actionMode.value = ''
}

// Hilfsfunktion Intervall auf Deutsch umwandeln bzw. anzeigen
function displayInterval(interval) {
  if (interval === "once") return "Einmalig"
  if (interval === "weekly") return "Wöchentlich"
  if (interval === "monthly") return "Monatlich"
  if (interval === "semesterly") return "Semester"
  if (interval === "annual") return "Jährlich"
  return interval
}

</script>
