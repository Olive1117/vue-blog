<template>
  <div class="write px-[10vw] py-32 flex flex-col gap-4">
    <div class="z-9999999">{{ layoutStores.isEditorFullscreen }}{{ editorRef }}<button @click="toggleFullscreen()">全屏</button> </div>
    <div class="flex gap-4">
      <input class="flex-3 border p-4" v-model="editingPost.title" placeholder="标题"></input>
      <input class="felx-1 border p-4" v-model="editingPost.slug" placeholder="slug(xx-xx)"></input>
    </div>
    <MdEditor ref="editorRef" v-model="editingPost.content" previewTheme="github" v-model:pageFullscreen="isPageFullScreen"/>
</div>
</template>

<script setup lang="ts">
import type { ArticleDTO } from '@/api/interface';
import { useArchiveStore } from '@/stores/archive';
import { whenever } from '@vueuse/core';
import { computed, ref, useTemplateRef} from 'vue';
import { MdEditor, type ExposeParam } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useLayoutStore } from '@/stores/layout';


const props = defineProps<{id: string}>()
const layoutStores = useLayoutStore();


const isEdit = computed(()=>!!props.id)
const archiveStores = useArchiveStore();
const isPageFullScreen = ref<boolean>(false)

const editorRef = useTemplateRef<ExposeParam>('editorRef');
  
const toggleFullscreen = () => {
  editorRef.value?.togglePageFullscreen();
  editorRef.value?.on('pageFullscreen', (status: boolean) => {
    layoutStores.toggleImmersive(status)})
}


// watch(isPageFullScreen, ()=>{console.log("isPageFullScreen", isPageFullScreen)})
const editingPost = ref<ArticleDTO>({
  id: "0",
  title: '',
  desc: '',
  content: '',
  state: 0,
  created_at: '',
  updated_at: '',
  short_id: '',
  word_count: 0,
  image_count: 0,
  slug: '',
  category: '',
  tags: []
})
whenever(isEdit, ()=>{
  archiveStores.fetchArchiveDetail(props.id).then((res) => {if (res) editingPost.value = res})
})
</script>

<style scoped>

</style>