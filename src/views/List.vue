<template>
  <div class="list px-[10vw] py-32 flex flex-col gap-4">
    <!-- 大标题 -->
    <div class="flex flex-col gap-2 mb-8">
      <p class="uppercase text-xs tracking-[0.25rem] text-[#e3769b]">post&nbsp;index</p>
      <p class="text-6xl font-light">
        文章
        <span class="text-base tracking-[0.1rem]">写下游戏里的余韵，还有普通日子里值得记住的小事。</span>
      </p>
    </div>
    <!-- 副标题 -->
    <div class="flex flex-col gap-2">
      <p class="uppercase text-xs tracking-[0.25rem] text-[#e3769b]">latest&nbsp;posts</p>
      <p class="text-3xl font-light">最近的文章</p>
    </div>
    <!-- 分类栏 -->
    <ul class="flex gap-4 flex-wrap">
      <li class="relative overflow-hidden" v-for="(totalPost, name) in cateList" :key="name">
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
    <!-- 标签栏 -->
    <div class="flex flex-col gap-2 items-start">
      <button @click="onTagList()" class="tracking-[0.15rem] text-sm p-2">+ 按标签浏览</button>
      <ul v-show="isTagList" class="flex gap-2 flex-wrap">
        <li
          class="border rounded-lg border-olive-400 font-light text-base py-[0.5] px-2 flex gap-2 text-[#e3769b]"
          :class="{ 'bg-[#fee8ee]': currentTag.includes(name) }"
          v-for="(totalPost, name) in archiveStores.Stats?.total_by_tag"
          :key="name"
        >
          <button class="" @click="toggleTag(name)">
            <span>{{ name }}</span>
          </button>
        </li>
      </ul>
    </div>
    <!-- 文章列表栏 -->
    <ul class="flex flex-col tracking-[0.15rem]">
      <li
        class="relative border-t-1 border-olive-400/70 last:border-b"
        v-for="archives in archiveStores.archivesByUpdateTime"
        :key="archives.id"
      >
        <RouterLink class="h-full w-full" :to="'/post/' + archives.short_id">
          <div class="p-4 flex gap-8">
            <!-- 左侧创建时间 -->
            <div class="flex flex-col items-center justify-between gap-1">
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
              <DynamicIcon icon-name="Clock" class="text-xl" color="#e3769b" />
            </div>
            <!-- 右侧文章详情 -->
            <div class="flex justify-between items-end w-full">
              <div class="flex flex-col items-start gap-1">
                <p class="text-xs flex gap-2 whitespace-nowrap flex-wrap pb-4">
                  <span class="flex items-center">
                    <DynamicIcon class="text-base" icon-name="ListSearch" color="#e3769b" />
                    <span class="px-2">总字数&nbsp;{{ archives.word_count }}</span>
                  </span>
                  <span class="flex items-center">
                    <DynamicIcon class="text-base" icon-name="Books" color="#e3769b" />
                    <span class="px-2" @click.prevent.stop="toggleCate(archives.category)">{{
                      archives.category
                    }}</span>
                  </span>
                  <span class="text-xs flex items-center flex-wrap">
                    <DynamicIcon class="text-base" icon-name="Tag" color="#e3769b" />
                    <span
                      @click.prevent.stop="toggleTag(tag)"
                      class="border-r border-olive-600 last:border-none px-2"
                      v-for="tag in archives.tags"
                      >{{ tag }}</span
                    >
                  </span>
                </p>
                <p class="text-2xl font-medium">{{ archives.title }}</p>
                <p class="text-sm font-light">{{ archives.desc }}</p>
              </div>
              <!-- <div class="flex h-full">收藏</div> -->
            </div>
          </div>
        </RouterLink>
        <span class="absolute right-0 bottom-4 text-xs text-[#e3769b] whitespace-nowrap">开始阅读 -></span>
      </li>
    </ul>
    <!-- 分页查询 -->
    <ul class="flex justify-center gap-4 sticky bottom-8 text-xl">
      <li class="" v-for="(page, index) in generatePageList(currentPage, totalPages)" :key="index">
        <button class="flex items-center justify-center border-b h-10 w-10" @click="togglePage(page)">
          {{ OmitPage(page) }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ArticleQuery } from "@/api/interface";
