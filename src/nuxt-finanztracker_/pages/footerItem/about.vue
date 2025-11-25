<script setup>
useHead({
  title: 'Über uns · Pleitegeier',
  meta: [
    {
      name: 'description',
      content:
        'Erfahre mehr über das Ziel und die Idee hinter Pleitegeier – der Finanz-App für Studierende.',
    },
  ],
})
</script>

<template>
  <section class="content-wrapper text-gray-800 dark:text-gray-200">
    <h1 class="text-4xl font-bold mb-6 text-brand-600 dark:text-brand-300">
      Über Pleitegeier
    </h1>

    <p class="text-lg mb-6 leading-relaxed">
      <strong class="text-brand-600 dark:text-brand-300">Pleitegeier</strong>
      ist eine Web-App, die von Studierenden für Studierende entwickelt wurde –
      mit dem Ziel, das Finanzmanagement im Alltag einfacher, transparenter und
      zugänglicher zu gestalten. Die Anwendung hilft dabei, Einnahmen und
      Ausgaben im Blick zu behalten, Budgets zu erstellen und langfristig
      bessere finanzielle Entscheidungen zu treffen.
    </p>

    <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-3">
      Unsere Motivation
    </h2>
    <p class="mb-6 leading-relaxed">
      Viele Studierende haben Schwierigkeiten, ihre Finanzen zu überblicken –
      sei es wegen unregelmäßiger Einnahmen, unerwarteter Kosten oder fehlender
      Struktur.
      <span class="text-brand-600 dark:text-brand-300 font-medium">
        Pleitegeier
      </span>
      will genau hier ansetzen: mit einem klaren, intuitiven Interface und Tools,
      die Spaß machen und gleichzeitig zum Nachdenken über das eigene
      Konsumverhalten anregen.
    </p>

    <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-3">
      Was macht Pleitegeier besonders?
    </h2>
    <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
      <li>Minimalistisches, responsives Design</li>
      <li>Kategorisierte Budgetübersicht mit interaktiven Visualisierungen</li>
      <li>Von Studierenden entwickelt – nah an der Zielgruppe</li>
      <li>Datenschutzfreundlich und transparent</li>
      <li>Integration mit modernen Tools wie <span class="link-primary">Tailwind CSS</span> und <span class="link-primary">Nuxt 3</span></li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-3">
      Technologie
    </h2>
    <p class="leading-relaxed">
      Pleitegeier basiert auf
      <span class="link-primary">Nuxt 3</span> (Vue 3 Framework) mit
      <span class="link-primary">Tailwind CSS</span> für das Styling und nutzt
      moderne Web-APIs für Performance und Dark-Mode-Unterstützung. Daten werden
      sicher verarbeitet, ohne unnötige Cookies oder Tracking.
    </p>

    <p class="text-sm text-gray-500 dark:text-gray-400 mt-10">
      Letzte Aktualisierung: Oktober 2025
    </p>
  </section>
</template>
