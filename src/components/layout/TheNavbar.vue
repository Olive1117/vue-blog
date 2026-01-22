<template>
  <header w-full flex items-center justify-between px4 py2 sticky top-0 class="bg-white/80">
    <BaseButton text-xl gap4 @click="authStore.showLogin()">
      <template #icon>
        <BaseAvatar :value="userStore.userInfo?.avatar" type="primary"></BaseAvatar>
      </template>
      {{ userStore.isLoggedIn ? userStore.userInfo?.username : '登录' }}
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
      <BaseButton v-if="userStore.isLoggedIn" @click="userStore.logout()">登出</BaseButton>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { NAV_MENU, NAV_MENU_RIGHT } from '@/constants/config/menu'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const authStore = useAuthStore()
</script>

<style scoped lang="scss"></style>
