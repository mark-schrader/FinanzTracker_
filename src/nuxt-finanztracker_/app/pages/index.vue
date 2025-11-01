<template>

  <main class="flex flex-wrap items-center flex-1 gap-8 p-12 justify-evenly">
    <!-- Welcome Text -->
    <div class="flex-1 max-w-[50%] bg-white/20 backdrop-blur rounded-xl p-6">
      <p class="mb-10 text-3xl font-bold break-word">
        WILLKOMMEN IN PLEITEGEIER!
      </p>
      <p class="mb-4 text-lg">
        👩🏻‍💻 Viele Studierende stehen vor der Herausforderung, ihre Finanzen im Griff zu behalten – unerwartete
        Ausgaben, begrenzte Mittel und der Überblick geht schnell verloren.
      </p>
      <p class="mb-4 text-lg font-bold">
        💡 Unsere Lösung →
      </p>
      <p class="mb-4 text-lg">
        Eine kostenlose und intuitive App, speziell für junge Menschen entwickelt. Pleitegeier hilft dir, Einnahmen und
        Ausgaben zu verwalten, Budgets zu erstellen und deine Sparziele zu erreichen – einfach, übersichtlich und
        komplett kostenlos 🤩
      </p>
      <p class="mb-4 text-lg font-bold">
        🌎 Unser Ziel →
      </p>
      <p class="mb-4 text-lg">
        Finanzielle Selbstbestimmung für alle – ganz egal, wie viel (oder wenig) gerade auf dem Konto ist.
      </p>
      <p class="text-lg">
        Worauf wartest du noch? Melde dich jetzt an und mach deine Finanzen endlich stressfrei! 🥳
      </p>
    </div>

    <!-- Buttons -->
    <div class="flex-1 max-w-[50%] flex flex-col justify-center items-center gap-6">
      <button @click="openLogin"
        class="w-[130px] h-[40px] font-medium bg-white/40 rounded-full hover:scale-110 transition duration-300 shadow-md">
        Sign In
      </button>
      <button @click="openRegister"
        class="w-[130px] h-[40px] font-medium bg-white/40 rounded-full hover:scale-110 transition duration-300 shadow-md">
        Sign Up
      </button>
    </div>

    <!-- Login Form -->
    <div v-if="showLogin"
      class="fixed top-1/2 right-10 transform -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-[400px] z-50">
      <button
        class="absolute text-xl transition-all duration-200 ease-in-out cursor-pointer top-3 right-4 hover:text-blue-700 hover:scale-125"
        @click="closeForm">
        <i class="fas fa-times"></i>
      </button>
      <form class="flex flex-col gap-4">
        <h1 class="mb-4 text-2xl font-bold">Login →</h1>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Enter Email" required class="p-2 border rounded" />

        <label for="psw">Password</label>
        <input type="password" name="psw" placeholder="Enter Password" required class="p-2 border rounded" />

        <button type="submit"
          class="self-end w-1/2 px-4 py-2 text-blue-700 bg-blue-100 rounded cursor-pointer hover:bg-blue-200">Login</button>
      </form>
    </div>

    <!-- Register Form -->
    <div v-if="showRegister"
      class="fixed top-1/2 right-10 transform -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-[500px] z-50">
      <button
        class="absolute text-xl transition-all duration-200 ease-in-out cursor-pointer top-3 right-4 hover:text-blue-700 hover:scale-125"
        @click="closeForm">
        <i class="fas fa-times"></i>
      </button>
      <form class="flex flex-col gap-4">
        <h1 class="mb-4 text-2xl font-bold">Register →</h1>

        <label for="fname">Vorname</label>
        <input type="text" name="fname" id="fname" class="p-2 border rounded" />

        <label for="lname">Nachname</label>
        <input type="text" name="lname" id="lname" class="p-2 border rounded" />

        <label for="uni">Universität</label>
        <select id="uni" name="uni" class="p-2 border rounded">
          <option value="htw">HTW Dresden</option>
          <option value="tu">TU Dresden</option>
          <option value="fh">Fachhochschule Dresden</option>
          <option value="hm">Hochschule für Musik Carl Maria von Weber Dresden</option>
        </select>

        <label for="bday">Geburtstag</label>
        <input type="date" name="bday" id="bday" class="p-2 border rounded" />

        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Enter Email" required class="p-2 border rounded" />

        <label for="psw">Password</label>
        <input type="password" name="psw" placeholder="Enter Password" required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Muss mindestens eine Zahl und einen Groß- und Kleinbuchstaben sowie mindestens 8 oder mehr Zeichen enthalten"
          class="p-2 border rounded" />

        <button type="submit"
          class="self-end w-1/2 px-4 py-2 text-blue-700 bg-blue-100 rounded cursor-pointer hover:bg-blue-200">Register</button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
const supabaseClient = useSupabaseClient();

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

const handleRegister = async () => {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email.value,
    password: password.value,
    // options: {
    //   data: {
    //     first_name: firstName.value,
    //     last_name: lastName.value,
    //     university: university.value,
    //     birthday: birthday.value
    //   }
    // }
  })

  if (data.user) {
    return navigateTo('/dashboard');
  }
}
</script>
