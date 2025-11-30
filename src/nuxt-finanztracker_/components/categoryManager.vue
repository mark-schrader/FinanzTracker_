<template>
  <!-- Main Button to Open Modal -->
  <button
    @click="showModal = true"
    class="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-4 rounded shadow
           text-center flex flex-col items-center justify-center space-y-2 transform hover:scale-105 transition">
    <i class="fas fa-tags text-4xl"></i>
    <span class="text-lg">Kategorien verwalten</span>
  </button>

  <!-- Modal: Kategorien verwalten -->
  <div
    v-if="showModal"
    class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-3xl space-y-4 relative">

      <!-- Header -->
      <h2 class="text-2xl font-bold text-brand-600 dark:text-brand-300">
        Kategorien verwalten
      </h2>

      <!-- Table -->
      <table class="table w-full dark:text-gray-200">
        <thead>
          <tr class="border-b dark:border-gray-700">
            <th>Name</th>
            <th>Typ</th>
            <th>Aktionen</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="cat in categories"
            :key="cat.id"
            class="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <td>{{ cat.name }}</td>
            <td>{{ cat.type }}</td>
            <td class="space-x-4">
              <button
                class="text-teal-600 hover:text-teal-400"
                @click="openEdit(cat)"
              >
                <i class="fas fa-pen"></i>
              </button>

              <button
                class="text-red-600 hover:text-red-400"
                @click="openDelete(cat)"
              >
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
  <div
    v-if="showAdd"
    class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md space-y-4">
      <h2 class="text-xl font-semibold text-brand-600">Neue Kategorie</h2>

      <div class="grid gap-2">
        <label>Name</label>
        <input v-model="form.name" class="form-input" />

        <label>Typ</label>
        <select v-model="form.type" class="form-input">
          <option value="income">Einnahme</option>
          <option value="expense">Ausgabe</option>
        </select>

      </div>

      <div class="flex justify-end space-x-2">
        <button @click="showAdd = false" class="btn btn-secondary">Abbrechen</button>
        <button @click="createCategory" class="btn btn-primary">Speichern</button>
      </div>
    </div>
  </div>

  <!-- Modal: Edit Category -->
  <div v-if="showEdit" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md space-y-4">

      <h2 class="text-2xl font-bold text-brand-600 dark:text-brand-600">Kategorie bearbeiten</h2>

      <div class="grid gap-2">
        <label>Name</label>
        <input v-model="selected.name" class="form-input" />

        <label>Typ</label>
        <select v-model="selected.type" class="form-input">
          <option value="income">Einnahme</option>
          <option value="expense">Ausgabe</option>
        </select>
      </div>

      <div class="flex justify-end space-x-2">
        <button @click="showEdit = false" class="btn btn-secondary">Abbrechen</button>
        <button @click="saveEditCategory" class="btn btn-primary">Speichern</button>
      </div>
    </div>
  </div>

  <!-- Modal: Delete -->
  <div v-if="showDelete" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md space-y-4">

      <h2 class="text-xl font-semibold text-red-600">Kategorie löschen</h2>
      <p class="dark:text-gray-300">
        Möchtest du die Kategorie
        <span class="font-semibold">{{ selected?.name }}</span>
        wirklich löschen?
      </p>

      <div class="flex justify-end space-x-4">
        <button @click="deleteCategory" class="btn btn-danger">Löschen</button>
        <button @click="showDelete = false" class="btn btn-secondary">Zurück</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";

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

// Load categories
async function loadCategories() {
  categories.value = await $fetch("/api/categories?userId=1");
}

onMounted(loadCategories);

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
  await $fetch("/api/categories", {
    method: "POST",
    body: { ...form.value, userId: 1 }
  });

  await loadCategories();
  showAdd.value = false;
}

async function saveEditCategory() {
  await $fetch(`/api/categories/${selected.value.id}`, {
    method: "PUT",
    body: selected.value
  });

  await loadCategories();
  showEdit.value = false;
}

async function deleteCategory() {
  await $fetch(`/api/categories/${selected.value.id}`, {
    method: "DELETE"
  });

  await loadCategories();
  showDelete.value = false;
}
</script>
