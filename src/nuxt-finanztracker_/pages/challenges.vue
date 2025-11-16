<template>
  <div class="p-6 max-w-screen-xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Finanz-Challenges</h1>
      <button @click="showChallengeModal = true"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow">
        + Neue Challenge
      </button>
    </div>

    <!-- Challenge-Liste -->
    <div v-if="challenges.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(challenge, index) in challenges" :key="index"
        class="bg-white shadow rounded p-4 space-y-2 border-l-4"
        :class="challengeProgress(challenge) >= 100 ? 'border-green-500' : 'border-blue-400'">
        <h2 class="text-xl font-semibold">{{ challenge.title }}</h2>
        <p class="text-sm text-gray-600">{{ challenge.description }}</p>
        <p class="text-sm">Ziel: <strong>{{ challenge.target }} €</strong></p>
        <p class="text-sm">Gespart: <strong>{{ challenge.saved }} €</strong></p>
        <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-green-500" :style="{ width: challengeProgress(challenge) + '%' }"></div>
        </div>
        <p class="text-xs text-right text-gray-500">
          {{ challengeProgress(challenge) }} % erreicht
        </p>
        <p class="text-xs text-gray-500">Zeitraum: {{ challenge.start }} bis {{ challenge.end }}</p>
      </div>
    </div>
    <div v-else class="text-gray-500 text-center mt-12">
      Noch keine Challenges erstellt.
    </div>

    <!-- Challenge Modal -->
    <div v-if="showChallengeModal" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 relative">
        <h2 class="text-xl font-bold">Neue Challenge</h2>

        <div class="grid gap-2">
          <label class="block text-sm font-medium">Titel</label>
          <input v-model="challengeForm.title" type="text" class="border px-2 py-1 rounded w-full" />

          <label class="block text-sm font-medium">Beschreibung</label>
          <textarea v-model="challengeForm.description" class="border px-2 py-1 rounded w-full"></textarea>

          <label class="block text-sm font-medium">Zielbetrag (€)</label>
          <input v-model.number="challengeForm.target" type="number" class="border px-2 py-1 rounded w-full" />

          <label class="block text-sm font-medium">Startdatum</label>
          <input v-model="challengeForm.start" type="date" class="border px-2 py-1 rounded w-full" />

          <label class="block text-sm font-medium">Enddatum</label>
          <input v-model="challengeForm.end" type="date" class="border px-2 py-1 rounded w-full" />
        </div>

        <div class="flex justify-end space-x-2 mt-4">
          <button @click="showChallengeModal = false" class="text-gray-500 hover:text-red-600">Abbrechen</button>
          <button @click="addChallenge" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Speichern
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  middleware: 'auth' // Auth-Middleware für diese Seite
})

const showChallengeModal = ref(false)

const challenges = ref([
  // Optional: Beispielchallenge
  {
    title: '30€ Wochenspar-Challenge',
    description: 'Versuche in 7 Tagen 30 Euro beiseite zu legen.',
    target: 30,
    saved: 12,
    start: '2025-06-15',
    end: '2025-06-22'
  }
])

const challengeForm = ref({
  title: '',
  description: '',
  target: 0,
  saved: 0,
  start: '',
  end: ''
})

function addChallenge() {
  challenges.value.push({ ...challengeForm.value })
  showChallengeModal.value = false
  challengeForm.value = {
    title: '',
    description: '',
    target: 0,
    saved: 0,
    start: '',
    end: ''
  }
}

function challengeProgress(challenge) {
  const p = Math.round((challenge.saved / challenge.target) * 100)
  return isNaN(p) ? 0 : Math.min(p, 100)
}
</script>
