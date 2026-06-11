<template>
  <div class="post-list">
    <!-- <BaseButton theme="primary" :disabled="postStore.loading" @click="postStore.refreshPosts()">
      {{ postStore.loading ? '同步中...' : '刷新数据' }}
    </BaseButton>
    <input type="text" border-1 /> -->
    <PostCard
      first:mt0
      last:mb0
      v-for="post in postStore.formattedPosts"
      :key="post.id"
      :post="post"
    ></PostCard>
    <div flex justify-between>
      <BaseButton
        w20
        theme="primary"
        :disabled="$route.query.page === '1' || $route.query.page === undefined"
        @click="
          $router.push({
            path: $route.path,
            query: { ...$route.query, page: (Number($route.query.page || 1) - 1).toString() },
          })
        "
      >
        <
      </BaseButton>

      <BaseButton
        theme="primary"
        aspect-square
        w10
        v-for="value in postStore.totalPages"
        :key="value"
        @click="
          $router.push({ path: $route.path, query: { ...$route.query, page: value.toString() } })
        "
      >
        {{ value }}
      </BaseButton>
      <BaseButton
        theme="primary"
        w20
        :disabled="Number($route.query.page || 1) >= postStore.totalPages"
        @click="
          $router.push({
            path: $route.path,
            query: { ...$route.query, page: (Number($route.query.page || 1) + 1).toString() },
          })
        "
      >
        >
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/post'
const postStore = usePostStore()
const route = useRoute()
console.log('route.query:', route.query)
watch(
  () => route.query,
  (newQuery) => {
    postStore.refreshPosts({ page: 1, page_size: 4, ...newQuery })
  },
  { immediate: true },
)
</script>

<style scoped lang="scss"></style>
