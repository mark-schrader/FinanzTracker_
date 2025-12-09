<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  LineElement, PointElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

import { computed } from 'vue'

const props = defineProps({
  transactions: { type: Array, required: true }
})

// Hilfsfunktion: "1.234,56 €" → 1234.56
function parseEuro(euroString) {
  if (!euroString) return 0
  let cleaned = euroString.replace(/[^0-9.,]/g, '')

  if (cleaned.includes('.') && cleaned.includes(',')) {
    cleaned = cleaned.replace(/\./g, '')
    cleaned = cleaned.replace(',', '.')
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.')
  }

  const value = parseFloat(cleaned)
  return isNaN(value) ? 0 : value
}


// Intervall-fähige Ausgabe-Berechnung
// → nutzt automatisch NUR die gefilterten Transaktionen vom Dashboard
const chartData = computed(() => {
  // Nur Ausgaben wählen
  const expenses = props.transactions.filter(t => t.type === "Ausgabe")

  if (expenses.length === 0) {
    return {
      labels: [],
      datasets: [{
        label: "Ausgaben (€)",
        data: [],
        borderColor: "#f87171",
      }]
    }
  }

  // Einnahmen nach Datum gruppieren
  const map = new Map()

  expenses.forEach(t => {
    const d = new Date(t.date)
    const key = d.toISOString().split("T")[0]

    const amount = parseEuro(t.amount)
    map.set(key, (map.get(key) || 0) + amount)
  })

  // Chronologisch sortieren
  const sortedDates = Array.from(map.keys()).sort((a, b) => new Date(a) - new Date(b))

  // Labels formatiert
  const labels = sortedDates.map(d =>
    new Date(d).toLocaleDateString("de-DE", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit"
    })
  )

  const values = sortedDates.map(d => map.get(d))

  return {
    labels,
    datasets: [
      {
        label: "Ausgaben (€)",
        data: values,
        fill: true,
        borderColor: "#f87171",
        backgroundColor: "rgba(248, 113, 113, 0.3)",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  }
})


// Optionen für Chart.js
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: ctx => `€ ${ctx.formattedValue}`
      }
    }
  },
  scales: {
    x: { title: { display: true, text: "Tag" } },
    y: {
      beginAtZero: true,
      title: { display: true, text: "Ausgaben (€)" },
      ticks: { callback: v => `€ ${v}` }
    }
  }
}
</script>

<style scoped>
canvas {
  height: 260px !important;
  width: 100% !important;
}
</style>
