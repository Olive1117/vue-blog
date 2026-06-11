<template>
  <div flex flex-col gap8 class="the-aside">
    <ProfileCard></ProfileCard>

    <div bg-white p4>
      <!-- <h2 mb4>标签云</h2> -->
      <div flex flex-wrap gap2>
        <BaseButton
          text-sm
          v-for="tag in tagStore.tags"
          :key="tag.id"
          @click="$router.push({ path: '/', query: { tags: tag.name } })"
          theme="primary"
        >
          {{ tag.name }}
        </BaseButton>
      </div>
    </div>

    <div bg-white p4>
      <!-- <h2 mb4>分类列表</h2> -->
      <div flex flex-col gap2>
        <div
          v-for="category in categoryStore.categories"
          :key="category.id"
          @click="$router.push({ path: '/', query: { category: category.name } })"
          theme="primary"
        >
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
import { useTagStore } from '@/stores/tag'

const tagStore = useTagStore()
const categoryStore = useCategoryStore()
tagStore.fetchTags().then(() => {
  console.log('Tags fetched:', tagStore.tags)
})
categoryStore.fetchCategories().then(() => {
  console.log('Categories fetched:', categoryStore.categories)
})
</script>

<style scoped lang="scss"></style>
