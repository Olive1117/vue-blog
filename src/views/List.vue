<template>
  <div class="list m-32 flex flex-col gap-4">
    <div class="flex flex-col gap-2 mb-8">
      <p class="uppercase text-xs tracking-[0.25rem] text-[#e3769b]">article&nbsp;index</p>
      <p class="text-6xl font-light">
        文章
        <span class="text-base tracking-[0.1rem]">写下游戏里的余韵，还有普通日子里值得记住的小事。</span>
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <p class="uppercase text-xs tracking-[0.25rem] text-[#e3769b]">latest&nbsp;posts</p>
      <p class="text-3xl font-light">最近的文章</p>
    </div>
    <ul class="flex gap-4 flex-wrap">
      <li class="relative overflow-hidden" v-for="totalPost, name in cateList" :key="name">
        <button
          class="w-full border-b border-olive-700 rounded-xl px-3 py-1 flex items-center gap-1 hover:bg-[#fee8ee]"
          @click="toggleCate(name)"
        >
          <DynamicIcon
            v-show="name === (currentCate ?? '全部')"
            icon-name="Bookmark"
            size="24"
            color="#e3769b"
            class="absolute top-0 left-0"
          />
          <div v-if="name === (currentCate ?? '全部')" class="w-2"></div>
          <span>{{ name }}</span>
          <span>·</span>
          <span>{{ totalPost }}</span>
        </button>
      </li>
    </ul>
    <div class="flex flex-col gap-2 items-start">
      <button @click="isTagList = !isTagList" class="tracking-[0.15rem] text-sm p-2">+ 按标签浏览</button>
      <ul v-show="isTagList" class="flex gap-2 flex-wrap">
        <li
          class="border rounded-lg border-olive-400 font-light text-base py-[0.5] px-2 flex gap-2 text-[#e3769b]"
          :class="{ 'bg-[#fee8ee]': currentTag[name] }"
          v-for="(totalPost, name) in archiveStores.Stats?.total_by_tag"
          :key="name"
        >
          <button class="" @click="toggleTag(name)">
            <span>{{ name }}</span>
          </button>
        </li>
      </ul>
    </div>
    <ul class="flex flex-col tracking-[0.15rem]">
      <li
        class="border-t-1 border-olive-400/70 last:border-b"
        v-for="archives in archiveStores.formattedArchives"
        :key="archives.id"
      >
        <RouterLink class="h-full w-full" :to="'/post/' + archives.short_id">
          <div class="p-4 flex gap-8">
            <div class="flex flex-col items-center justify-start gap-1">
              <time
                class="text-base text-[#e3769b]"
                :datetime="archives.created_at_display?.month + '-' + archives.created_at_display?.day"
                >{{ archives.created_at_display?.month }}.{{ archives.created_at_display?.day }}</time
              >
              <time class="text-xs font-light" :datetime="archives.created_at_display?.year">{{
                archives.created_at_display?.year
              }}</time>
            </div>
            <div class="flex justify-between items-end w-full">
              <div class="flex flex-col items-start gap-1">
                <div class="text-xs">总字数</div>
                <p class="text-2xl font-medium">{{ archives.title }}</p>
                <p class="text-sm font-light">{{ archives.desc }}</p>
              </div>
              <span class="text-xs text-[#e3769b]">开始阅读 -></span>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ArticleQuery } from "@/api/interface";
import DynamicIcon from "@/components/DynamicIcon.vue";
import { useArchiveStore } from "@/stores/archive";
import { useCategoryTagStore } from "@/stores/categoryTag";
import { computed, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";

// 数据加载
const archiveStores = useArchiveStore();
const categoryTagStores = useCategoryTagStore();
onMounted(async () => {
  await archiveStores.refreshArchives();
  await categoryTagStores.fetchCategory();
  await categoryTagStores.fetchTag();
});

// 分类标签列表逻辑
const cateList = computed(() => ({ 全部: archiveStores.Stats?.total, ...archiveStores.Stats?.total_by_category }));
const isTagList = ref(false);
const currentCate = ref<string | null>(null);
const toggleCate = (name: string) => {
  currentCate.value = name === "全部" ? null : name;
};
const currentTag = ref<Record<string, boolean>>({});
const toggleTag = (name: string) => {
  currentTag.value = {
    ...currentTag.value,
    [name]: !currentTag.value[name],
  };
};
const activeTags = computed(() => Object.keys(currentTag.value).filter((k) => currentTag.value[k]));

// 文章列表逻辑
const page = ref<number>(1);
const page_size = computed(() => archiveStores.pageSize);
const postQuery = computed<ArticleQuery>(() => ({
  category: currentCate.value ?? undefined,
  tags: activeTags.value,
  state: 1,
}));
watch([currentCate, currentTag, page, page_size], () => {
  archiveStores.refreshArchives(page.value, page_size.value, postQuery.value);
});
</script>

<style scoped></style>
