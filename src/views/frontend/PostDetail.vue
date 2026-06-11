<template>
  <div class="post-detail">
    <div px32 py12 flex flex-col v-if="post">
      <div mb4 flex gap4>
        <span flex items-center gap1>
          <div i-tabler-calendar-plus></div>
          <span>{{ post?.created_at_display }}</span>
        </span>
        <span flex items-center gap1>
          <div i-tabler-history></div>
          <span>{{ post?.updated_at_display }}</span>
        </span>
      </div>
      <h1 text-4xl mb2>{{ post?.title }}</h1>
      <div text-xl mb4>{{ post?.desc }}</div>
      <div flex items-center gap2 mb-4>
        <p text-xl>分类：</p>
        <div text-xl bg-white w-20 h10 flex items-center justify-center rounded-lg>
          {{ post?.category }}
        </div>
      </div>
      <div flex gap2 mb-4>
        <P text-xl>标签：</P>
        <div
          text-xl
          bg-white
          w-20
          h10
          flex
          flex-col
          items-center
          justify-center
          rounded-lg
          v-for="tag in post?.tags"
          :key="tag"
        >
          {{ tag }}
        </div>
      </div>
      <MdPreview :modelValue="post?.content" theme="light" previewTheme="cyanosis" />
    </div>
    <div v-else text-8xl wfull hfull flex items-center justify-center>
      不对吧，按道理你不应该看见这个
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/post'
import { MdPreview, type Themes } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
const props = defineProps<{ id: string }>()
const postStore = usePostStore()
const post = computed(() => {
  return postStore.postDetails.get(props.id)
})

// 直接加载避免闪屏
// onMounted(async () => {
if (!post.value?.content) {
  await postStore.fetchPostDetail(props.id).then((p) => {
    if (p) {
      postStore.togglePost(p.id)
    }
  })
}
// })
onUnmounted(() => {
  postStore.togglePost(null)
})
</script>

<style scoped lang="scss">
:deep(.md-editor) {
  @apply border-solid border-slate-500 border-1 bg-white bg-transparent p4 rounded-xl !important;
}
</style>