import DynamicIcon from "@/components/DynamicIcon.vue";
import { useArchiveStore } from "@/stores/archive";
import { useCategoryTagStore } from "@/stores/categoryTag";
import { useRouteQuery } from "@vueuse/router";
import { computed, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";

// 数据加载
const archiveStores = useArchiveStore();
const categoryTagStores = useCategoryTagStore();

// 分类标签列表逻辑
const cateList = computed(() => ({ 全部: archiveStores.Stats?.total, ...archiveStores.Stats?.total_by_category }));
const currentCate = useRouteQuery("category", null, {
  transform: (v) => (v === null ? null : String(v)), // 保持 null 或字符串
});
const toggleCate = (name: string) => {
  currentCate.value = name === "全部" ? null : name;
  currentPage.value = 1;
};
const currentTag = useRouteQuery<string, string[]>("tags", "", {
  transform: {
    get: (v) => (v ? v.split(",") : []),
    set: (v) => v.join(","),
  },
});
const toggleTag = (name: string) => {
  const set = new Set(currentTag.value);
  set.has(name) ? set.delete(name) : set.add(name);
  currentTag.value = Array.from(set);
  if (!!set.size) isTagList.value = true;
  currentPage.value = 1;
};
const isTagList = ref<boolean>(!!currentTag.value.length);
  const onTagList = () => {
    if (isTagList) currentTag.value = [];
    isTagList.value = !isTagList.value;
  };

  // 文章列表逻辑
const page_size = computed(() => archiveStores.pageSize);
const postQuery = computed<ArticleQuery>(() => ({
  category: currentCate.value ?? undefined,
  tags: currentTag.value,
  state: 1,
}));

// 文章列表分页查询导航栏
const JUMP_BACK = -1;
const JUMP_FORWARD = -2;
const JUMP_SIZE = 5;
const maxVisiblePages = ref<number>(9);
const currentPage = useRouteQuery("page", 1, { transform: Number });
const totalPages = computed(() => archiveStores.totalPages);
const generatePageList = (curPage: number, totPage: number): number[] => {
  const max = maxVisiblePages.value < 3 ? 3 : maxVisiblePages.value;
  if (totPage <= max) {
    return Array.from({ length: totPage }, (_, i) => i + 1);
  }
  const result: number[] = [];
  const half = Math.floor((max - 3) / 2);
  const left = Math.max(2, curPage - (half - 1));
  const right = Math.min(totPage - 1, curPage + half - 1);
  
  result.push(1);
  if (left > 2) {
    if (left > 3) result.push(JUMP_BACK);
    else result.push(2);
  }
  if (curPage >= totPage - (half + 1)) {
    for (let i = totPage - (max - 2) + 1; i <= left - 1; i++) result.push(i);
  }
  for (let i = left; i <= right; i++) {
    result.push(i);
  }
  if (curPage <= half + 1) {
    for (let i = right + 1; i <= max - 2; i++) result.push(i);
  }
  if (right < totPage - 1) {
    if (right < totPage - 2) result.push(JUMP_FORWARD);
    else result.push(totPage - 1);
  }
  result.push(totPage);
  return result;
};
const OmitPage = (page: number): string | number => {
  if (page === JUMP_BACK || page === JUMP_FORWARD) return "...";
  return page;
};

const togglePage = (p: number) => {
  if (p === JUMP_BACK) currentPage.value -= JUMP_SIZE;
  if (p === JUMP_FORWARD) currentPage.value += JUMP_SIZE;
  currentPage.value = p;
};

// 文章列表响应
watch([currentCate, currentTag, currentPage, page_size], () => {
  archiveStores.refreshArchives(currentPage.value, page_size.value, postQuery.value);
});
onMounted(async () => {
  await archiveStores.refreshArchives(currentPage.value, page_size.value, postQuery.value);
  // await categoryTagStores.fetchCategory();
  // await categoryTagStores.fetchTag();
  await archiveStores.fetchStats();
});
</script>

<style scoped></style>
