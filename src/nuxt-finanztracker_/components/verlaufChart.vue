<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
  } from 'chart.js'
import { computed } from 'vue'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

const props = defineProps({
  transactions: { type: Array, required: true }
})

// Euro-String in Zahl umwandeln
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

// Chart-Daten berechnen
const chartData = computed(() => {
  const sorted = [...props.transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

  const labels = []
  const data = []

  let kontostand = 0
  for (const t of sorted) {
    const value = parseEuro(t.amount)
    kontostand += t.type === 'Ausgabe' ? -Math.abs(value) : Math.abs(value)

    labels.push(new Date(t.date).toLocaleDateString('de-DE'))
    data.push(parseFloat(kontostand.toFixed(2)))
  }

  return {
    labels,
    datasets: [
      {
        label: 'Kontostand (€)',
        data,
        fill: true,
        tension: 0.35,
        borderWidth: 2,

        // Fallback-Farben (falls Segment-Callback mal nichts liefert)
        borderColor: '#2AA198',
        backgroundColor: 'rgba(42, 161, 152, 0.15)',

        // Punkte
        pointRadius: 4,
        pointHoverRadius: 6,

        // 👉 Dynamische Linienfarbe je Segment
        segment: {
          borderColor: ctx => {
            // ctx.p1 oder ctx.p0 können in bestimmten Situationen undefined sein
            const y1 = ctx?.p1?.parsed?.y
            const y0 = ctx?.p0?.parsed?.y

            // sicherstellen, dass wir eine Zahl haben
            const y =
              typeof y1 === 'number'
                ? y1
                : typeof y0 === 'number'
                ? y0
                : 0 // Fallback

            return y >= 0 ? '#2AA198' : '#ef4444'
          }
        },
        // Punkte dynamisch färben
        pointBackgroundColor: ctx => {
          const v = ctx?.parsed?.y
          if (typeof v !== "number") return "rgba(42,161,152,0.3)"
          return v >= 0 ? "rgba(42,161,152,0.3)" : "rgba(239, 68, 68, 0.3)"
        },

        pointBorderColor: ctx => {
          const v = ctx?.parsed?.y
          if (typeof v !== "number") return "rgba(42,161,152,0.3)"
          return v >= 0 ? "rgba(42,161,152,0.3)" : "rgba(239, 68, 68, 0.3)"
        },

        pointHoverBackgroundColor: ctx => {
          const v = ctx?.parsed?.y
          if (typeof v !== "number") return "#21897F"
          return v >= 0 ? "#21897F" : "#dc2626"
        },
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
  }
</style>
