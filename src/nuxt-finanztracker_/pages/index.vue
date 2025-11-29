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
      <!--Log in Button Box-->
      <div class="form-container-wrapper">
        <div v-if="showLogin" class="loginPopup" id="loginPopup">
          <button class="closeBtn" type="button" @click="closeForm()">x</button>
          <form action="..." class="form-container" method="post">
            <h1 class="login-text">Login →</h1>
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
            />
            <label for="psw">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
            />
            <button class="submitBtn" type="submit">Login</button>
          </form>
        </div>
      </div>
      <!--Sign in Button box -->
      <div class="form-container-wrapper">
        <div v-if="showRegister" class="registerPopup" id="registerPopup">
          <button class="closeBtn" type="button" @click="closeForm()">x</button>
          <form action="..." class="form-container" method="post">
            <h1 class="register-text">Register →</h1>
            <label for="fname">Vorname</label>
            <input type="text" name="fname" id="fname" />

            <label for="lname">Nachname</label>
            <input type="text" name="lname" id="lname" />

            <label for="uni">Universität</label>
            <select id="uni" name="uni">
              <option value="htw">HTW Dresden</option>
              <option value="tu">TU Dresden</option>
              <option value="fh">Fachhochschule Dresden</option>
              <option value="hm">
                Hochschule für Musik Carl Maria von Weber Dresden
              </option>
            </select>

            <label for="bday">Geburtstag</label>
            <input type="date" name="bday" id="bday" />

            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
            />

            <label for="psw">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Muss mindestens eine Zahl und einen Groß- und Kleinbuchstaben sowie mindestens 8 oder mehr Zeichen enthalten"
              required
            />
            <button class="registerBtn" type="submit">Register</button>
          </form>
        </div>
      </div>
    </main>
</template>

<script setup lang="ts">
import AppFooter from "~/components/AppFooter.vue";
import AppHeader from "~/components/AppHeader.vue";
import { ref, reactive } from "vue";
import { useSupabaseClient } from "#supabase";
const supabase = useSupabaseClient();
const showLogin = ref(false);
const showRegister = ref(false);

//form und fetch für create user

//const router = useRouter();
const form = reactive({
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  university: "",
  birthdate: "",
  //username: "",
  //startamount: ""
  //username: "",
  //startamount: ""
})



const register = async () => {
  try {
    const res = await fetch('/api/user/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.status !== 'success') {
      console.error('Registrierung fehlgeschlagen:', data.message);
      return;
    }

    console.log('Registrierung erfolgreich:', data);
    
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    console.log("Warte 1000ms");
    await sleep(1000);

    console.log('Versuche jetzt Login mit:', form.email)
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
  });

  if (loginError) {
      console.error('Login nach Pause fehlgeschlagen:', loginError.message);
     return;
    }

   
    console.log('Login erfolgreich');
    return navigateTo(`/dashboard/${data.user.userid}`);

    //if (loginError) {
      //console.error('Login fehlgeschlagen:', loginError.message);
      //return;
    //}

    //console.log('Registrierung und Login erfolgreich:', loginData.data);

    //return navigateTo('/dashboard/$data.user.userid');

  } catch (err) {
    console.error('Fehler bei Registrierung:', err)
  }
}

// Refs für die Formular-Eingabefelder
const email = ref('')
const password = ref('')

// Ref für Fehlermeldungen an den User
const errorMessage = ref<string | null>(null)




const login = async () => {
  errorMessage.value = null // Fehler zurücksetzen

  try {
   
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (authError) {
      
      errorMessage.value = authError.message
      console.error('Login-Fehler:', authError.message)
      return
    }

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    console.log("Warte 1000ms");
    await sleep(1000);

    
    const { data: profileData, error: profileError } = await useFetch('/api/user/me')

    if (profileError || !profileData.value) {
      
      errorMessage.value = "Anmeldung erfolgreich, aber Profil konnte nicht geladen werden."
      console.error('Profil-Fehler:', profileError.value)
      return
    }

    
    const prismaUserId = profileData.value.userid
    console.log('Login und Profilabruf erfolgreich. UserID:', prismaUserId)

    
    return navigateTo(`/dashboard/${prismaUserId}`)

  } catch (err: any) {
    errorMessage.value = err.message || "Ein unerwarteter Fehler ist aufgetreten."
    console.error('Unerwarteter Fehler:', err)
  }
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Logout-Fehler:', error.message)
  } else {
    console.log('Erfolgreich ausgeloggt')
    return navigateTo('/')
  }
}



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
