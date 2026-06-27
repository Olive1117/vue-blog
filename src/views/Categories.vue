<template>
  <div class="categories px-[10vw] py-32 flex flex-col gap-16">
    <div>
      <div class="flex flex-col gap-2 pb-8 text-center">
        <p class="uppercase text-xs tracking-[0.25rem] text-[#e3769b]">category&nbsp;index</p>
        <p class="text-6xl font-light">分类</p>
      </div>
      <ul class="flex flex-wrap justify-center gap-4">
        <li v-for="(countCat, cat) in archiveStores.Stats?.total_by_category">
          <button class="text-xl flex gap-2 p-2 border rounded">
            <span>
              {{ cat }}
            </span>
            <span>
              {{ countCat }}
            </span>
          </button>
        </li>
      </ul>
    </div>
    <div>
      <div class="flex flex-col gap-2 pb-8 text-center">
        <p class="uppercase text-xs tracking-[0.25rem] text-[#e3769b]">category&nbsp;index</p>
        <p class="text-6xl font-light">标签</p>
      </div>
      <ul class="flex flex-wrap justify-center gap-4">
        <li v-for="(countTag, tag) in archiveStores.Stats?.total_by_tag">
          <button class="text-xl flex gap-2 p-2 border rounded">
            <span>
              {{ tag }}
            </span>
            <span>
              {{ countTag }}
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArchiveStore } from "@/stores/archive";
import { onMounted } from "vue";

const archiveStores = useArchiveStore();

onMounted(async()=>{
  await archiveStores.fetchStats();
})
</script>

<style scoped></style>
