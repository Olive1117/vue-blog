<template>
  <div class="post-detail flex flex-col px-[10vw] py-32 flex flex-col gap-4">
    <RouterLink :to="{name:'list'}" class="flex items-center gap-1 p-2"><DynamicIcon icon-name="ArrowLeft"/>回到列表</RouterLink>
    <div class="flex justify-between items-end">
      <div class="flex flex-col gap-4">
        <h1 class="text-4xl font-bold">{{ detail?.title }}</h1>
        <p class="text-lg">{{ detail?.desc }}</p>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1">
            <DynamicIcon class="text-base" icon-name="CalendarTime" color="#e3769b" />
            <time
              :datetime="detail?.created_at_display?.year + '-' + detail?.created_at_display?.month + '-' + detail?.created_at_display?.day"
              class="text-sm">
              {{ detail?.created_at_display?.year }}年{{ detail?.created_at_display?.month }}月{{
                detail?.created_at_display?.day
              }}日
            </time>
          </div>
          <span class="flex items-center gap-1">
            <DynamicIcon class="text-base" icon-name="Books" color="#e3769b" />{{ detail?.category }}
          </span>
          <div class="flex items-center gap-1">
            <DynamicIcon class="text-base" icon-name="Tag" color="#e3769b" />
            <span v-for="tag in detail?.tags">{{ tag }}</span>
          </div>
        </div>
      </div>
      <div v-if="detail">
        <RouterLink :to="{name:'edit',params:{id:detail.short_id}}" class="flex items-center gap-1 p-2"><DynamicIcon icon-name="Pencil"/>编辑文章</RouterLink>
      </div>
    </div>
    <div id="mdd" class="mddd flex border-t p-4 bg-white" ref="md">
      <MdPreview class="" :id="id" :model-value="text" previewTheme="github" />
    </div>
    <div class="h-50"></div>
    <div class="h-50"></div>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore, type ArticleDisplay } from "@/stores/article";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { onMounted, ref } from "vue";
import DynamicIcon from "@/components/DynamicIcon.vue";
import { RouterLink } from "vue-router";
const text = ref("加载中");
const id = "preview-only";
const detail = ref<ArticleDisplay>();
const props = defineProps<{ id: string }>();

const articleStores = useArticleStore();
onMounted(() => {
  const cached = articleStores.articleDetails.get(props.id);
  if (cached) {
    detail.value = cached;
    text.value = detail.value.content;
    return;
  }
  articleStores.fetchArticleDetail(props.id).then((res) => {
    if (res) {
      detail.value = res;
      text.value = detail.value.content;
    }
  });
});
</script>

<style scoped></style>
