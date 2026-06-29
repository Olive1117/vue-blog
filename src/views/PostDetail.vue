<template>
  <div class="post-detail flex flex-col px-[10vw] py-32 flex flex-col gap-4">
    <p>{{ detail?.category }}</p>
    <h1 class="text-3xl">{{ detail?.title }}</h1>
    <p>{{ detail?.desc }}</p>
    <p>
      {{ detail?.created_at_display?.year }}年{{ detail?.created_at_display?.month }}月{{
        detail?.created_at_display?.day
      }}日
    </p>
    <p class="flex gap-2">
      <span v-for="tag in detail?.tags">{{ tag }}</span>
    </p>
    <div id="mdd" class="mddd flex" ref="md">
      <MdPreview class="" :id="id" :model-value="text" previewTheme="github" />
    </div>
    <div class="h-50"></div>
    <div class="h-50"></div>
  </div>
</template>

<script setup lang="ts">
import { useArchiveStore, type Archive } from "@/stores/archive";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { onMounted, ref } from "vue";
const text = ref("加载中");
const id = "preview-only";
const detail = ref<Archive>();

const props = defineProps<{ id: string }>();

const archiveStores = useArchiveStore();
onMounted(async () => {
  await archiveStores.fetchArchiveDetail(props.id).then((res) => {
    if (res) {
      detail.value = res;
      text.value = detail.value.content;
    }
  });
});
</script>

<style scoped></style>
