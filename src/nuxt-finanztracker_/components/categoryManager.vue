<template>
  <!-- Inline Alert -->
  <InlineAlert v-if="showAlertBox" :message="alertMessage" :type="alertType" />

  <!-- Main Button to Open Modal -->
  <button @click="showModal = true" class="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-4 rounded shadow
           text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition">
    <i class="fas fa-tags text-4xl"></i>
    <span class="text-lg">Kategorien verwalten</span>
  </button>

  <!-- Modal: Kategorien verwalten -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-lg">

      <!-- Header -->
      <h3 class="mb-2">Kategorien verwalten</h3>

      <!-- Table -->
      <table class="table dark:text-gray-200">
        <thead class="text-center">
          <tr class="border-b dark:border-gray-700">
            <th>Name</th>
            <th>Typ</th>
            <th>Aktionen</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="cat in categories" :key="cat.id" class="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <td>{{ cat.name }}</td>

            <!--displayType Funktion: zeigt Ausnahme/Einnnahme -->
            <td>
              <div class="flex items-center gap-2">
                <i :class="cat.type === 'income'
                  ? 'fa-solid fa-circle-plus text-brand-500'
                  : 'fa-solid fa-circle-minus text-red-500'"></i>
                <span>
                  {{ displayType(cat.type) }}
                </span>

              </div>
            </td>

            <td class="space-x-4">
              <button class="text-teal-600 hover:text-teal-400" @click="openEdit(cat)">
                <i class="fas fa-pen"></i>
              </button>

              <button class="text-red-600 hover:text-red-400" @click="openDelete(cat)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Add Button -->
      <div class="flex justify-center mt-4">
        <button @click="showAdd = true" class="btn btn-primary flex items-center space-x-2">
          <i class="fas fa-plus-circle"></i>
          <span>Kategorie hinzufügen</span>
        </button>
      </div>

      <!-- Close -->
      <div class="flex justify-end">
        <button @click="closeAll" class="btn btn-secondary">Schließen</button>
      </div>
    </div>
  </div>

  <!-- Modal: Add Category -->
  <div v-if="showAdd" class="modal-overlay">
    <div class="modal-md">
      <h3>Neue Kategorie</h3>

      <div class="grid gap-2">
        <label>Name</label>
        <input v-model="form.name" class="form-input" />

        <label>Typ</label>
        <select v-model="form.type" class="form-input">
          <option value="income">Einnahme</option>
          <option value="expense">Ausgabe</option>
        </select>

      </div>

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="showAdd = false" class="btn btn-secondary">Abbrechen</button>
        <button @click="createCategory" class="btn btn-primary">Speichern</button>
      </div>
    </div>
  </div>

  <!-- Modal: Edit Category - Bearbeiten -->
  <div v-if="showEdit" class="modal-overlay">
    <div class="modal-md">

      <h3>Kategorie bearbeiten</h3>

      <div class="grid gap-2">
        <label>Name</label>
        <input v-model="selected.name" class="form-input" />

        <label>Typ</label>
        <select v-model="selected.type" class="form-input">
          <option value="income">Einnahme</option>
          <option value="expense">Ausgabe</option>
        </select>
      </div>

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="showEdit = false" class="btn btn-secondary">Abbrechen</button>
        <button @click="saveEditCategory" class="btn btn-primary">Speichern</button>
      </div>
    </div>
  </div>

  <!-- Modal: Delete -->
  <div v-if="showDelete" class="modal-overlay">
    <div class="modal-md">

      <h3>Kategorie löschen</h3>
      <p class="dark:text-gray-100">
        Möchtest du die Kategorie
        <span class="font-semibold">{{ selected?.name }}</span>
        wirklich löschen?
      </p>

      <div class="flex justify-center space-x-4 mt-2">
        <button @click="deleteCategory" class="btn btn-danger">Löschen</button>
        <button @click="showDelete = false" class="btn btn-secondary">Zurück</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
// Alert handling, erfolgreich oder fehlerhaft
const { showAlertBox, alertMessage, alertType, showAlert } = useAlert();

// UI control
const showModal = ref(false);
const showAdd = ref(false);
const showEdit = ref(false);
const showDelete = ref(false);

// Data
const categories = ref([]);
const selected = ref(null);
const form = ref({
  name: "",
  type: "income",
});

// Kategorien alphabetisch sortieren (A bis Z)
function sortCategories() {
  if (!Array.isArray(categories.value)) return;

  categories.value.sort((a, b) => {
    const nameA = (a.name || "").toLowerCase();
    const nameB = (b.name || "").toLowerCase();
    return nameA.localeCompare(nameB, "de");
  });
}

// Load categories
async function loadCategories() {
  try {
    categories.value = await $fetch("/api/categories?userId=1");
    sortCategories(); // Nach dem Laden sortieren alphabetisch
  } catch (err) {
    console.error('Fehler beim Laden der Kategorien:', err);
    showAlert('Fehler beim Laden der Kategorien', 'error');
  }
}

onMounted(loadCategories);

// Damit zeigt es "Einnahme" oder "Ausgabe" anstatt "income" oder "expense", für besesere Lesbarkeit
function displayType(type) {
  if (type === "income") return "Einnahme"
  if (type === "expense") return "Ausgabe"
  return type
}


// ---- Modal Controls ----
function openEdit(cat) {
  selected.value = { ...cat };
  showEdit.value = true;
}

function openDelete(cat) {
  selected.value = { ...cat };
  showDelete.value = true;
}

function closeAll() {
  showModal.value = false;
  showAdd.value = false;
  showEdit.value = false;
  showDelete.value = false;
}


// ---- CRUD actions ----
async function createCategory() {
  try {
    await $fetch("/api/categories", {
      method: "POST",
      body: { ...form.value, userId: 1 }
    });

    await loadCategories();
    showAdd.value = false;
    showAlert("Kategorie wurde erfolgreich erstellt!", "success");
  } catch (err) {
    console.error('Fehler beim Erstellen der Kategorie:', err);
    showAlert('Fehler beim Erstellen der Kategorie', 'error');
  }
}

async function saveEditCategory() {
  try {
    await $fetch(`/api/categories/${selected.value.id}`, {
      method: "PUT",
      body: selected.value
    });

    await loadCategories();
    showEdit.value = false;
    showAlert("Kategorie wurde erfolgreich aktualisiert!", "success");
  } catch (err) {
    console.error('Fehler beim Aktualisieren der Kategorie:', err);
    showAlert('Fehler beim Aktualisieren der Kategorie', 'error');
  }
}

async function deleteCategory() {
  try {
    await $fetch(`/api/categories/${selected.value.id}`, {
      method: "DELETE"
    });

    await loadCategories();
    showDelete.value = false;
    showAlert("Kategorie wurde erfolgreich gelöscht!", "success");
  } catch (err) {
    console.error('Fehler beim Löschen der Kategorie:', err);
    showAlert('Fehler beim Löschen der Kategorie', 'error');
  }
}

</script>
