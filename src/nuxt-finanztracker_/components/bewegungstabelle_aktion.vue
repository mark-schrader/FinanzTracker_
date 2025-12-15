<template>
  <div class="modal-overlay">
    <div class="modal-md">

      <!-- BEARBEITEN -->
      <template v-if="mode === 'edit'" >
        <h3>
          Kontobewegung bearbeiten
        </h3>

        <div class="grid gap-3">
          <label>Datum</label>
          <input v-model="localItem.date" type="date" class="form-input" />
          <label>Betrag (€)</label>
          <input v-model="localItem.amount" type="number" min="0" step="0.50" class="form-input" />
          <!-- Typ nur Anzeigen für Nutzer, nicht bearbeiten  -->
          <label>Typ</label>
          <input :value="localItem.type" class="form-input bg-gray-100 cursor-not-allowed" disabled />


          <label>Zyklus</label>
          <select v-model="localItem.interval" class="form-select">
            <option value="once">Einmalig</option>
            <option value="weekly">Wöchentlich</option>
            <option value="monthly">Monatlich</option>
            <option value="semesterly">Semester</option>
            <option value="annual">Jährlich</option>
          </select>

          <label>Kontoinhaber</label>
          <input v-model="localItem.owner" class="form-input" />

          <label>Beschreibung</label>
          <input v-model="localItem.purpose" class="form-input" />

          <label>Kategorie</label>
          <select v-model="localItem.categoryId" class="form-input">
            <option disabled value="">Bitte wählen</option>
            <option v-for="cat in categories" :value="cat.id" :key="cat.id">
              {{ cat.name }}
            </option>
          </select>

          <label>Kommentar</label>
          <textarea v-model="localItem.comment" class="form-textarea"></textarea>
        </div>

        <div class="flex justify-end space-x-2 mt-4">
          <button @click="$emit('close')" class="btn btn-secondary">Abbrechen</button>
          <button @click="saveEdit" class="btn btn-primary">Speichern</button>
        </div>
      </template>

      <!-- LÖSCHEN -->
      <template v-else-if="mode === 'delete'">
        <h2 class="text-2xl font-bold text-brand-600 dark:text-brand-400">
          Kontobewegung löschen
        </h2>

        <p class="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          Möchten Sie die Kontobewegung wirklich löschen?
        </p>

        <div class="flex justify-center space-x-4 mt-4">
          <button @click="$emit('confirm-delete')" class="btn btn-danger">Löschen</button>
          <button @click="$emit('close')" class="btn btn-secondary">Abbrechen</button>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  item: { type: Object, required: true },
  mode: { type: String, required: true }, // "edit" oder "delete"
  categories: { type: Array, default: () => [] }
})

const emit = defineEmits(["save-edit", "confirm-delete", "close"])

const localItem = ref({})


watch(
  () => [props.item, props.mode],
  ([item, mode]) => {
    if (mode !== "edit" || !item) return

    const raw = Number(
      String(item.amount).replace(/[^0-9.-]/g, "")
    )

    localItem.value = {
      ...item,
      amount: isNaN(raw) ? null : Math.abs(raw)
    }
  },
  { immediate: true }
)



function saveEdit() {
  emit("save-edit", localItem.value)
}
</script>
