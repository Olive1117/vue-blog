<template>
  <div class="list m-32 flex flex-col gap-12">
    <div class="flex flex-col gap-2">
      <p class="uppercase text-xs tracking-[0.25rem] text-[#e3769b]">article&nbsp;index</p>
      <p class="text-5xl font-light">
        文章
        <span class="text-base tracking-[0.1rem]">写下游戏里的余韵，还有普通日子里值得记住的小事。</span>
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <p class="uppercase text-xs tracking-[0.25rem] text-[#e3769b]">latest&nbsp;posts</p>
      <p class="text-3xl font-light">最近的文章</p>
    </div>
    <ul class="flex flex-col tracking-[0.15rem]">
      <li class="border-t-1 border-olive-400/70 last:border-b" v-for="archives in archiveStores.formattedArchives" :key="archives.id">
        <RouterLink class="h-full w-full" :to="'/post/'+archives.short_id">
          <div class="p-4 flex gap-8">
            <div class="flex flex-col items-center justify-start gap-1">
              <time class="text-base text-[#e3769b]" :datetime="archives.created_at_display?.month + '-' + archives.created_at_display?.day">{{ archives.created_at_display?.month}}.{{ archives.created_at_display?.day }}</time>
              <time class="text-xs font-light" :datetime="archives.created_at_display?.year">{{ archives.created_at_display?.year}}</time>
            </div>
            <div class="flex justify-between items-end w-full">
              <div class="flex flex-col items-start gap-1 ">
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
    <div class="h-500"></div>
  </div>
</template>

<script setup lang="ts">
import { useArchiveStore } from '@/stores/archive';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const archiveStores = useArchiveStore() 
onMounted(()=>{
  archiveStores.refreshArchives()
})
</script>

<style scoped></style>
