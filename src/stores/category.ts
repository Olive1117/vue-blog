import { categoryApi } from '@/api/categoryApi'
import type { Category } from '@/api/types/interface'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  async function fetchCategories() {
    loading.value = true
    try {
      const res = await categoryApi.getList()
      categories.value = res.data.data.list
    } catch (err) {
      console.error('获取分类失败', err)
    } finally {
      loading.value = false
    }
  }
  return {
    categories,
    loading,
    fetchCategories,
  }
})
