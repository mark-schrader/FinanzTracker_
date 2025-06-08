async function submit() {
  console.log("Formular wurde abgeschickt")

  try {
    const response = await $fetch('/api/user/create', {
      method: 'POST',
      body: {
        firstname: firstname.value,
        lastname: lastname.value,
        university: university.value,
        birthdate: new Date(birthdate.value).toISOString(),
        startamount: Math.round(startamount.value * 100),
        username: username.value,
        email: email.value,
        password: password.value
      }
    })
    console.log("Antwort von API:", response)
  } catch (error) {
    console.error("Fehler beim Senden:", error)
  }
}
