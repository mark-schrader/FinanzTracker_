<template>
  <ul class="flex flex-nowrap justify-center space-x-4">
    <li v-for="(item, i) in navItems" :key="i">
      <a
        :href="item.href"
        :class="[
          'px-2 text-sm hover:underline',
          item.active ? 'text-gray-600' : 'text-gray-800'
        ]"
      >
        {{ item.label }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
};
</script>
