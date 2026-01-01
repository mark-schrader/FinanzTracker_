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
        </div>

        <!-- Progress Bar -->
        <div
          class="h-10 bg-white rounded-full overflow-hidden shadow-inner backdrop-blur-sm"
        >
          <div
            class="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-6 font-bold drop-shadow-sm"
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
        <Calendar :attributes="attr" />
      </div>

      <!-- 2 Neue Challenges Button -->
      <div class="h-full">
        <button
          @click="showChallengeModal = true"
          class="group w-full flex flex-col items-center justify-center gap-4 bg-emerald-100 text-emerald-800 font-bold text-xl px-8 py-10 rounded-xl shadow-md hover:scale-105 hover:bg-emerald-200 transition-all duration-200 dark:emerald-800"
        >
          Neue Challenges
          <i class="fas fa-plus text-3xl items-center"></i>
        </button>
        <button
          @click="showSaveModal = true"
          class="group w-full flex flex-col items-center justify-center gap-4 mt-10 bg-yellow-100 text-yellow-800 font-bold text-xl px-8 py-10 rounded-xl shadow-md hover:bg-yellow-200 hover:scale-105 transition-all duration-200 dark:text-yellow-800"
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
          class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 relative dark:text-gray-800"
        >
          <h2 class="text-xl font-bold dark:text-gray-800">Neuer Challenge</h2>

          <div class="grid gap-2">
            <label class="block text-sm font-medium dark:text-gray-800"
              >Titel</label
            >
            <input
              v-model="challengeForm.name"
              type="text"
              class="border px-2 py-1 rounded w-full"
            />

            <label class="block text-sm font-medium dark:text-gray-800"
              >Zielbetrag (€)</label
            >
            <input
              v-model.number="challengeForm.target"
              type="number"
              class="border px-2 py-1 rounded w-full"
            />

            <label class="block text-sm font-medium dark:text-gray-800"
              >Enddatum</label
            >
            <input
              v-model="challengeForm.dueDate"
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

      <!-- 2.2 Button Popup -->
      <div
        v-if="showSaveModal"
        class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl dark:text-gray-800"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 relative"
        >
          <h2 class="text-2xl font-bol dark:text-gray-800">Jetzt sparen!</h2>
          <label class="block text-sm font-medium dark:text-gray-800"
            >Challenge</label
          >
          <select
            v-model="selectedChallengeId"
            class="border px-2 py-1 rounded w-full"
          >
            <option disabled value="text-gray-800">Challenge auswählen</option>
            <option
              v-for="challenge in challenges"
              :key="challenge.id"
              :value="challenge.id"
            >
              {{ challenge.name }}
            </option>
          </select>

          <label class="block text-sm font-medium dark:text-gray-800"
            >Betrag einfügen
          </label>
          <input
            v-model="savedAmount"
            type="number"
            class="border px-2 py-1 rounded w-full"
          />

          <div class="flex justify-end space-x-2 mt-4">
            <button
              @click="showSaveModal = false"
              class="text-gray-500 hover:text-red-600"
            >
              Abbrechen
            </button>
            <button
              @click="saveChallenge"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Speichern
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <!-- 3 Challenge Liste-->
      <div v-if="!challenges.length" class="text-gray-500 text-center mt-14">
        Noch keine Challenges erstellt.
      </div>

      <div v-else>
        <!--Aktive Challenges-->
        <div v-if="activeChallenges.length > 0" class="">
          <h2 class="text-2xl font-bold mb-4 dark:text-white">
            Aktive Challenges
          </h2>
          <div class="grid grid-cols-2 grid-rows-2 md:grid-cols-3 gap-2 mb-24">
            <div
              v-for="challenge in activeChallenges"
              :key="challenge.id"
              class="group w-full flex flex-col items-center justify-center gap-1 mt-5 px-4 py-4 bg-white shadow-md rounded-xl p-4 border-l-4 border-blue-400 dark:text-gray-800"
            >
              <h2 class="text-xl font-semibold dark:text-gray-800">
                {{ challenge.name }}
              </h2>
              <p class="text-sm">
                Ziel: <strong>{{ challenge.target }} €</strong>
              </p>
              <p class="text-sm">
                Gespart: <strong>{{ challenge.saved }} €</strong>
              </p>
              <div
                class="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-sm"
              >
                <div
                  class="h-full bg-green-500 transition-all duration-300"
                  :style="{ width: challengeProgress(challenge) + '%' }"
                ></div>
              </div>
              <p class="text-xs text-right text-gray-500">
                {{ challengeProgress(challenge) }} % erreicht
              </p>
              <p class="text-xs text-gray-500">
                Zeitraum: bis {{ challenge.dueDate }}
              </p>
            </div>
          </div>
        </div>
        <!--Fertige Challenges-->
        <div v-if="completedChallengesListe.length > 0">
          <h2 class="text-2xl font-bold mb-4 dark:text-white">
            Abgeschlossene Challenges
            <button @click="isShowing = !isShowing" class="">
              <i v-if="isShowing" class="fa fa-caret-up"></i>
              <i v-else class="fa fa-caret-down"></i>
            </button>
          </h2>
          <div
            v-if="isShowing"
            class="grid grid-cols-2 grid-rows-2 md:grid-cols-3 gap-2 mb-24"
          >
            <div
              v-for="challenge in completedChallengesListe"
              :key="challenge.id"
              class="group w-full flex flex-col items-center justify-center gap-1 mt-5 px-4 py-4 bg-white shadow-md rounded-xl p-4 border-l-4 border-green-500 dark:text-gray-800"
            >
              <h2 class="text-xl font-semibold dark:text-gray-800">
                {{ challenge.name }}
              </h2>
              <p class="text-green-700 font-semibold">
                Erfolgreich gespart: <strong>{{ challenge.target }} €</strong>
              </p>
              <!--Progress bar nicht mehr sichtbar-->
              <div
                class="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-sm"
              >
                <div
                  class="h-full bg-green-500"
                  :style="{ width: challengeProgress(challenge) + '%' }"
                ></div>
              </div>
              <p class="text-xs text-right text-gray-500">
                {{ challengeProgress(challenge) }} % erreicht
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useFetch } from "#app";
import { Calendar } from "v-calendar";
import { channel } from "process";
import 'v-calendar/dist/style.css'

