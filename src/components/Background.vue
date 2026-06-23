<template>
  <div class="background ">
      <div class="absolute inset-0 mask-[url('@/assets/i-like-food.svg')] bg-[#e3769b]/10 z-1"></div>
      <div class="absolute inset-0 bg-white z-0"></div>
    <!-- <div class="w-full h-full bg"></div> -->
    <!-- <img class="w-full h-full stroke-current text-[#e3769b]]" src="@/assets/i-like-food.svg" alt="背景"> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg {
background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fee8ee' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
