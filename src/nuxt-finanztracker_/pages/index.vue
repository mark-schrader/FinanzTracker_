<template>

    <main class="content-wrapper flex flex-wrap justify-evenly items-center gap-10 py-16">
      <!-- Welcome Text -->
      <div class="flex-1 max-w-[600px] card bg-gradient-to-br from-teal-50/60 to-white/40 dark:from-gray-800/60 dark:to-gray-900/30 backdrop-blur-md">
        <p class="text-4xl font-bold text-brand-600 dark:text-brand-300 mb-8 break-word">
          WILLKOMMEN IN PLEITEGEIER!
        </p>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
          👩🏻‍💻 Viele Studierende stehen vor der Herausforderung, ihre Finanzen im Griff zu behalten – unerwartete Ausgaben, begrenzte Mittel und der Überblick geht schnell verloren.
        </p>
        <p class="text-lg font-semibold text-brand-600 dark:text-brand-300 mb-3">
          💡 Unsere Lösung →
        </p>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Eine kostenlose und intuitive App, speziell für junge Menschen entwickelt. Pleitegeier hilft dir, Einnahmen und Ausgaben zu verwalten, Budgets zu erstellen und deine Sparziele zu erreichen – einfach, übersichtlich und komplett kostenlos 🤩
        </p>
        <p class="text-lg font-semibold text-brand-600 dark:text-brand-300 mb-3">
          🌎 Unser Ziel →
        </p>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Finanzielle Selbstbestimmung für alle – ganz egal, wie viel (oder wenig) gerade auf dem Konto ist.
        </p>
        <p class="text-lg text-gray-700 dark:text-gray-300">
          Worauf wartest du noch? Melde dich jetzt an und mach deine Finanzen endlich stressfrei! 🥳
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex-1 max-w-[50%] flex flex-col justify-center items-center gap-6">
        <button @click="openLogin" class="btn btn-primary w-[150px] rounded-full text-base shadow-md hover:scale-110 transition duration-300">
          Sign In
        </button>
        <button @click="openRegister" class="btn btn-secondary w-[150px] rounded-full text-base shadow-md hover:scale-110 transition duration-300">
          Sign Up
        </button>
      </div>

      <!-- Login Form -->
      <div v-if="showLogin" class="fixed top-1/2 right-10 transform -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-[400px] z-50">
      <button class="absolute top-3 right-4 text-xl text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-transform hover:scale-110"
      @click="closeForm">     
      <i class="fas fa-times"></i>
      </button>
        <form class="flex flex-col gap-4">
          <h1 class="text-2xl font-bold text-brand-600 dark:text-brand-300">Login →</h1>
          <label for="email">Email</label>
          <input type="email" name="email" placeholder="Enter Email" required class="form-input" />

          <label for="psw">Password</label>
          <input type="password" name="psw" placeholder="Enter Password" required class="form-input" />

          <button type="submit" class="btn btn-primary self-end w-1/2 mt-4 shadow-sm">Login</button>
        </form>
      </div>

      <!-- Register Form -->
      <div v-if="showRegister" class="fixed top-1/2 right-10 transform -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-[500px] z-50">
      <button class="absolute top-3 right-4 text-xl text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-transform hover:scale-110"
      @click="closeForm">     
      <i class="fas fa-times"></i>
      </button>
        <form class="flex flex-col gap-4">
          <h1 class="text-2xl font-bold text-brand-600 dark:text-brand-300">Register →</h1>

          <label for="fname">Vorname</label>
          <input type="text" name="fname" id="fname" class="form-input" /> <!-- form-input schon definiert in tailwind.css -->

          <label for="lname">Nachname</label>
          <input type="text" name="lname" id="lname" class="form-input" />

          <label for="uni">Universität</label>
          <select id="uni" name="uni" class="form-select">
            <option value="htw">HTW Dresden</option>
            <option value="tu">TU Dresden</option>
            <option value="fh">Fachhochschule Dresden</option>
            <option value="hm">Hochschule für Musik Carl Maria von Weber Dresden</option>
          </select>

          <label for="bday">Geburtstag</label>
          <input type="date" name="bday" id="bday" class="form-input" />

          <label for="email">Email</label>
          <input type="email" name="email" placeholder="Enter Email" required class="form-input" />

          <label for="psw">Password</label>
          <input
            type="password"
            name="psw"
            placeholder="Enter Password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Muss mindestens eine Zahl und einen Groß- und Kleinbuchstaben sowie mindestens 8 oder mehr Zeichen enthalten"
            class="form-input"
          />

          <button type="submit" class="btn btn-primary self-end w-1/2 mt-4 shadow-sm">Register</button>
        </form>
      </div>
    </main>
</template>

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
