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
      <li class="relative" v-for="category in cateList" :key="category.id">
        <button class="w-full border-b border-olive-700 rounded-xl px-3 py-1 flex items-center gap-1 hover:bg-[#fee8ee]" @click="toggleCate(category.name)">
            <DynamicIcon v-show="category.name === currentCate" icon-name="Bookmark" size="24" color="#e3769b" class="absolute top-0 left-0"/>
            <div v-if="category.name === currentCate" class="w-2"></div>
            <span>{{ category.name }}</span>
            <span>·</span>
            <span>{{ category.count_post }}</span>
        </button>
      </li>
    </ul>
    <div class="flex flex-col gap-2 items-start">
      <button @click="isTagList = !isTagList" class="tracking-[0.15rem] text-sm p-2">+ 按标签浏览</button>
      <ul v-show="isTagList" class="flex gap-2 flex-wrap">
        <li
          class="border rounded-lg border-olive-400 font-light text-base py-[0.5] px-2 flex gap-2 text-[#e3769b]"
          :class="{'bg-[#fee8ee]': currentTag === tag.name}"
          v-for="tag in categoryTagStores.countTagByPost"
          :key="tag.id"
        >
        <button class="" @click="toggleTag(tag.name)">
          <span>{{ tag.name }}</span>
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
import DynamicIcon from "@/components/DynamicIcon.vue";
import { useArchiveStore } from "@/stores/archive";
import { useCategoryTagStore, type Category } from "@/stores/categoryTag";
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const archiveStores = useArchiveStore();
const categoryTagStores = useCategoryTagStore();
onMounted(async() => {
  await archiveStores.refreshArchives();
  await categoryTagStores.fetchCategory();
  await categoryTagStores.fetchTag();
});
const cateList = computed<Category[]>(() => [{ id: "0", name: "全部", state: 1, count_post: archiveStores.archive.length }, ...categoryTagStores.countCategoryByPost]);
const isTagList = ref(false);
const currentCate = ref<string>("全部");
const toggleCate = (name: string) => {
  currentCate.value = name;
};
const currentTag = ref<string | null>(null);
const toggleTag = (name: string) => {
  currentTag.value === name ? null : (currentTag.value = name);
};
</script>

<style scoped></style>
