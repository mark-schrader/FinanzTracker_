async function submit() {
  console.log("Formular wurde abgeschickt")

  const data = {
    firstname: firstname.value,
    lastname: lastname.value,
    university: university.value,
    birthdate: new Date(birthdate.value).toISOString(),
    startamount: Math.round(startamount.value * 100),
    username: username.value,
    email: email.value,
    password: password.value
  }

  console.log('Wird gesendet:', data)

  try {
    const response = await $fetch('/api/user/create', {
      method: 'POST',
      body: data
    })
    console.log('User erfolgreich angelegt:', response)
  } catch (err) {
    console.error('Fehler beim Speichern:', err)
  }
}
