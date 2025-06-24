<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue' 

const now = ref(new Date().toLocaleString()) 

let timer 

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date().toLocaleString()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer) //to clear the timer when the component is unmounted
})
</script>

<template>
  <div class="text-sm dark:text-gray-300">
    🕒 {{ now }}
  </div>
</template>
