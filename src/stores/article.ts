import type { ApiArticle, ArticleQuery, ApiArticleStats, ApiResponse, PageResponse } from "@/api";
import { ApiOfetch } from "@/config/ofetch";
import { useDateFormat } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

const ArticleAPI = (id?: string) => (id ? "/articles/" + id : "/articles");

export interface ArticleDisplay extends ApiArticle {
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

export const useArticleStore = defineStore("article", () => {
  // State
  const articles = ref<ArticleDisplay[]>([]);
  const allArticles = ref<ArticleDisplay[]>([]);
  const articleDetails = ref(new Map<number | string, ArticleDisplay>());
  const Stats = ref<ApiArticleStats>();
  const countArticle = ref<number>(0);
  const currentArticleId = ref<string | null>(null);
  const pageSize = ref<number>(10);
  const loading = ref(false);

  // Getters
  const totalPages = computed(() => {
    if (countArticle.value === null) return 0;
    return Math.ceil(countArticle.value / pageSize.value);
  });
  /**格式化文章列表排序 */
  const articlesByUpdateTime = computed(() => {
    return [...articles.value].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  });
  const articlesByCreateTime = computed(() => {
    return [...articles.value].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  });
  const groupedArticles = computed(() => {
    const result: Record<string, Record<string, Record<string, ArticleDisplay[]>>> = {};

    allArticles.value.forEach((article) => {
      const display = article.created_at_display;
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

      result[year][month][day].push(article);
    });

    return result;
  });

  // Actions
  const formatArticle = (article: ApiArticle) => {
    const [cyear, cmonth, cday] = useDateFormat(article.created_at, "YYYY-MM-DD").value.split("-");
    const [uyear, umonth, uday] = useDateFormat(article.updated_at, "YYYY-MM-DD").value.split("-");
    return {
      ...article,
      created_at_display: { year: cyear, month: cmonth, day: cday },
      updated_at_display: { year: uyear, month: umonth, day: uday },
    };
  };
  async function refreshArticles(page: number = 1, page_size: number = 10, query?: ArticleQuery) {
    loading.value = true;
    ApiOfetch<ApiResponse<PageResponse<ApiArticle>>>(ArticleAPI(), {
      query: { ...query, page: page, page_size: page_size },
    })
      .then((res) => {
        articles.value = res.data.list.map((p) => formatArticle(toArticle(p)));
        countArticle.value = res.data.total;
        pageSize.value = res.data.page_size;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      })
      .finally(() => {
        loading.value = false;
      });
  }
  async function fetchArticleDetail(identifier: string) {
    loading.value = true;
    return ApiOfetch<ApiResponse<ApiArticle>>(ArticleAPI(identifier))
      .then((res) => {
        const fullPost = formatArticle(toArticle(res.data));
        articleDetails.value.set(fullPost.short_id, fullPost);
        return fullPost;
      })
      .catch((err) => {
        console.error("获取详情失败", err);
        throw err;
      })
      .finally(() => {
        loading.value = false;
      });
  }
  const setPageSize = (size: number) => {
    pageSize.value = size ?? 10;
  };
  async function fetchStats() {
    ApiOfetch<ApiResponse<ApiArticleStats>>(ArticleAPI("stats"))
      .then((res) => {
        Stats.value = res.data;
      })
      .catch((err) => {
        console.error("获取文章聚合数据失败", err);
        throw err;
      });
  }
  async function fetchAllArticles() {
    loading.value = true;
    ApiOfetch<ApiResponse<PageResponse<ApiArticle>>>(ArticleAPI(), { query: { page: 1, page_size: 9999 } })
      .then((res) => {
        allArticles.value = res.data.list.map((p) => formatArticle(toArticle(p)));
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
    loading.value = false;
  }
  async function updatePostDetail(short_id: string, data: Partial<ApiArticle>) {
    loading.value = true;
    return ApiOfetch<ApiResponse<ApiArticle>>(ArticleAPI(short_id), {
      body: data,
      method: "PUT",
    })
      .then((res) => {
        const updatedArticle = formatArticle(toArticle(res.data));
        articleDetails.value.set(updatedArticle.short_id, updatedArticle);
        const allIndex = allArticles.value.findIndex((a) => a.short_id === short_id);
        if (allIndex !== -1) {
          allArticles.value[allIndex] = updatedArticle;
        }
        return updatedArticle;
      })
      .catch((err) => {
        console.error("更新文章失败", err);
        throw err;
      })
      .finally(() => {
        loading.value = false;
      });
  }
  async function createPostDetail(data: Partial<ApiArticle>) {
    loading.value = true;
    return ApiOfetch<ApiResponse<ApiArticle>>(ArticleAPI(), {
      body: data,
      method: "POST",
    })
      .then((res) => {
        const createArticle = formatArticle(toArticle(res.data));
        articleDetails.value.set(createArticle.short_id, createArticle);
        allArticles.value.push(createArticle);
        return createArticle;
      })
      .catch((err) => {
        console.error("创建文章失败", err);
        throw err;
      })
      .finally(() => {
        loading.value = false;
      });
  }
  async function deletedPost(short_id: string) {
    loading.value = true;
    return ApiOfetch<ApiResponse<[]>>(ArticleAPI(short_id), { query: { short_id }, method: "DELETE" })
      .then(() => {
        allArticles.value = allArticles.value.filter((a) => a.short_id !== short_id);
        articleDetails.value.delete(short_id);
        const byShortId = [...articleDetails.value.entries()].find(([, v]) => v.short_id === short_id);
        if (byShortId) articleDetails.value.delete(byShortId[0]);
        return true;
      })
      .catch((err) => {
        console.error("删除文章失败", err);
        throw err;
      })
      .finally(() => {
        loading.value = false;
      });
  }
  return {
    articles,
    allArticles,
    articleDetails,
    Stats,
    countArticle,
    currentArticleId,
    pageSize,
    loading,
    totalPages,
    articlesByUpdateTime,
    articlesByCreateTime,
    groupedArticles,
    refreshArticles,
    fetchArticleDetail,
    setPageSize,
    fetchStats,
    fetchAllArticles,
    updatePostDetail,
    createPostDetail,
    deletedPost,
  };
});

// ApiArticle → ArticleDTO
// function toArticleDTO(article: ApiArticle): ArticleDTO {
//   return {
//     title: article.title,
//     desc: article.desc,
//     content: article.content,
//     state: article.state,
//     created_at: article.created_at,
//     updated_at: article.updated_at,
//     short_id: article.short_id,
//     category: article.category,
//     tags: article.tags,
//     word_count: article.word_count,
//     image_count: article.image_count,
//   };
// }

// ApiArticle → ArticleDisplay
function toArticle(VO: ApiArticle): ArticleDisplay {
  return {
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
