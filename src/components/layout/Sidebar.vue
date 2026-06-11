<template>
  <aside
    class="sidebar"
    w-64
    h-screen
    bg-slate-900
    text-white
    flex
    flex-col
    fixed
    left-0
    top-0
    z-30
  >
    <div class="h-16 flex items-center px-6 border-b border-slate-700">
      <span class="text-xl font-bold tracking-tight">Blog Admin</span>
    </div>

    <!-- 导航菜单 -->
    <nav class="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
      <RouterLink
        v-for="item in ADMIN_MENU"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          isActive(item.path)
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
            : 'text-slate-400 hover:text-white hover:bg-slate-800',
        ]"
      >
        <component :is="item.icon" class="w-[18px] h-[18px]" />
        {{ item.label }}
      </RouterLink>
    </nav>

    <!-- 底部用户信息 -->
    <div class="mt-auto p-4 border-t border-slate-700">
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold"
        >
          {{ userStore.userInfo?.avatar }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">{{ userStore.userInfo?.username }}</p>
          <p class="text-xs text-slate-400 truncate">{{ userStore.userInfo?.email }}</p>
        </div>
        <button
          class="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        ></button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ADMIN_MENU } from '@/constants/config/menu'
import { useUserStore } from '@/stores/user'
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const isActive = (path: string) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}
</script>

<style scoped lang="scss"></style>
