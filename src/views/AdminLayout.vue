<template>
  <div hvh wvw class="admin-layout">
    <Sidebar />
    <div class="lg:ml-64 min-h-screen flex flex-col">
      <Header @toggle-sidebar="sidebarOpen = true" />
      <main class="flex-1 p-6">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const sidebarOpen = ref(true)
</script>

<style scoped lang="scss"></style>
