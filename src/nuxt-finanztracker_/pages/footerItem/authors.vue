<script setup>
useHead({
  title: 'Authors · Pleitegeier',
  meta: [
    { name: 'description', content: 'Lerne das Team hinter Pleitegeier kennen' }
  ]
})

//Ihr könnt hier die Beschreibung bzw. fun fact anpassen
const team = [
  { name: 'Til Guhlmann', email: 'til.guhlmann@stud.htw-dresden.de', role: 'Product Owner', fun: 'Ist schneller im Discord als der Ping ⚡' },
  { name: 'Enna Scheer', email: 'enna.scheer@stud.htw-dresden.de', role: 'Scrum Master', fun: 'Hat immer den vollen Überblick und erinnert dich ans Meeting, bevor du es vergisst 🎯' },
  { name: 'Khanh Ly La', email: 'khanhly.la@stud.htw-dresden.de', role: 'Dev-Team, Frontend', fun: 'Wenn ein Button nicht rund ist, weine ich 😢' },
  { name: 'Emujin Uuganbayar', email: 'emujin.uuganbayar@stud.htw-dresden.de', role: 'Dev-Team, Frontend', fun: 'Hat das Protokoll meistens schon geschrieben, bevor das Meeting vorbei ist 😉' },
  { name: 'Mark Schrader', email: 'mark.schrader@stud.htw-dresden.de', role: 'Dev-Team, Backend', fun: 'Sorgt dafür, dass alles funktioniert – auch wenn es keiner sieht ✨' },
  { name: 'Erik Vogt', email: 'erik.vogt@stud.htw-dresden.de', role: 'Dev-Team, Backend', fun: 'Findet Bugs, bevor sie entstehen 🐞' },
  { name: 'Justus Müller', email: 'justus.mueller@stud.htw-dresden.de', role: 'Dev-Team, Backend', fun: 'Kein Bug zu groß, kein Bier zu kalt 🍺' },
]
</script>

<template>
  <section class="container m-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-4 text-yellow-700">Wir sind Budget Buddy</h1>

    <p class="text-lg mb-6 text-gray-800">
      Pleitegeier ist eine smarte Plattform, die Studierenden hilft, ihre Finanzen im Griff zu behalten.
      Unser Ziel ist es, das Finanzmanagement für junge Menschen einfacher, transparenter und nachhaltiger zu gestalten –
      mit praktischen Tools, smarten Empfehlungen und einem starken Team im Hintergrund.
    </p>

    <h2 class="text-2xl font-semibold mt-10 mb-4 text-gray-900">Unser Team</h2>
    <ul class="space-y-4">
      <li
        v-for="member in team"
        :key="member.email"
        class="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex items-start gap-4"
      >
        <!-- Avatar -->
        <div
          class="w-10 h-10 rounded-full bg-yellow-600 text-white flex items-center justify-center text-sm font-semibold mt-1"
        >
          {{ member.name.split(' ')[0][0] }}{{ member.name.split(' ')[1][0] }}
        </div>

        <!-- Informationen -->
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <strong class="text-gray-900 text-base">{{ member.name }}</strong>
            <span class="text-xs text-gray-500 italic">– {{ member.fun }}</span>
          </div>
          <p class="text-sm text-gray-600 mb-1 italic">{{ member.role }}</p>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-lg">📧</span>
            <a :href="`mailto:${member.email}`" class="text-blue-600 hover:underline">
              {{ member.email }}
            </a>
          </div>
        </div>
      </li>
    </ul>

    <p class="mt-12 text-sm text-gray-500 text-center">
      Danke, dass du Pleitegeier verwendest!
    </p>
  </section>
</template>
