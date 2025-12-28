<template>

  <main class="content-wrapper flex flex-wrap justify-evenly items-center gap-10 py-16">
    <!-- Welcome Text -->
    <div
      class="flex-1 max-w-[600px] card bg-gradient-to-br from-teal-50/60 to-white/40 dark:from-gray-800/60 dark:to-gray-900/30 backdrop-blur-md">
      <h1 class="mb-8 break-word">
        WILLKOMMEN IN PLEITEGEIER!
      </h1>
      <p class="text-lg mb-4">
        👩🏻‍💻 Viele Studierende stehen vor der Herausforderung, ihre Finanzen im Griff zu behalten – unerwartete
        Ausgaben, begrenzte Mittel und der Überblick geht schnell verloren.
      </p>
      <h3 class="mt-10 mb-3">
        💡 Unsere Lösung →
      </h3>
      <p class="text-lg mb-4">
        Eine kostenlose und intuitive App, speziell für junge Menschen entwickelt. Pleitegeier hilft dir, Einnahmen und
        Ausgaben zu verwalten, Budgets zu erstellen und deine Sparziele zu erreichen – einfach, übersichtlich und
        komplett kostenlos 🤩
      </p>
      <h3 class="mt-10 mb-3">
        🌎 Unser Ziel →
      </h3>
      <p class="text-lg mb-4">
        Finanzielle Selbstbestimmung für alle – ganz egal, wie viel (oder wenig) gerade auf dem Konto ist.
      </p>
      <p class="text-lg mb-4">
        Worauf wartest du noch? Melde dich jetzt an und mach deine Finanzen endlich stressfrei! 🥳
      </p>
    </div>

    <div class="flex-1 max-w-[50%] flex flex-col justify-center items-center gap-8">
      <!-- Logo -->
      <img src="/Logo.png" alt="Logo" class="w-80 h-auto mb-4 drop-shadow-md" />
      <!-- Buttons -->
      <div class="flex-1 max-w-[50%] flex flex-col justify-center items-center gap-6">
        <button @click="openLogin"
          class="btn btn-primary w-[150px] rounded-full text-base shadow-md hover:scale-110 transition duration-300">
          Sign In
        </button>
        <button @click="openRegister"
          class="btn btn-secondary w-[150px] rounded-full text-base shadow-md hover:scale-110 transition duration-300">
          Sign Up
        </button>
      </div>
    </div>

    <!-- Login Form -->
    <div v-if="showLogin" class="modal-overlay">
      <div class="modal-md relative">
        <button
          class="absolute top-3 right-4 text-xl text-brand-600 hover:text-teal-400 transition-transform hover:scale-110"
          @click="closeForm">
          <i class="fas fa-times"></i>
        </button>
        <form class="flex flex-col gap-4">
          <h3>Login →</h3>
          <label for="email">Email</label>
          <input type="email" name="email" placeholder="Enter Email" required class="form-input" />

          <label for="psw">Password</label>
          <input type="password" name="psw" placeholder="Enter Password" required class="form-input" />

          <button type="submit" class="btn btn-primary self-end w-1/2 mt-4 shadow-sm">Login</button>
        </form>
      </div>
    </div>

    <!-- Register Form -->
    <div v-if="showRegister" class="modal-overlay">
      <div class="modal-md relative">
        <button
          class="absolute top-3 right-4 text-xl text-brand-600 hover:text-teal-400 transition-transform hover:scale-110"
          @click="closeForm">
          <i class="fas fa-times"></i>
        </button>
        <form class="flex flex-col gap-4">
          <h3>Register →</h3>

          <label for="fname">Vorname</label>
          <input type="text" name="fname" id="fname" class="form-input" />
          <!-- form-input schon definiert in tailwind.css -->

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
          <input type="password" name="psw" placeholder="Enter Password" required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Muss mindestens eine Zahl und einen Groß- und Kleinbuchstaben sowie mindestens 8 oder mehr Zeichen enthalten"
            class="form-input" />

          <button type="submit" class="btn btn-primary self-end w-1/2 mt-4 shadow-sm">Register</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

import { reactive, ref } from "vue";
import { navigateTo, useFetch } from '#app';
//import { useSupabaseClient } from '#supabase/server'

const supabase = useSupabaseClient();

// UI state
const showLogin = ref(false);
const showRegister = ref(false);

// form state
const form = reactive({
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  university: "",
  birthdate: "",
});

// login state
const email = ref('');
const password = ref('');
const errorMessage = ref<string | null>(null);

// helper sleep
const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

// Registration function
const register = async () => {
  try {
    const res = await fetch('/api/UserController', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });


    const data = await res.json();

    if (data.status !== 'success') {
      console.error('Registrierung fehlgeschlagen:', data.message);
      return;
    }

    await sleep(1000);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    });

    if (loginError) {
      console.error('Login nach Pause fehlgeschlagen:', loginError.message);
      return;
    }

    return navigateTo(`/dashboard/${data.user.userid}`);
  } catch (err) {
    console.error('Fehler bei Registrierung:', err);
  }
}


// Login function
const login = async () => {
  errorMessage.value = null;

  try {
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (authError) {
      errorMessage.value = authError.message;
      return;
    }

    await sleep(1000);

    const profileData  = await $fetch('/api/user/me');

    console.log('Profil-Daten nach dem Login:', profileData);

    if (!profileData) {
      throw new Error('Benutzerprofil nicht gefunden nach dem Login.');
    }

    const prismaUserId = profileData.userid;
    
    return navigateTo(`/dashboard/${prismaUserId}`);

  } catch (err: any) {
    errorMessage.value = err.message || "Ein unerwarteter Fehler ist aufgetreten.";
    console.error('Unerwarteter Fehler:', err);
  }
}

function openLogin() { showLogin.value = true; }
function openRegister() { showRegister.value = true; }
function closeForm() { showLogin.value = false; showRegister.value = false; }
</script>