<template>
  <BaseButton
    block
    wfull
    active:scale-none
    my4
    mx0
    tag="RouterLink"
    :to="`/post/${post.short_id}`"
    p4
    class="post-card"
  >
    <div flex items-end gap2>
      <h1 text-3xl font-bold font-serif>{{ post.title }}</h1>
      <div flex flex-col-reverse justify-center text-xs>
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
        <BaseButton tag="RouterLink" :to="`/tag/${post.category}`" text-size-xs>
          {{ post.category }}
        </BaseButton>
      </span>
      <span flex items-center gap1>
        <div i-tabler-tag></div>
        <div text-size-xs>
          <BaseButton
            tag="RouterLink"
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
  </BaseButton>
</template>

<script setup lang="ts">
import { type Post } from '@/api/types/interface'

const { post } = defineProps<{ post: Post }>()
</script>

<style scoped lang="scss"></style>
