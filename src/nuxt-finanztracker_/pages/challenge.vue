<template>
  <div class="content-wrapper">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Spar-Challenge</h1>
      <CurrentTime />
    </div>

    <!-- Aktueller Stand des Ziels -->
    <div
      class="card text-center bg-gradient-to-r from-cyan-200 to-blue-200 mb-4 rounded-xl shadow-md"
    >
      <h2 class="text-xl font-bold mb-4 dark:text-gray-800">
        Dein aktueller Stand
      </h2>
      <div class="max-w-2xl mx-auto px-8">
        <div
          class="flex justify-between items-center text-sm mb-2 dark:text-gray-800"
        >
          <span class="text-sm">
            {{ completedChallenges }} von {{ challenges.length }} Challenges
            geschafft
          </span>
          <span class="font-bold text-xl dark:text-gray-800">{{
            successRate
          }}</span>
        </div>

        <!-- Progress Bar -->
        <div
          class="h-10 bg-white rounded-full overflow-hidden shadow-inner backdrop-blur-sm"
        >
          <div
            class="h-full bg-white rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-6 font-bold drop-shadow-sm"
            :style="{ width: successRate + '%' }"
          >
            {{ successRate }}%
          </div>
        </div>

        <p
          class="mt-6 text-md font-bold text-center sopacity-90 dark:text-gray-800"
        >
          {{
            successRate >= 80
              ? "Du bist ein Spar-Profi!"
              : successRate >= 50
              ? "Guter Einsatz – weiter so!"
              : "Komm schon, du schaffst das!"
          }}
        </p>
      </div>
    </div>

    <!-- Untere Button und Kalendar-->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <!-- 1 Calendar -->
      <div
        class="bg-orange-100 p-6 rounded-xl shadow-md h-full flex items-center justify-center dark:text-gray-800"
      >
        <VCalendar :attributes="attr" />
      </div>

      <!-- 2 Neue Challenges Button -->
      <div class="h-full">
        <button
          @click="showChallengeModal = true"
          class="group w-full flex flex-col items-center justify-center gap-4 bg-emerald-100 text-emerald-900 font-bold text-xl px-8 py-10 rounded-xl shadow-md hover:scale-105 hover:bg-emerald-200 transition-all duration-200 dark:text-gray-800"
        >
          Neue Challenges
          <i class="fas fa-plus text-3xl items-center"></i>
        </button>
        <button
          @click="placeholder"
          class="group w-full flex flex-col items-center justify-center gap-4 mt-10 bg-yellow-100 text-yellow-900 font-bold text-xl px-8 py-10 rounded-xl shadow-md hover:bg-yellow-200 hover:scale-105 transition-all duration-200 dark:text-gray-800"
        >
          Spare Geld
          <i class="fas fa-line-chart text-3xl items-center"></i>
        </button>
      </div>

      <!-- 2.1 Button Popup -->
      <div
        v-if="showChallengeModal"
        class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 relative"
        >
          <h2 class="text-xl font-bold">Neuer Challenge</h2>

          <div class="grid gap-2">
            <label class="block text-sm font-medium">Titel</label>
            <input
              v-model="challengeForm.name"
              type="text"
              class="border px-2 py-1 rounded w-full"
            />

            <!--label class="block text-sm font-medium">Beschreibung</label>
            <textarea
              v-model="challengeForm.description"
              class="border px-2 py-1 rounded w-full"
            ></textarea-->

            <label class="block text-sm font-medium">Zielbetrag (€)</label>
            <input
              v-model.number="challengeForm.target"
              type="number"
              class="border px-2 py-1 rounded w-full"
            />

            <label class="block text-sm font-medium">Startdatum</label>
            <input
              v-model="challengeForm.created_at"
              type="date"
              class="border px-2 py-1 rounded w-full"
            />

            <label class="block text-sm font-medium">Enddatum</label>
            <input
              v-model="challengeForm.due_date"
              type="date"
              class="border px-2 py-1 rounded w-full"
            />
          </div>

          <div class="flex justify-end space-x-2 mt-4">
            <button
              @click="showChallengeModal = false"
              class="text-gray-500 hover:text-red-600"
            >
              Abbrechen
            </button>
            <button
              @click="addChallenge"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Speichern
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <!-- 2 Challenge Liste-->
      <div v-if="challenges.length">
        <div
          v-for="(challenge, index) in challenges"
          :key="index"
          class="bg-white shadow rounded-md p-4 space-y-2 border-l-4 dark:text-gray-800"
          :class="
            challengeProgress(challenge) >= 100
              ? 'border-green-500'
              : 'border-blue-400'
          "
        >
          <h2 class="text-xl font-semibold dark:text-gray-800">
            {{ challenge.name }}
          </h2>
          <!--p class="text-sm text-gray-600">{{ challenge.description }}</p-->
          <p class="text-sm">
            Ziel: <strong>{{ challenge.target }} €</strong>
          </p>
          <p class="text-sm">
            Gespart: <strong>{{ challenge.saved }} €</strong>
          </p>
          <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-green-500"
              :style="{ width: challengeProgress(challenge) + '%' }"
            ></div>
          </div>
          <p class="text-xs text-right text-gray-500">
            {{ challengeProgress(challenge) }} % erreicht
          </p>
          <p class="text-xs text-gray-500">
            Zeitraum: {{ challenge.created_at }} bis {{ challenge.due_date }}
          </p>
        </div>
      </div>
      <div v-else class="text-gray-500 text-center mt-12">
        Noch keine Challenges erstellt.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useFetch } from "#app";
