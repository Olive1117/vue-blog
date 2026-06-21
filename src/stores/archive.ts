import type { ApiResponse, PageResponse } from "@/api/common";
import type { ArticleDTO, ArticleQuery } from "@/api/interface";
import { ApiOfetch } from "@/config/ofetch";
import { useDateFormat } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

const ArchiveAPI = (id?: string) => (id ? "/articles/"+ id : "/articles");

export interface Archive {
  id: string;
  title: string;
  desc: string;
  content: string;
  state: number;
  category: string;
  tags: string[];
  short_id: string;
  created_at: string;
  updated_at: string;
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
  const archive = ref<Archive[]>([]);
  /**文章详情缓存 */
  const archiveDetails = ref(new Map<number | string, Archive>());
  const countArchive = ref<number>(0);
  const currentArchiveId = ref<string | null>(null);
  const pageSize = ref<number>(0);
  const loading = ref(false);

  // Getters
  const totalPages = computed(() => {
    if (countArchive.value === null) return 0;
    return Math.ceil(countArchive.value / pageSize.value);
  });
  /**格式化文章列表排序 */
  const formattedArchives = computed(() => {
    return archive.value.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
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
      const res = await ApiOfetch<ApiResponse<PageResponse<ArticleDTO>>>(ArchiveAPI(), {
        query: { ...query, page: page, page_size: page_size },
      });
      archive.value = res.data.list.map((p) => formatArchive(toArchive(p)));
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
      const res = await ApiOfetch<ApiResponse<ArticleDTO>>(ArchiveAPI(identifier));
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

  return {
    archive,
    archiveDetails,
    countArchive,
    currentArchiveId,
    pageSize,
    loading,
    totalPages,
    formattedArchives,
    refreshArchives,
    fetchArchiveDetail,
  };
});

// Archive → ArticleDTO
function toArticleDTO(archive: Archive): ArticleDTO {
  return {
    id: archive.id,
    title: archive.title,
    desc: archive.desc,
    content: archive.content,
    state: archive.state,
    created_at: archive.created_at,
    updated_at: archive.updated_at,
    short_id: archive.short_id,
    category: archive.category,
    tags: archive.tags,
  };
}

// ArticleDTO → Archive
function toArchive(dto: ArticleDTO): Archive {
  return {
    id: dto.id,
    title: dto.title,
    desc: dto.desc,
    content: dto.content,
    state: dto.state,
    category: dto.category,
    tags: dto.tags,
    short_id: dto.short_id,
    created_at: dto.created_at,
    updated_at: dto.updated_at,
  };
}
