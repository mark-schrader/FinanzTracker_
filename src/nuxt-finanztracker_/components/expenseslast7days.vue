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

// Hilfsfunktion für Euro-Strings → Zahl
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

// Chart-Daten berechnen: Ausgaben der nächsten 7 Tage
const chartData = computed(() => {
  const today = new Date()
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    return d
  }).reverse()

  // Tagesweise Ausgaben berechnen
  const dailyExpenses = next7Days.map(date => {
    const dayStr = date.toISOString().split('T')[0]
    const expensesForDay = props.transactions
      .filter(t => {
        const tDate = new Date(t.date).toISOString().split('T')[0]
        return tDate === dayStr && t.type === 'Ausgabe'
      })
      .reduce((sum, t) => sum + parseEuro(t.amount), 0)
    return expensesForDay
  })

  return {
    labels: next7Days.map(d =>
      d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' })
    ),
    datasets: [
      {
        label: 'Ausgaben (€)',
        data: dailyExpenses,
        fill: true,
        borderColor: '#f87171', // rot
        backgroundColor: 'rgba(248, 113, 113, 0.3)',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  }
})

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
    x: {
      title: { display: true, text: 'Tag' }
    },
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Ausgaben (€)' },
      ticks: { callback: val => `€ ${val}` }
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
