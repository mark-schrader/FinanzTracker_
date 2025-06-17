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

function parseEuro(euroString) {
  if (!euroString) return 0
  let cleaned = euroString.replace(/[^0-9.,-]/g, '')
  if (cleaned.includes('.') && cleaned.includes(',')) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.')
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.')
  }
  return parseFloat(cleaned) || 0
}

// ✅ Chart data reactive
const chartData = computed(() => {
  const sorted = [...props.transactions].sort((a, b) => new Date(a.date) - new Date(b.date))

  const labels = []
  const data = []

  let kontostand = 0
  for (const t of sorted) {
    const value = parseEuro(t.amount)
    kontostand += (t.type === 'Ausgabe') ? -Math.abs(value) : Math.abs(value)
    labels.push(t.date)
    data.push(parseFloat(kontostand.toFixed(2)))
  }

  return {
    labels,
    datasets: [
      {
        label: 'Kontostand (€)',
        data,
        fill: true,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
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
      ticks: { autoSkip: true, maxTicksLimit: 6 },
      title: { display: true, text: 'Datum' }
    },
    y: {
      beginAtZero: false,
      title: { display: true, text: 'Saldo (€)' },
      ticks: { callback: val => `€ ${val}` }
    }
  }
}
</script>

<style scoped>
/* Optional: fix height */
canvas {
  height: 260px !important;
}
</style>
