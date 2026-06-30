import type { ApiResponse, PageResponse } from "@/api/common";
import type { ArticleVO, ArticleQuery, ArticleStatsDTO } from "@/api/interface";
import { ApiOfetch } from "@/config/ofetch";
import { useDateFormat } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

const ArchiveAPI = (id?: string) => (id ? "/articles/" + id : "/articles");

export interface Archive {
  id: string;
  title: string;
  desc: string;
  content: string;
  state: number;
  category: string;
  tags: string[];
  short_id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  word_count: number;
  image_count: number;
  created_at_display?: {
    year: string;
    month: string;
    day: string;
  };
  updated_at_display?: {
    year: string;
    month: string;
    day: string;
  };
}

export const useArchiveStore = defineStore("archive", () => {
  // State
  const archives = ref<Archive[]>([]);
  const allArchives = ref<Archive[]>([]);
  const archiveDetails = ref(new Map<number | string, Archive>());
  const Stats = ref<ArticleStatsDTO>();
  const countArchive = ref<number>(0);
  const currentArchiveId = ref<string | null>(null);
  const pageSize = ref<number>(10);
  const loading = ref(false);

  // Getters
  const totalPages = computed(() => {
    if (countArchive.value === null) return 0;
    return Math.ceil(countArchive.value / pageSize.value);
  });
  /**格式化文章列表排序 */
  const archivesByUpdateTime = computed(() => {
    return [...archives.value].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  });
  const archivesByCreateTime = computed(() => {
    return [...archives.value].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  });
  const groupedArchives = computed(() => {
    const result: Record<string, Record<string, Record<string, Archive[]>>> = {};

    allArchives.value.forEach((archive) => {
      const display = archive.created_at_display;
      if (!display) return;
      const { year, month, day } = display;

      // 初始化层级
      if (!result[year]) {
        result[year] = {};
      }
      if (!result[year][month]) {
        result[year][month] = {};
      }
      if (!result[year][month][day]) {
        result[year][month][day] = [];
      }

      result[year][month][day].push(archive);
    });

    return result;
  });

  // Actions
  const formatArchive = (archive: Archive) => {
    const [cyear, cmonth, cday] = useDateFormat(archive.created_at, "YYYY-MM-DD").value.split("-");
    const [uyear, umonth, uday] = useDateFormat(archive.updated_at, "YYYY-MM-DD").value.split("-");
    return {
      ...archive,
      created_at_display: { year: cyear, month: cmonth, day: cday },
      updated_at_display: { year: uyear, month: umonth, day: uday },
    };
  };
  async function refreshArchives(page: number = 1, page_size: number = 10, query?: ArticleQuery) {
    loading.value = true;
    try {
      const res = await ApiOfetch<ApiResponse<PageResponse<ArticleVO>>>(ArchiveAPI(), {
        query: { ...query, page: page, page_size: page_size },
      });
      archives.value = res.data.list.map((p) => formatArchive(toArchive(p)));
      countArchive.value = res.data.total;
      pageSize.value = res.data.page_size;
    } catch (err) {
      console.error(err);
      // throw err
    } finally {
      loading.value = false;
    }
  }
  async function fetchArchiveDetail(identifier: string): Promise<Archive | undefined> {
    loading.value = true;
    try {
      const res = await ApiOfetch<ApiResponse<ArticleVO>>(ArchiveAPI(identifier));
      const fullPost = formatArchive(toArchive(res.data));
      archiveDetails.value.set(fullPost.id, fullPost);
      archiveDetails.value.set(fullPost.short_id, fullPost);
      return fullPost;
    } catch (err) {
      console.error("获取详情失败", err);
    } finally {
      loading.value = false;
    }
  }
  const setPageSize = (size: number) => {
    pageSize.value = size ?? 10;
  };
  async function fetchStats() {
    ApiOfetch<ApiResponse<ArticleStatsDTO>>(ArchiveAPI("stats"))
      .then((res) => {
        Stats.value = res.data;
      })
      .catch((err) => {
        console.error("获取文章聚合数据失败", err);
      });
  }
  async function fetchAllArchives() {
    loading.value = true;
    ApiOfetch<ApiResponse<PageResponse<ArticleVO>>>(ArchiveAPI(), { query: { page: 1, page_size: 9999 } })
      .then((res) => {
        allArchives.value = res.data.list.map((p) => formatArchive(toArchive(p)));
      })
      .catch((err) => {
        console.error(err);
      });
    loading.value = false;
  }
  async function updatePostDetail(id: string, data: Partial<ArticleVO>) {
    loading.value = true;
    ApiOfetch<ApiResponse<ArticleVO>>(ArchiveAPI(id), {
      body: data,
      method: "PUT",
    })
      .then((res) => {
        const updatedArchive = formatArchive(toArchive(res.data));
        archiveDetails.value.set(updatedArchive.id, updatedArchive);
        archiveDetails.value.set(updatedArchive.short_id, updatedArchive);
        const allIndex = allArchives.value.findIndex((a) => a.id === id);
        if (allIndex !== -1) {
          allArchives.value[allIndex] = updatedArchive;
          return updatedArchive;
        }
      })
      .catch((err) => {
        console.error("更新文章失败", err);
      })
      .finally(() => {
        loading.value = false;
      });
  }
  async function createPostDetail(data: Partial<ArticleVO>) {
    loading.value = true;
    ApiOfetch<ApiResponse<ArticleVO>>(ArchiveAPI(), {
      body: data,
      method: "POST",
    })
      .then((res) => {
        const createArchive = formatArchive(toArchive(res.data));
        archiveDetails.value.set(createArchive.id, createArchive);
        archiveDetails.value.set(createArchive.short_id, createArchive);
        allArchives.value.push(createArchive);
      })
      .catch((err) => {
        console.error("创建文章失败", err);
      })
      .finally(() => {
        loading.value = false;
      });
  }
  async function deletedPost(id: string) {
    loading.value = true;
    ApiOfetch<ApiResponse<[]>>(ArchiveAPI(id), { query: { id }, method: "DELETE" }).then((res) => {
      allArchives.value = allArchives.value.filter((a) => a.id !== id);
      archiveDetails.value.delete(id);
      const byShortId = [...archiveDetails.value.entries()].find(([, v]) => v.id === id);
      if (byShortId) archiveDetails.value.delete(byShortId[0]);
    }).catch((err)=>{console.error("删除文章失败", err);
    }).finally(()=>{loading.value = false});
  }
  return {
    archives,
    allArchives,
    archiveDetails,
    Stats,
    countArchive,
    currentArchiveId,
    pageSize,
    loading,
    totalPages,
    archivesByUpdateTime,
    archivesByCreateTime,
    groupedArchives,
    refreshArchives,
    fetchArchiveDetail,
    setPageSize,
    fetchStats,
    fetchAllArchives,
    updatePostDetail,
    createPostDetail,
    deletedPost,
  };
});

// Archive → ArticleDTO
// function toArticleDTO(archive: Archive): ArticleDTO {
//   return {
//     id: archive.id,
//     title: archive.title,
//     desc: archive.desc,
//     content: archive.content,
//     state: archive.state,
//     created_at: archive.created_at,
//     updated_at: archive.updated_at,
//     short_id: archive.short_id,
//     category: archive.category,
//     tags: archive.tags,
//     word_count: archive.word_count,
//     image_count: archive.image_count,
//   };
// }

// ArticleVO → Archive
function toArchive(VO: ArticleVO): Archive {
  return {
    id: VO.id,
    title: VO.title,
    desc: VO.desc,
    content: VO.content,
    state: VO.state,
    category: VO.category,
    tags: VO.tags,
    short_id: VO.short_id,
    slug: VO.slug,
    word_count: VO.word_count,
    image_count: VO.image_count,
    created_at: VO.created_at,
    updated_at: VO.updated_at,
  };
}
