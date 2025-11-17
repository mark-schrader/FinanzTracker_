<template>
  <div class="content-wrapper space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-brand-600 dark:text-brand-300">
        Dashboard: Account Balance
      </h1>
      <CurrentTime />
      <!-- Current time component -->
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Verlauf des Kontostands -->
      <div class="chart-box col-span-1 md:col-span-2">
        <h2 class="card-title text-brand-600 dark:text-brand-300 mb-4">
          Verlauf des Kontostands
        </h2>
        <verlaufChart :transactions="transactions" />
      </div>

      <!-- Einnahme nächste 7 Tage -->
      <div class="card flex flex-col items-center justify-center text-center">
        <p class="font-medium text-gray-800 dark:text-gray-200 mb-2">
          Einnahme nächste 7 Tage
        </p>
        <svg
          class="w-10 h-10 text-teal-500 dark:text-teal-300"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </div>

      <!-- Ausgabe nächste 7 Tage -->
      <div class="card flex flex-col items-center justify-center text-center">
        <p class="font-medium text-gray-800 dark:text-gray-200 mb-2">
          Ausgabe nächste 7 Tage
        </p>
        <svg
          class="w-10 h-10 text-red-500 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      <!-- Ausgaben pro Kategorie -->
      <div class="card flex flex-col items-center justify-center text-center">
        <p class="font-medium text-gray-800 dark:text-gray-200 mb-2">
          Ausgaben pro Kategorie
        </p>
        <svg
          class="w-10 h-10 text-yellow-500 dark:text-yellow-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 3v18m4-14h6M5 9h6m4 10h6M5 19h6"
          />
        </svg>
      </div>

      <!-- Individuelles Dashboard -->
      <div class="card flex flex-col items-center justify-center text-center">
        <p class="font-medium text-gray-800 dark:text-gray-200 mb-2">
          Individuelles Dashboard
        </p>
        <svg
          class="w-10 h-10 text-blue-500 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </div>

    <!-- Kontobewegungstabelle -->
    <bewegungstabelle :transactions="transactions" />
  </div>
</template>

<script setup>

// fetch direkt aufrufen — benutze userId query (camelCase) wie im Backend
const { data: transactions, error } = await useFetch('/api/transactions', {
  params: { userId: 1 } // <-- anpassen auf echten User
})

const search = ref('')

//Optional Debug:
console.log('TRANSACTIONS:', transactions.value)

const filteredTransactions = computed(() =>
  transactions.value.filter((t) =>
    Object.values(t).some((field) =>
      String(field).toLowerCase().includes(search.value.toLowerCase())
    )
  )
);
</script>

