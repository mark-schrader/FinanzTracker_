<template>
  <div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[90%] max-w-md space-y-4 relative">

      <!-- BEARBEITEN -->
      <template v-if="mode === 'edit'">
        <h2 class="text-2xl font-bold text-brand-600 dark:text-brand-400">
          Kontobewegung bearbeiten
        </h2>

        <div class="grid gap-3">
          <label>Datum</label>
          <input v-model="localItem.date" type="date" class="form-input" />

          <label>Betrag (€)</label>
          <input v-model="localItem.amount" type="number" step="0.01" class="form-input" />

          <label>Zyklus</label>
          <input v-model="localItem.interval" class="form-input" />

          <label>Kontoinhaber</label>
          <input v-model="localItem.owner" class="form-input" />

          <label>Beschreibung</label>
          <input v-model="localItem.purpose" class="form-input" />

          <label>Kategorie</label>
          <input v-model="localItem.categoryName" class="form-input" />

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
  mode: { type: String, required: true } // "edit" oder "delete"
})

const emit = defineEmits(["save-edit", "confirm-delete", "close"])

const localItem = ref({ ...props.item })

watch(
  () => props.item,
  (val) => {
    if (val) localItem.value = { ...val }
  }
)

function saveEdit() {
  emit("save-edit", localItem.value)
}
</script>
