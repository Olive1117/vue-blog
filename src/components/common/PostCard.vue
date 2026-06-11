<template>
  <div
    wfull
    my4
    p4
    bg-white
    flex
    flex-col
    gap2
    tag="RouterLink"
    @click="router.push({ name: 'post', params: { id: post.short_id } })"
    ref="postCard"
    class="post-card"
  >
    <div flex items-end gap8>
      <h1 text-3xl font-bold font-serif>{{ post.title }}</h1>
      <div flex flex-col-reverse justify-center text-xs gap1>
        <span inline-flex items-center gap1>
          <div i-tabler-activity></div>
          {{ post.state ? '还活着' : '死了' }}
        </span>
        <span inline-flex items-center gap1>
          <div i-tabler-hash></div>
          {{ post.id }}
        </span>
      </div>
    </div>
    <div flex items-center gap4>
      <span flex items-center gap1>
        <div i-tabler-calendar-plus></div>
        <span>{{ post?.created_at_display }}</span>
      </span>
      <span flex items-center gap1>
        <div i-tabler-history></div>
        <span>{{ post?.updated_at_display }}</span>
      </span>
      <span flex items-center gap1>
        <div i-tabler-category></div>
        <BaseButton tag="RouterLink" @click.stop :to="`/category/${post.category}`" text-size-xs>
          {{ post.category }}
        </BaseButton>
      </span>
      <span flex items-center gap1>
        <div i-tabler-tag></div>
        <div text-size-xs>
          <BaseButton
            tag="RouterLink"
            @click.stop
            :to="`/tag/${tag}`"
            relative
            class="[&_+_&]:ml2 after:(content-['/'] absolute -right-2 last:content-none text-gray-700)"
            v-for="tag in post.tags"
            :key="tag"
          >
            {{ tag }}
          </BaseButton>
        </div>
      </span>
    </div>
    <div flex justify-start text-base font-serif>{{ post.desc }}</div>
  </div>
</template>

<script setup lang="ts">
import { type Post } from '@/api/types/interface'
import { usePostStore } from '@/stores/post'

const { post } = defineProps<{ post: Post }>()
const postStore = usePostStore()
const myHoverableElement = useTemplateRef('postCard')
const isHovered = useElementHover(myHoverableElement, {
  delayEnter: 400,
  delayLeave: 600,
})
whenever(isHovered, async () => {
  if (!postStore.postDetails.get(post.id)) {
    await postStore.fetchPostDetail(post.id)
  }
})
const router = useRouter()
</script>

<style scoped lang="scss"></style>
