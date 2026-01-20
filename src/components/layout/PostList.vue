<template>
  <div class="post-list">
    <BaseButton type="primary" :disabled="postStore.loading" @click="postStore.fetchPosts()">
      {{ postStore.loading ? '同步中...' : '刷新数据' }}
    </BaseButton>
    <PostCard v-for="post in postStore.formattedPosts" :key="post.id" :post="post"></PostCard>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/post'
const postStore = usePostStore()
onMounted(() => {
  if (!postStore.total) {
    postStore.fetchPosts()
  }
})
</script>

<style scoped lang="scss"></style>
