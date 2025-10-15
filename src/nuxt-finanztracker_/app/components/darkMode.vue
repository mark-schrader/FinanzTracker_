<script setup>
import { ref, onMounted, watchEffect } from 'vue'

const isDark = ref(false)

onMounted(() => {
  if (process.client) {
    isDark.value = localStorage.getItem('theme') === 'dark'
  }
})

watchEffect(() => {
  if (!process.client) return

  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
})

const handleChange = (e) => {
  isDark.value = e.target.checked
}
</script>

<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only peer"
      :checked="isDark.value"
      @change="handleChange"
    />
    <div class="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-black transition-colors duration-200"></div>
    <div class="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
  </label>
</template>
