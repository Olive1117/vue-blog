<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from './stores/user'

const userStore = useUserStore()
onMounted(() => {
  if (userStore.isLoggedIn) {
    userStore.fetchUserInfo()
  }
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  color: #2c3e50;
}
</style>
