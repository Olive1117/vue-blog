import { tagApi } from '@/api/tagApi'
import type { Tag } from '@/api/types/interface'

export const useTagStore = defineStore('tag', () => {
  const tags = ref<Tag[]>([])
  const loading = ref(false)
  async function fetchTags() {
    loading.value = true
    try {
      const res = await tagApi.getList()
      tags.value = res.data.data.list
    } catch (err) {
      console.error('获取标签失败', err)
    } finally {
      loading.value = false
    }
  }
  return {
    tags,
    loading,
    fetchTags,
  }
})
