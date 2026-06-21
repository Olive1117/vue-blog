<template>
  <div class="post-detail">
    <div class="h-50"></div>
    <MdEditor v-model="text"/>
    <div id="mdd" class="mddd flex p-32" ref="md">
      <MdPreview class="flex-5" :id="id" :model-value="text" previewTheme="github"/>
      <MdCatalog class="mddd flex-1 relative" :editorId="id" :scrollElement="scrollElement || undefined" />
    </div>
    <div class="h-50"></div>
    <div class="h-50"></div>
  </div>
</template>

<script setup lang="ts">
import { useArchiveStore } from '@/stores/archive';
import { MdEditor, MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { onMounted, ref, useTemplateRef } from 'vue';
const text = ref('Hello Editor!');
const id = 'preview-only';
const mdRef = useTemplateRef("md")
const scrollElement = document.documentElement;


const props = defineProps<{id:string}>()

const archiveStores = useArchiveStore();
onMounted(async()=>{
  const detail = await archiveStores.fetchArchiveDetail(props.id)
  if (!detail) return
  text.value = detail.content
})
</script>

<style scoped>

</style>