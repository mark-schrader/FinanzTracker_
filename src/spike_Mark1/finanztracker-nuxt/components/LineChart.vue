<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const chartData = {
  labels: ['Januar', 'Februar', 'März', 'April'],
  datasets: [
    {
      label: 'Ausgaben (€)',
      data: [420, 380, 500, 450],
      borderColor: '#42b983',
      backgroundColor: '#42b98355',
      tension: 0.3,
    },
  ],
}
</script>

<template>
  <Line :data="chartData" />
</template>