const showChallengeModal = ref(false);
const showSaveModal = ref(false);
const challenges = ref([]);
const selectedChallengeId = ref(""); //später ausgewählte Challenge ID
const savedAmount = ref(0);
const isShowing = ref(false);

const challengeForm = ref({
  name: "",
  target: 0,
  dueDate: "",
});

onMounted(async () => {
  try {
    const result = await $fetch("/api/goals");
    challenges.value = result || [];
  } catch (err) {
    console.error("Fehler beim Laden von der Datendank", err);
  }
});

async function addChallenge() {
  try {
    const saved = await $fetch("/api/goals", {
      method: "POST",
      body: {
        userId: 1,
        name: challengeForm.value.name,
        target: Number(challengeForm.value.target),
        saved: 0,
        dueDate: new Date(challengeForm.value.dueDate).toISOString(),
      },
    });

    challenges.value = [...challenges.value, saved];

    //Reset
    challengeForm.value = {
      name: "",
      target: 0,
      dueDate: "",
    };

    showChallengeModal.value = false;
    alert("Erfoglreich erstellt worden!");
  } catch (err) {
    console.error("Fehler beim Speichern in die Datenbank", err);
  }
}

async function saveChallenge() {
  if (!selectedChallengeId.value || savedAmount.value <= 0) {
    alert("Bitte Challenge und Betrag auswählen!");
    return;
  }

  const challenge = challenges.value.find(
    (c) => c.id === selectedChallengeId.value
  );

  if (!challenge) {
    alert("Challenge nicht gefunden!");
    return;
  }

  const newSaved = challenge.saved + savedAmount.value; //kumulieren

  try {
    await $fetch(`/api/goals/${challenge.id}`, {
      method: "PUT",
      body: {
        saved: newSaved,
      },
    });

    //reset
    challenge.saved = newSaved;
    showSaveModal.value = false;
    savedAmount.value = 0;
    selectedChallengeId.value = "";
  } catch (err) {
    console.error("Fehler beim Speichern in die Datenbank", err);
  }
}
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

const activeChallenges = computed(() => {
  return challenges.value.filter((c) => challengeProgress(c) < 100);
});

const completedChallengesListe = computed(() => {
  return challenges.value.filter((c) => challengeProgress(c) >= 100);
});
// for Calendar styling
const attr = computed(() => [
  {
    key: "due-dates",
    highlight: {
      color: "blue",
    },
    dates: challenges.value.map((c) => ({
      start: new Date(c.dueDate),
    })),
  },
]);

  definePageMeta({
  middleware: 'auth' // Auth-Middleware für diese Seite
})

</script>
