<template>
  <header
    class="header"
    h-16
    backdrop-blur-md
    border-b
    border-gray-200
    flex
    items-center
    justify-between
    px-6
    sticky
    top-0
    z-20
  >
    <div class="flex items-center gap-4">
      <button
        @click="$emit('toggle-sidebar')"
        class="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
      ></button>

      <!-- 面包屑 -->
      <nav class="hidden sm:flex items-center gap-2 text-sm text-gray-500">
        <span>首页</span>
        <span class="text-gray-900 font-medium">{{ pageTitle }}</span>
      </nav>
    </div>

    <div class="flex items-center gap-3">
      <!-- 搜索 -->
      <div class="relative">
        <!-- <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" /> -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="全局搜索..."
          class="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <!-- 通知 -->
      <!-- <button class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <Bell class="w-5 h-5 text-gray-600" />
        <span
          class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"
        ></span>
      </button> -->
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/admin': '仪表盘',
    '/admin/posts': '文章管理',
    '/admin/posts/create': '新建文章',
    '/admin/tags': '标签分类',
    '/admin/users': '用户管理',
    '/admin/settings': '系统设置',
  }
  return titles[route.path] || '管理后台'
})
const searchQuery = ref('')
</script>

<style scoped lang="scss"></style>
