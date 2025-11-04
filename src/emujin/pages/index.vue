<script setup>
import { ref } from "vue";

const showLogin = ref(false);
const showRegister = ref(false);

function openLogin() {
  showLogin.value = true;
}
function openRegister() {
  showRegister.value = true;
}
function closeForm() {
  showLogin.value = false;
  showRegister.value = false;
}
</script>

<template>
  <main class="flex-1 p-12 flex justify-evenly items-center gap-8 flex-wrap">
    <!-- Welcome Text -->
    <div class="flex-1 max-w-[50%] bg-white/20 backdrop-blur rounded-xl p-6">
      <p class="text-3xl font-bold mb-10 break-word">
        WILLKOMMEN IN PLEITEGEIER!
      </p>
      <p class="text-lg mb-4">
        👩🏻‍💻 Viele Studierende stehen vor der Herausforderung, ihre Finanzen im
        Griff zu behalten – unerwartete Ausgaben, begrenzte Mittel und der
        Überblick geht schnell verloren.
      </p>
      <p class="text-lg mb-4 font-bold">💡 Unsere Lösung →</p>
      <p class="text-lg mb-4">
        Eine kostenlose und intuitive App, speziell für junge Menschen
        entwickelt. Pleitegeier hilft dir, Einnahmen und Ausgaben zu verwalten,
        Budgets zu erstellen und deine Sparziele zu erreichen – einfach,
        übersichtlich und komplett kostenlos 🤩
      </p>
      <p class="text-lg mb-4 font-bold">🌎 Unser Ziel →</p>
      <p class="text-lg mb-4">
        Finanzielle Selbstbestimmung für alle – ganz egal, wie viel (oder wenig)
        gerade auf dem Konto ist.
      </p>
      <p class="text-lg">
        Worauf wartest du noch? Melde dich jetzt an und mach deine Finanzen
        endlich stressfrei! 🥳
      </p>
    </div>

    <!-- Buttons -->
    <div
      class="flex-1 max-w-[50%] flex flex-col justify-center items-center gap-6"
    >
      <button
        @click="openLogin"
        class="w-[130px] h-[40px] font-medium bg-white/40 rounded-full hover:scale-110 transition duration-300 shadow-md"
      >
        Anmelden
      </button>
      <button
        @click="openRegister"
        class="w-[130px] h-[40px] font-medium bg-white/40 rounded-full hover:scale-110 transition duration-300 shadow-md"
      >
        Registrieren
      </button>
    </div>

    <div
      v-if="showLogin"
      class="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      <!-- Background blur -->
      <div class="absolute inset-0 bg-white/70 backdrop-blur-md"></div>

      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <!-- Close Button -->
        <button
          @click="closeForm"
          class="absolute top-3 right-4 text-xl hover:text-blue-700 hover:scale-125 transition-all duration-200 cursor-pointer"
        >
          <i class="fas fa-times"></i>
        </button>

        <!-- Form -->
        <form class="flex flex-col gap-4">
          <h1 class="text-2xl font-bold mb-4">Registrieren →</h1>

          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <label for="psw">Passwort</label>
          <input
            type="password"
            name="psw"
            placeholder="Enter Password"
            required
            class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button
            type="submit"
            class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded w-1/2 self-end cursor-pointer transition-colors"
          >
            Anmelden
          </button>
        </form>
      </div>
    </div>

    <!-- Register Form -->
    <div
      v-if="showRegister"
      class="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      <!-- Background blur -->
      <div class="absolute inset-0 bg-white/70 backdrop-blur-md"></div>

      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <!-- Close button -->
        <button
          class="absolute top-3 right-4 text-xl hover:text-blue-700 hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer"
          @click="closeForm"
        >
          <i class="fas fa-times"></i>
        </button>
        <form class="flex flex-col gap-4">
          <h1 class="text-2xl font-bold mb-4">Registrieren →</h1>

          <label for="fname">Vorname</label>
          <input
            type="text"
            name="fname"
            id="fname"
            class="border p-2 rounded"
          />

          <label for="lname">Nachname</label>
          <input
            type="text"
            name="lname"
            id="lname"
            class="border p-2 rounded"
          />

          <label for="uni">Universität</label>
          <select id="uni" name="uni" class="border p-2 rounded">
            <option value="htw">HTW Dresden</option>
            <option value="tu">TU Dresden</option>
            <option value="fh">Fachhochschule Dresden</option>
            <option value="hm">
              Hochschule für Musik Carl Maria von Weber Dresden
            </option>
          </select>

          <label for="bday">Geburtstag</label>
          <input type="date" name="bday" id="bday" class="border p-2 rounded" />

          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            class="border p-2 rounded"
          />

          <label for="psw">Passwort</label>
          <input
            type="password"
            name="psw"
            placeholder="Enter Password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Muss mindestens eine Zahl und einen Groß- und Kleinbuchstaben sowie mindestens 8 oder mehr Zeichen enthalten"
            class="border p-2 rounded"
          />

          <button
            type="submit"
            class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded w-1/2 self-end cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
