<template>
  <div class="page-bg">
    <AppHeader />

    <main class="main-content">
      <!--Welcome text-->
      <div class="right">
        <p class="text-1"><strong>WILLKOMMEN IN PLEITEGEIER!</strong></p>
        <p class="text-2">
          👩🏻‍💻 Viele Studierende stehen vor der Herausforderung, ihre Finanzen im
          Griff zu behalten – unerwartete Ausgaben, begrenzte Mittel und der
          Überblick geht schnell verloren.
        </p>
        <p class="text-3"><strong> 💡 Unsere Lösung → </strong></p>
        <p class="text-4">
          Eine kostenlose und intuitive App, speziell für junge Menschen
          entwickelt. Pleitegeier hilft dir, Einnahmen und Ausgaben zu
          verwalten, Budgets zu erstellen und deine Sparziele zu erreichen –
          einfach, übersichtlich und komplett kostenlos 🤩
        </p>
        <p class="text-5"><strong> 🌎 Unser Ziel → </strong></p>
        <p class="text-6">
          Finanzielle Selbstbestimmung für alle – ganz egal, wie viel (oder
          wenig) gerade auf dem Konto ist.
        </p>
        <p class="text-7">
          Worauf wartest du noch? Melde dich jetzt an und mach deine Finanzen
          endlich stressfrei! 🥳
        </p>
      </div>
      <!--Forms and buttons-->
      <div class="left">
        <button class="signIn" @click="openLogin()">Sign In</button>
        <button class="signUp" @click="openRegister()">Sign Up</button>
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
          <form class="form-container" @submit.prevent="register">
          <form class="form-container" @submit.prevent="register">
            <h1 class="register-text">Register →</h1>
            <label for="fname">Vorname</label>
            <input type="text" name="fname" id="fname" v-model="form.firstname" />

            <label for="lname">Nachname</label>
            <input type="text" name="lname" id="lname" v-model="form.lastname" />

            <label for="uni">Universität</label>
            <select id="uni" name="uni" v-model="form.university">
              <option value="htw">HTW Dresden</option>
              <option value="tu">TU Dresden</option>
              <option value="fh">Fachhochschule Dresden</option>
              <option value="hm">
                Hochschule für Musik Carl Maria von Weber Dresden
              </option>
            </select>

            <label for="bday">Geburtstag</label>
            <input type="date" name="bday" id="bday" v-model="form.birthdate" />

            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              v-model="form.email"
              required
            />

            <label for="psw">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              v-model="form.password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Muss mindestens eine Zahl und einen Groß- und Kleinbuchstaben sowie mindestens 8 oder mehr Zeichen enthalten"
              required
            />
            <button class="registerBtn" type="submit">Register</button>
          </form>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style>
.page-bg {
  /* height: 100%; */
  min-height: 100vh;
  background: url("~/public/background.png") no-repeat center center;
  background-size: cover;
  display: flex;
}
.main-content {
  flex: 1;
  padding: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
}
.right,
.left {
  flex: 1;
  max-width: 50%;
  box-sizing: border-box;
}
.right {
  padding: 10px;
  width: 50xp;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
}
.left {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
}
/* */
.text-1 {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 35px;
  color: rgb(218, 235, 244);
  margin-bottom: 50px;
}
.text-2,
.text-3,
.text-4,
.text-5,
.text-6,
.text-7 {
  margin-bottom: 1rem;
  font-family: Georgia, serif;
  font-size: 18px;
  color: rgb(20, 44, 51);
}
.signIn,
.signUp {
  width: 130px;
  height: 40px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s ease;
}
button:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 2px 0 rgba(52, 50, 50, 0.24);
}
/*The login box styling*/
.form-container-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  /* positions the wrapper box on the left side */
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  font-family: Georgia, "Times New Roman", Times, serif;
}
.loginPopup {
  width: 100%;
  height: 100%;
  margin: 100px;
  padding: 100px;
}
.registerPopup {
  width: 50%;
  margin: 25px;
  padding: 30px;
}
.form-container {
  display: flex;
  flex-direction: column; /* positions everything in a column */
  gap: 15px;
}
.login-text,
.register-text {
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-bottom: 20px;
}
.closeBtn {
  position: absolute;
  top: 20px;
  right: 10px;
  background: white;
  border: none;
  font-size: large;
  padding: 5px;
}
.submitBtn,
.registerBtn {
  bottom: 50px;
  right: 20px;
  width: 50%;
  border: none;
  border-radius: 5px;
  background: rgb(108, 187, 105);
  margin: 5px;
  padding: 5px;
}
input,
select {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>

<script setup lang="ts">

import AppFooter from "~/components/AppFooter.vue";
import AppHeader from "~/components/AppHeader.vue";
import { reactive, ref } from "vue";
//import { useRouter } from 'vue-router';
import { navigateTo } from '#app';

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
