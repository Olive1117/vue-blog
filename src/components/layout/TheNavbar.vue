<template>
  <header w-full flex items-center justify-between px4 py2 sticky top-0 class="bg-white/80">
    <BaseButton>
      <template #icon>
        <BaseAvatar></BaseAvatar>
      </template>
      olive
    </BaseButton>
    <ul flex items-center justify-between gap2>
      <li v-for="(value, index) in NAV_MENU" :key="index">
        <BaseButton :to="value.path" tag="RouterLink" :icon="value.icon">
          {{ value.name }}
        </BaseButton>
      </li>
    </ul>
    <ul flex items-center justify-between gap2>
      <li v-for="(value, index) in NAV_MENU_RIGHT" :key="index">
        <BaseButton :icon="value.icon" rounded-full></BaseButton>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { NAV_MENU, NAV_MENU_RIGHT } from '@/constants/config/menu'
</script>

<style scoped lang="scss"></style>