import { Calendar } from "v-calendar";

const showChallengeModal = ref(false);
const challenges = ref([]);

const challengeForm = ref({
  name: "",
  target: 0,
  created_at: "", //start date of the spar challenge
  due_date: "", //end date
});

/*async function getChallenges() {
  try {
    const goals = await $fetch("/api/goals");
    if (Array.isArray(goals)) {
      challenges.value = goals.map((goal) => ({
        ...goal,
        target: Number(goal.target),
        saved: Number(goal.saved),
      }));
    } else {
      console.log("API liefert keine Daten");
      challenges.value = [];
    }
  } catch (err) {
    console.error("Fehler beim Laden der Challenges", err);
  }
}*/

onMounted(async () => {
  try {
    const result = await $fetch("/api/goals?userId=1");
    challenges.value = result || [];
  } catch (err) {
    console.error("Fehler beim Laden von der Datendank", err);
  }
});

async function addChallenge() {
  console.log("BUTTON WURDE GEDRUCKT!!!!!!!!!!");
  try {
    const saved = await $fetch("/api/goals", {
      method: "POST",
      body: {
        name: challengeForm.value.name,
        target: Number(challengeForm.value.target),
        saved: 0,
        created_at: challengeForm.value.created_at,
        due_date: challengeForm.value.due_date,
        userId: 1,
      },
    });

    challenges.value = [...challenges.value, saved];

    //Reset
    challengeForm.value = {
      name: "",
      target: "",
      created_at: "",
      due_date: "",
    };

    showChallengeModal.value = false;
  } catch (err) {
    console.error("Fehler beim Speichern in die Datenbank", err);
  }
}
/*
function challengeProgress(challenge) {
  if (!challenge.target) return 0;
  const p = Math.round((challenge.saved / challenge.target) * 100);
  return Math.min(Math.max(p, 0), 100);
}

const successRate = computed(() => {
  if (challenges.value.length === 0) return 0;
  const total = challenges.value.length;
  const done = challenges.value.filter(
    (c) => challengeProgress(c) === 100
  ).length;
  return Math.round((done / total) * 100);
});

const completedChallenges = computed(() => {
  return challenges.value.filter((c) => challengeProgress(c) === 100).length;
});
*/
// for Calendar styling
const attr = ref([
  {
    content: "red",
    key: "today",
    highlight: true,
    dates: new Date(),
  },
]);
</script>

<!--const challenges = ref([
  // Als Platzhalter Beispiel: Beispielchallenge
  {
    name: "30€ Wochenspar-Challenge",
    //description: "Versuche in 7 Tagen 30 Euro beiseite zu legen.",
    target: 30,
    saved: 12,
    created_at: "2025-06-15",
    due_date: "2025-06-22",
  },
]);-->
