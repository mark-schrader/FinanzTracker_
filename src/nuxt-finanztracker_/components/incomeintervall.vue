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

//Euro-String zu Float
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


//Intervall-fähige Einnahmen-Berechnung
// -> nutzt einfach alle übergebenen und bereits gefilterten Transaktionen
const chartData = computed(() => {
  // Nur Einnahmen verwenden
  const incomes = props.transactions.filter(t => t.type === "Einnahme")

  // Wenn es keine Daten gibt → leeren Chart zurückgeben
  if (incomes.length === 0) {
    return {
      labels: [],
      datasets: [{
        label: "Einnahmen (€)",
        data: [],
        borderColor: "#3b82f6",
      }]
    }
  }

  // Gruppiere Einnahmen nach Datum
  const map = new Map()

  incomes.forEach(t => {
    const d = new Date(t.date)
    const key = d.toISOString().split("T")[0] // yyyy-mm-dd

    const amount = parseEuro(t.amount)
    map.set(key, (map.get(key) || 0) + amount)
  })

  // Datum chronologisch sortieren
  const sortedDates = Array.from(map.keys()).sort((a, b) => new Date(a) - new Date(b))

  // Labels formatiert anzeigen
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
        label: "Einnahmen (€)",
        data: values,
        fill: true,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  }
})


// Chart Optionen
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
      title: { display: true, text: "Einnahmen (€)" },
      ticks: { callback: v => `€ ${v}` }
    }
  }
}
</script>

<style scoped>
canvas {
  height: 260px !important;
}
</style>
