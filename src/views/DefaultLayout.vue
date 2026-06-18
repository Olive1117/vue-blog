<template>
  <div class="default-layout relative">
    <Background class="z-0" />
    <Navbar class="absolute top-0 left-0 right-0 z-100" />
    <main class="relative z-10 rounded-b-[4rem]">
      <RouterView />
    </main>
    <Footer class="absolute bottom-0 left-0 right-0 z-1" />
  </div>
</template>

<script setup lang="ts">
import Background from '@/components/Background.vue';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';

</script>

<style scoped>

</style>