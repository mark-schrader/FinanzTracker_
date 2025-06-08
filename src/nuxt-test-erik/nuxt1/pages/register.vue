
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