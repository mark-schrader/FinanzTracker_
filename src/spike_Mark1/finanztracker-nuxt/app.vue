<script setup>
import LineChart from '~/components/LineChart.vue'

const hello = await $fetch('/api/hello')
const einnahmen = await $fetch('/api/einnahmen')
const ausgaben = await $fetch('/api/ausgaben')
</script>

<template>
  <h1>FinanzTracker</h1>
  <p>{{ hello.message }}</p>

  <h2>Einnahmen:</h2>
  <ul>
    <li v-for="e in einnahmen" :key="e.id">
      {{ e.quelle }}: {{ e.betrag }}€ am {{ e.datum }}
    </li>
  </ul>

  <h2>Ausgaben:</h2>
  <ul>
    <li v-for="a in ausgaben" :key="a.id">
      {{ a.kategorie }}: {{ a.betrag }}€ am {{ a.datum }}
    </li>
  </ul>

  <LineChart />
</template>
