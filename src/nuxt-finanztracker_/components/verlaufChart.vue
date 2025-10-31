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

//Fkt. für aktuellen Kontostand (Kopie von Bewegungen.vue)
function parseEuro(euroString) {
  if (!euroString) return 0

  // Entferne alles außer Ziffern, Komma, Punkt (Vorzeichen bewusst NICHT übernehmen)
  let cleaned = euroString.replace(/[^0-9.,]/g, '')

  if (cleaned.includes('.') && cleaned.includes(',')) {
    cleaned = cleaned.replace(/\./g, '') // Tausenderpunkt entfernen
    cleaned = cleaned.replace(',', '.') // Dezimalzeichen anpassen
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.')
  }

  const value = parseFloat(cleaned)
  return isNaN(value) ? 0 : value
}

// Chart data, sortiert nach Datum und berechnet den Kontostand 
const chartData = computed(() => {
  // Sortiere die Transaktionen nach Datum aufsteigend
  const sorted = [...props.transactions].sort((a, b) => new Date(a.date) - new Date(b.date))

  const labels = [] // Array für die X-Achse (Datum)
  const data = [] // Array für die Y-Achse (Kontostand)

  let kontostand = 0
  for (const t of sorted) {
    const value = parseEuro(t.amount)
    kontostand += (t.type === 'Ausgabe') ? -Math.abs(value) : Math.abs(value)
    
     labels.push(new Date(t.date).toLocaleDateString('de-DE')) // Formatieren als deutsches Datum dd.mm.yyyy

    data.push(parseFloat(kontostand.toFixed(2))) 
  }

  return { //für line chart
    labels, // X-Achse, also Datum
    datasets: [
      {
        label: 'Kontostand (€)',
        data,
        fill: true,
        borderColor: '#2dd4bf', // teal-400
        backgroundColor: 'rgba(45, 212, 191, 0.15)', // teal-400 transparent
        pointBackgroundColor: '#2dd4bf',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#14b8a6', // teal-500
        tension: 0.35, // sanfte Kurven
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
      ticks: { autoSkip: true, maxTicksLimit: 6 }, //max. 6 Labels auf der X-Achse
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
