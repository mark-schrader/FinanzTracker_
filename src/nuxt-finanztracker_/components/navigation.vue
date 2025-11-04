<template>
  <ul class="flex gap-6 text-sm font-semibold">
    <li v-for="(item, i) in navItems" :key="i">
      <NuxtLink
        :to="item.href"
        :class="['nav-link', route.path === item.href ? 'nav-link-active' : '']"
      >
        {{ item.label }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

defineProps({
  navItems: {
    type: Array,
    required: true
  }
})
</script>
