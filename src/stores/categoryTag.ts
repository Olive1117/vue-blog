import type { ApiResponse, PageResponse } from "@/api/common";
import type { CategoryDTO, TagDTO } from "@/api/interface";
import { ApiOfetch } from "@/config/ofetch";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useArchiveStore, type Archive } from "./archive";

const CategoryAPI = (id?: string) => (id ? "/categories/" + id : "/categories");
const TagsAPI = (id?: string) => (id ? "/tags/" + id : "/tags");

export interface Category extends CategoryDTO {
  count_post?: number;
}
export interface Tag extends TagDTO {
  count_post?: number;
}

export const useCategoryTagStore = defineStore("categoryTag", () => {
  // State
  const category = ref<Category[]>([]);
  const tag = ref<Tag[]>([]);
  const cloading = ref(false);
  const tloading = ref(false);

  // Getters
  const countCategoryByPost = computed<Category[]>(() => {
    return category.value.map((cat: Category) => {
      const count = useArchiveStore().archive.filter((item: Archive) => item.category === cat.name).length;
      return {
        ...cat,
        count_post: count,
      };
    });
  });
  const countTagByPost = computed<Category[]>(() => {
    return tag.value.map((t: Tag) => {
      const count = useArchiveStore().archive.filter((item: Archive) => item.category === t.name).length;
      return {
        ...t,
        count_post: count,
      };
    });
  });

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
    countCategoryByPost,
    countTagByPost,
    fetchCategory,
    fetchTag,
  };
});
