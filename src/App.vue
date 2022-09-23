<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(200px);
}

.slide-left-enter-active {
  transition: 0.3s ease-out;
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-200px);
}

.slide-right-enter-active {
  transition: 0.3s ease-out;
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
</style>
