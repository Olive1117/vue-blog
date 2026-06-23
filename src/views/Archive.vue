<template>
  <div class="archive px-[10vw] py-32 flex flex-col gap-4 tabular-nums">
    <!-- 大标题 -->
    <div class="flex flex-col gap-2 mb-8">
      <p class="uppercase text-xs tracking-[0.25rem] text-[#e3769b]">article&nbsp;index</p>
      <p class="text-6xl font-light">
        归档
        <span class="text-base tracking-[0.1rem]">收好那些散落的碎片，还有漫长岁月里不该被遗忘的名字。</span>
      </p>
    </div>
    <section v-for="(groupedMonth, year) in archiveStores.groupedArchives" :key="year">
      <div class="flex justify-between">
        <h2
          class="flex text-7xl font-bold [-webkit-text-stroke:2px_#e3769b] text-transparent mask-b-from-0% mb-[-1.5rem]"
        >
          {{ year }}
        </h2>
        <h2
          class="flex items-start gap-2 text-7xl font-bold [-webkit-text-stroke:2px_#e3769b] text-transparent mask-b-from-0% mb-[-1.5rem]"
        >
          {{ Number(year) - 2007 }}
          <span class="text-5xl"> 岁 </span>
        </h2>
      </div>
      <section class="relative group" v-for="(groupedDay, month) in groupedMonth" :key="month">
        <h3
          class="text-5xl opacity-0 group-has-hover:opacity-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold [-webkit-text-stroke:2px_#e3769b] text-transparent"
        >
          {{ Number(month) }}月·{{ countMonth[month] }}篇
        </h3>
        <ul>
          <li v-for="post in getMonthArchives(groupedDay)" :key="post.id">
            <RouterLink :to="'/post/' + post.short_id">
              <p class="flex gap-4 p-2 whitespace-nowrap">
                <!-- 时间 -->
                <span class="text-xl"> {{ post.created_at_display?.month }}.{{ post.created_at_display?.day }} </span>
                <span class="flex flex-1 justify-between gap-4">
                  <!-- 分类 -->
                  <span class="flex items-center text-[#e3769b]">
                    <DynamicIcon icon-name="Books" class="text-xl stroke-current" />
                    <span class="px-2 text-lg">
                      {{ post.category }}
                    </span>
                  </span>
                  <!-- 标题标签 -->
                  <span class="flex flex-4 justify-between">
                    <!-- 标题 -->
                    <span class="text-2xl">
                      {{ post.title }}
                    </span>
                    <!-- 标签 -->
                    <span class="flex items-center">
                      <DynamicIcon icon-name="Tag" color="#e3769b" class="text-xl" />
                      <span class="flex items-center px-2 text-base" v-for="(tag, index) in post.tags" :key="index">{{
                        tag
                      }}</span>
                    </span>
                  </span>
                </span>
              </p>
            </RouterLink>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import DynamicIcon from "@/components/DynamicIcon.vue";
import { useArchiveStore, type Archive } from "@/stores/archive";
import { computed, onMounted } from "vue";

const archiveStores = useArchiveStore();
const getMonthArchives = (days: Record<string, Archive[]>) => {
  const archives = [];
  for (const day of Object.keys(days).sort((a, b) => Number(b) - Number(a))) {
    archives.push(...days[day]);
  }
  return archives;
};
onMounted(async () => {
  if (archiveStores.allArchives.length === 0) await archiveStores.fetchAllArchives();
});

// const countYear = computed(() => {
//   return archiveStores.allArchives.reduce(
//     (acc, item) => {
//       const year = item.created_at_display?.year || "unknown";
//       acc[year] = (acc[year] || 0) + 1;
//       return acc;
//     },
//     {} as Record<string, number>,
//   );
// });
const countMonth = computed(() => {
  return archiveStores.allArchives.reduce(
    (acc, item) => {
      const month = item.created_at_display?.month || "unknown";
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
});
</script>

<style scoped></style>
