import { postApi } from '@/api/postApi'
import type { Post } from '@/api/types/interface'

export const usePostStore = defineStore('post', () => {
  /**列表 */
  const posts = ref<Post[]>([])
  /**文章详情缓存 */
  const postDetails = ref(new Map<number | string, Post>())
  const total = ref<number | null>(null)
  const loading = ref(false)
  const currentPostId = ref<string | null>(null)

  /**格式化文章列表排序 */
  const formattedPosts = computed(() => {
    return posts.value.sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    )
  })

  const formatPost = (post: Post) => {
    return {
      ...post,
      created_at_display: useDateFormat(post.created_at, 'YYYY-MM-DD').value,
      updated_at_display: useDateFormat(post.updated_at, 'YYYY-MM-DD').value,
    }
  }
  async function refreshPosts(params?: { page?: number; size?: number }) {
    loading.value = true
    try {
      const res = await postApi.getList(params)
      posts.value = res.data.data.list.map((p) => formatPost(p))
      total.value = res.data.data.total
    } catch (err) {
      console.error(err)
      // throw err
    } finally {
      loading.value = false
    }
  }
  function togglePost(id: string | null) {
    currentPostId.value = id
  }
  async function fetchPostDetail(identifier: string): Promise<Post | undefined> {
    loading.value = true
    try {
      const res = await postApi.getById(identifier)
      const fullPost = formatPost(res.data.data)
      postDetails.value.set(fullPost.id, fullPost)
      postDetails.value.set(fullPost.short_id, fullPost)
      return fullPost
    } catch (err) {
      console.error('获取详情失败', err)
    } finally {
      loading.value = false
    }
  }
  return {
    posts,
    postDetails,
    loading,
    total,
    currentPostId,
    formattedPosts,
    refreshPosts,
    togglePost,
    fetchPostDetail,
  }
})
