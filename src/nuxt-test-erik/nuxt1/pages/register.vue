
<template>
  <form @submit.prevent="submit">
    <input v-model="firstname" placeholder="Vorname" required />
    <input v-model="lastname" placeholder="Nachname" required />
    <input v-model="university" placeholder="Uni" required />
    <input v-model="birthdate" type="date" required />
    <input v-model.number="startamount" type="number" placeholder="Startbetrag (€)" required />
    <input v-model="username" placeholder="Username" required />
    <input v-model="email" type="email" required />
    <input v-model="password" type="password" required />
    <button type="submit">Registrieren</button>
  </form>
</template>

<script setup>
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
  const response = await $fetch('/api/user/create', {
    method: 'POST',
    body: {
      firstname,
      lastname,
      university,
      birthdate: new Date(birthdate.value).toISOString(),
      startamount: Math.round(startamount.value * 100), // € → Cent
      username,
      email,
      password
    }
  })
  console.log('User angelegt:', response)
}
</script>