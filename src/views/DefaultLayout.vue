<template>
  <div class="default-layout relative">
    <Background class="absolute inset-0 z-0 top-0" />
    <Navbar
      class="fixed top-0 left-0 right-0 z-100 transition-all"
      :class="{ 'left-[8vw]': isNavbarSmall, 'right-[8vw]': isNavbarSmall }"
    />
    <main class="relative z-10 rounded-b-[16rem]">
      <RouterView />
    </main>
    <Footer class="relative z-11" />
  </div>
</template>

<script setup lang="ts">
import Background from "@/components/Background.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import { useArchiveStore } from "@/stores/archive";
import { useWindowScroll } from "@vueuse/core";
import { computed, onMounted} from "vue";
import { RouterView } from "vue-router";

const { y } = useWindowScroll();
const isNavbarSmall = computed(() => y.value >= 10);
const archive = useArchiveStore()
onMounted(async()=>{
  await archive.refreshArchives()
  await archive.fetchArchiveDetail("OB5o22CBgfLBq")
  await archive.fetchStats()
})
</script>

<style scoped></style>
