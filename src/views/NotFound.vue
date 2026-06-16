<template>
  <div class="not-found flex flex-col items-center justify-center h-screen gap-4">
      <img :src="bocchi" alt="bocchi" />
      <a class="text-3xl font-bold underline" href="/">404 - Page Not Found</a>
  </div>
</template>

<script setup lang="ts">
import bocchi from '@/assets/小小波奇_透明.png'
</script>

<style scoped>

</style>