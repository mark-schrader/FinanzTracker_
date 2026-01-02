<template> 
  <transition
    name="fade-slide"
    appear
  >
    <div
      v-if="message"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             px-5 py-3 rounded-xl shadow-xl text-base font-medium z-[9999]
             backdrop-blur-md border"
      :class="type === 'success' 
        ? 'bg-teal-50/90 text-teal-700 border-teal-300' // Erfolgsmeldung
        : 'bg-red-50/90 text-red-700 border-red-300'"> <!-- Fehlermeldung -->
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
defineProps({
  message: String,
  type: { type: String, default: 'success' }
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease; 
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translate(-50%, -60%);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translate(-50%, -50%);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%);
}
</style>
