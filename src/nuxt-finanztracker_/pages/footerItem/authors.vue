<script setup>
useHead({
  title: "Authors · Pleitegeier",
  meta: [
    {
      name: "description",
      content: "Lerne das Team hinter Pleitegeier kennen",
    },
  ],
});

const team = [
  {
    name: "Til Guhlmann",
    email: "til.guhlmann@stud.htw-dresden.de",
    role: "Product Owner",
    fun: "Ist schneller im Discord als der Ping ⚡",
  },
  {
    name: "Enna Scheer",
    email: "enna.scheer@stud.htw-dresden.de",
    role: "Scrum Master",
    fun: "Hat immer den vollen Überblick und erinnert dich ans Meeting, bevor du es vergisst 🎯",
  },
  {
    name: "Khanh Ly La",
    email: "khanhly.la@stud.htw-dresden.de",
    role: "Dev-Team, Frontend",
    fun: "Wenn ein Button nicht rund ist, weine ich 😢",
  },
  {
    name: "Emujin Uuganbayar",
    email: "emujin.uuganbayar@stud.htw-dresden.de",
    role: "Dev-Team, Frontend",
    fun: "Hat das Protokoll meistens schon geschrieben, bevor das Meeting vorbei ist 😉",
  },
  {
    name: "Mark Schrader",
    email: "mark.schrader@stud.htw-dresden.de",
    role: "Dev-Team, Backend",
    fun: "Sorgt dafür, dass alles funktioniert – auch wenn es keiner sieht ✨",
  },
  {
    name: "Erik Vogt",
    email: "erik.vogt@stud.htw-dresden.de",
    role: "Dev-Team, Backend",
    fun: "Findet Bugs, bevor sie entstehen 🐞",
  },
  {
    name: "Justus Müller",
    email: "justus.mueller@stud.htw-dresden.de",
    role: "Dev-Team, Backend",
    fun: "Kein Bug zu groß, kein Bier zu kalt 🍺",
  },
];
</script>

<template>
  <section class="content-wrapper text-gray-800 dark:text-gray-200">
    <h1 class="text-4xl font-bold mb-6 text-brand-600 dark:text-brand-300">
      Unser Team
    </h1>

    <p class="text-lg mb-8 leading-relaxed">
      <strong class="text-brand-600 dark:text-brand-300">Pleitegeier</strong>
      ist eine smarte Plattform, die Studierenden hilft, ihre Finanzen im Griff
      zu behalten. Unser Ziel ist es, das Finanzmanagement für junge Menschen
      einfacher, transparenter und nachhaltiger zu gestalten – mit praktischen
      Tools, smarten Empfehlungen und einem starken Team im Hintergrund.
    </p>

    <ul class="space-y-4">
      <li
        v-for="member in team"
        :key="member.email"
        class="card flex items-start gap-4 hover:shadow-lg transition-shadow duration-200"
      >
        <!-- Avatar -->
        <div
          class="avatar bg-brand-600 dark:bg-brand-400 text-white dark:text-gray-900 font-semibold text-sm mt-1"
        >
          {{ member.name.split(" ")[0][0] }}{{ member.name.split(" ")[1][0] }}
        </div>

        <!-- Info -->
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <strong class="text-gray-900 dark:text-gray-100 text-base">
              {{ member.name }}
            </strong>
            <span class="text-xs text-gray-500 italic">– {{ member.fun }}</span>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-400 mb-1 italic">
            {{ member.role }}
          </p>

          <div class="flex items-center gap-2 text-sm">
            <span class="text-lg">📧</span>
            <a :href="`mailto:${member.email}`" class="link-primary">
              {{ member.email }}
            </a>
          </div>
        </div>
      </li>
    </ul>

    <p class="mt-12 text-sm text-gray-500 dark:text-gray-400 text-center">
      Danke, dass du Pleitegeier verwendest!
    </p>
  </section>
</template>
