<template>

    <main class="flex-1 p-12 flex justify-evenly items-center gap-8 flex-wrap">
      <!-- Welcome Text -->
      <div class="flex-1 max-w-[50%] bg-white/20 backdrop-blur rounded-xl p-6">
        <p class="text-3xl font-bold mb-10 break-word">
          WILLKOMMEN IN PLEITEGEIER!
        </p>
        <p class="text-lg mb-4">
          👩🏻‍💻 Viele Studierende stehen vor der Herausforderung, ihre Finanzen im Griff zu behalten – unerwartete Ausgaben, begrenzte Mittel und der Überblick geht schnell verloren.
        </p>
        <p class="text-lg mb-4 font-bold">
          💡 Unsere Lösung →
        </p>
        <p class="text-lg mb-4">
          Eine kostenlose und intuitive App, speziell für junge Menschen entwickelt. Pleitegeier hilft dir, Einnahmen und Ausgaben zu verwalten, Budgets zu erstellen und deine Sparziele zu erreichen – einfach, übersichtlich und komplett kostenlos 🤩
        </p>
        <p class="text-lg mb-4 font-bold">
          🌎 Unser Ziel →
        </p>
        <p class="text-lg mb-4">
          Finanzielle Selbstbestimmung für alle – ganz egal, wie viel (oder wenig) gerade auf dem Konto ist.
        </p>
        <p class="text-lg">
          Worauf wartest du noch? Melde dich jetzt an und mach deine Finanzen endlich stressfrei! 🥳
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex-1 max-w-[50%] flex flex-col justify-center items-center gap-6">
        <button @click="openLogin" class="w-[130px] h-[40px] font-medium bg-white/40 rounded-full hover:scale-110 transition duration-300 shadow-md">
          Sign In
        </button>
        <button @click="openRegister" class="w-[130px] h-[40px] font-medium bg-white/40 rounded-full hover:scale-110 transition duration-300 shadow-md">
          Sign Up
        </button>
      </div>

      <!-- Login Form -->
      <div v-if="showLogin" class="fixed top-1/2 right-10 transform -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-[400px] z-50">
      <button class="absolute top-3 right-4 text-xl hover:text-blue-700 hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer"
      @click="closeForm">     
      <i class="fas fa-times"></i>
      </button>
        <form class="flex flex-col gap-4">
          <h1 class="text-2xl font-bold mb-4">Login →</h1>
          <label for="email">Email</label>
          <input v-model="email" type="email" name="email" placeholder="Enter Email" required class="border p-2 rounded" />

          <label for="psw">Password</label>
          <input v-model="password" type="password" name="psw" placeholder="Enter Password" required class="border p-2 rounded" />

          <button type="button" @click="login" class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded w-1/2 self-end cursor-pointer">Login</button>
        </form>
      </div>

      <!-- Register Form -->
      <div v-if="showRegister" class="fixed top-1/2 right-10 transform -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-[500px] z-50">
      <button class="absolute top-3 right-4 text-xl hover:text-blue-700 hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer"
      @click="closeForm">     
      <i class="fas fa-times"></i>
      </button>
        <form class="flex flex-col gap-4" @submit.prevent="register">
          <h1 class="text-2xl font-bold mb-4">Register →</h1>

          <label for="fname">Vorname</label>
          <input v-model="form.firstname" type="text" name="fname" id="fname" class="border p-2 rounded" />

          <label for="lname">Nachname</label>
          <input v-model="form.lastname" type="text" name="lname" id="lname" class="border p-2 rounded" />

          <label for="uni">Universität</label>
          <select v-model="form.university" id="uni" name="uni" class="border p-2 rounded">
            <option value="htw">HTW Dresden</option>
            <option value="tu">TU Dresden</option>
            <option value="fh">Fachhochschule Dresden</option>
            <option value="hm">Hochschule für Musik Carl Maria von Weber Dresden</option>
          </select>

          <label for="bday">Geburtstag</label>
          <input v-model="form.birthdate" type="date" name="bday" id="bday" class="border p-2 rounded" />

          <label for="email">Email</label>
          <input v-model="form.email" type="email" name="email" placeholder="Enter Email" required class="border p-2 rounded" />

          <label for="psw">Password</label>
          <input
            v-model="form.password"
            type="password"
            name="psw"
            placeholder="Enter Password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Muss mindestens eine Zahl und einen Groß- und Kleinbuchstaben sowie mindestens 8 oder mehr Zeichen enthalten"
            class="border p-2 rounded"
          />

          <button type="submit" class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded w-1/2 self-end cursor-pointer">Register</button>
        </form>
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
