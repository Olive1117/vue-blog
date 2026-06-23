import type { ApiResponse, PageResponse } from "@/api/common";
import type { CategoryDTO, TagDTO } from "@/api/interface";
import { ApiOfetch } from "@/config/ofetch";
import { defineStore } from "pinia";
import { ref} from "vue";

const CategoryAPI = (id?: string) => (id ? "/categories/" + id : "/categories");
const TagsAPI = (id?: string) => (id ? "/tags/" + id : "/tags");

export const useCategoryTagStore = defineStore("categoryTag", () => {
  // State
  const category = ref<CategoryDTO[]>([]);
  const tag = ref<TagDTO[]>([]);
  const cloading = ref(false);
  const tloading = ref(false);

  // Getters

  // Actions
  async function fetchCategory(id?: string) {
    cloading.value = true;
    try {
      const res = await ApiOfetch<ApiResponse<PageResponse<CategoryDTO>>>(CategoryAPI(id));
      category.value = res.data.list;
    } catch (err) {
      console.error("获取分类失败", err);
    } finally {
      cloading.value = false;
    }
  }
  async function fetchTag(id?: string) {
    tloading.value = true;
    try {
      const res = await ApiOfetch<ApiResponse<PageResponse<CategoryDTO>>>(TagsAPI(id));
      tag.value = res.data.list;
    } catch (err) {
      console.error("获取分类失败", err);
    } finally {
      tloading.value = false;
    }
  }
  return {
    category,
    tag,
    cloading,
    tloading,
    fetchCategory,
    fetchTag,
  };
});
