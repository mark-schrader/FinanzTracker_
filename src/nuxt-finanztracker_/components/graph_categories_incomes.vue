<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

import { computed } from 'vue'

const props = defineProps({
  transactions: { type: Array, required: true }
})

// Helper: parse Euro formatted strings to number
function parseEuro(euroString) {
  if (!euroString) return 0
  let cleaned = euroString.replace(/[^0-9.,-]/g, '')
  if (cleaned.includes('.') && cleaned.includes(',')) {
    cleaned = cleaned.replace(/\./g, '')
    cleaned = cleaned.replace(',', '.')
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.')
  }
  const value = parseFloat(cleaned)
  return isNaN(value) ? 0 : value
}

// Compute sums per category and sort ascending (smallest left, largest right)
const chartData = computed(() => {
  const sums = new Map()
  for (const t of props.transactions || []) {
    if (t.type === 'Einnahme') {
      const category = t.category || 'Unkategorisiert'
      const amount = parseEuro(t.amount)
      sums.set(category, (sums.get(category) || 0) + amount)
    }
  }

  // Convert to array and sort by value ascending
  const entries = Array.from(sums.entries())
    .sort((a, b) => a[1] - b[1])

  const labels = entries.map(e => e[0])
  const data = entries.map(e => parseFloat(e[1].toFixed(2)))

  return {
    labels,
    datasets: [
      {
        label: 'Einnahmen (€)',
        data,
        backgroundColor: 'rgba(59, 130, 246, 0.3)', // blue-500
        borderRadius: 6,
        barThickness: 'flex'
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
        label: ctx => `€ ${Number(ctx.parsed.y).toFixed(2)}`
      }
    }
  },
  scales: {
    x: {
      title: { display: true, text: 'Kategorie' },
      ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 }
    },
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Einnahmen (€)' },
      ticks: {
        callback: val => `€ ${val}`
      }
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
