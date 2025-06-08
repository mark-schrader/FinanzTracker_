
<template>
  <form @submit.prevent="submit">
    <input v-model="firstname" placeholder="Vorname" required />
    <input v-model="lastname" placeholder="Nachname" required />
    <input v-model="university" placeholder="Uni" required />
    <input v-model="birthdate" type="date" required />
    <input v-model.number="startamount" type="number" placeholder="Startbetrag (€)" required />
    <input v-model="username" placeholder="Username" required />
    <input v-model="email" placeholder="Email" type="email" required />
    <input v-model="password" placeholder="Passwort" type="password" required />
    <button type="submit">Registrieren</button>
  </form>
</template>

<script setup>
import { ref } from 'vue' // ← wichtig!

const firstname = ref('')
const lastname = ref('')
const university = ref('')
const birthdate = ref('')
const startamount = ref(0)
const username = ref('')
const email = ref('')
const password = ref('')

async function submit() {
  console.log("Formular wurde abgeschickt")

  const payload = {
    firstname: firstname.value,
    lastname: lastname.value,
    university: university.value,
    birthdate: new Date(birthdate.value).toISOString(),
    startamount: Math.round(startamount.value * 100),
    username: username.value,
    email: email.value,
    password: password.value
  }

  console.log("Wird gesendet:", payload)

  try {
    const response = await $fetch('/api/user/create', {
      method: 'POST',
      body: payload
    })
    console.log("Erfolg:", response)
  } catch (err) {
    console.error("Fehler beim Speichern:", err)
  }
}
</script>