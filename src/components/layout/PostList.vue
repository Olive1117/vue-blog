<template>
  <div class="post-list">
    <!-- <BaseButton theme="primary" :disabled="postStore.loading" @click="postStore.refreshPosts()">
      {{ postStore.loading ? '同步中...' : '刷新数据' }}
    </BaseButton> -->
    <PostCard
      first:mt0
      last:mb0
      v-for="post in postStore.formattedPosts"
      :key="post.id"
      :post="post"
    ></PostCard>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/post'
const postStore = usePostStore()
onMounted(() => {
  if (!postStore.total) {
    postStore.refreshPosts()
  }
})
</script>

<style scoped lang="scss"></style>
