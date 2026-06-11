<template>
  <div class="posts">
    <!-- 页面标题 -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">文章管理</h1>
        <p class="text-sm text-gray-500 mt-1">共 {{ postStore.total }} 篇文章</p>
      </div>
      <RouterLink
        to="/admin/posts/create"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm shadow-blue-200"
      >
        新建文章
      </RouterLink>
    </div>

    <!-- 数据表格 -->
    <div bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-50 text-gray-600 font-medium">
            <tr>
              <th class="px-6 py-4 w-12">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th class="px-6 py-4">文章信息</th>
              <th class="px-6 py-4">分类</th>
              <th class="px-6 py-4">状态</th>
              <th class="px-6 py-4">数据</th>
              <th class="px-6 py-4">发布时间</th>
              <th class="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="post in postStore.posts"
              :key="post.id"
              class="hover:bg-gray-50 transition-colors group"
            >
              <td class="px-6 py-4">
                <input
                  type="checkbox"
                  v-model="selectedIds"
                  :value="post.id"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="min-w-0">
                    <p class="font-medium text-gray-900 truncate max-w-[200px]">{{ post.title }}</p>
                    <p class="text-gray-500 text-xs mt-0.5">ID: #{{ post.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                  {{ post.category }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                    post.state ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600',
                  ]"
                >
                  <span
                    :class="[
                      'w-1.5 h-1.5 rounded-full',
                      post.state ? 'bg-green-500' : 'bg-amber-500',
                    ]"
                  ></span>
                  {{ post.state ? '已发布' : '禁用' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-4 text-xs text-gray-500">
                  <span class="flex items-center gap-1">
                    {{ post.short_id }}
                  </span>
                  <span class="flex items-center gap-1">
                    {{ post.desc }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-500 text-xs">
                {{ post.created_at_display }}
              </td>
              <td class="px-6 py-4">
                <div
                  class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    @click="viewPost(post)"
                    class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="预览"
                  >
                    <p>预览</p>
                  </button>
                  <RouterLink
                    :to="`/admin/posts/edit/${post.id}`"
                    class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    title="编辑"
                  >
                    <p>编辑</p>
                  </RouterLink>
                  <button
                    @click="deletePost(post)"
                    class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="删除"
                  >
                    <p>删除</p>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/post'
const route = useRoute()
const postStore = usePostStore()
watch(
  () => route.query,
  (newQuery) => {
    postStore.refreshPosts({ page: 1, page_size: 50, ...newQuery })
  },
  { immediate: true },
)
const selectedIds = ref([])
const viewPost = (post: { id: string }) => {
  window.open(`/post/${post.id}`, '_blank')
}

const deletePost = (post: { id: string; title: string }) => {
  if (confirm(`确定要删除文章《${post.title}》吗？`)) {
    postStore.posts = postStore.posts.filter((p) => p.id !== post.id)
  }
}
</script>

<style scoped lang="scss"></style>
