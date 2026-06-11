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
  const pageSize = ref<number>(0)

  /**格式化文章列表排序 */
  const formattedPosts = computed(() => {
    return posts.value.sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    )
  })
  const totalPages = computed(() => {
    if (total.value === null) return 0
    return Math.ceil(total.value / pageSize.value)
  })

  const formatPost = (post: Post) => {
    return {
      ...post,
      created_at_display: useDateFormat(post.created_at, 'YYYY-MM-DD').value,
      updated_at_display: useDateFormat(post.updated_at, 'YYYY-MM-DD').value,
    }
  }
  async function refreshPosts(params?: Record<string, unknown>) {
    loading.value = true
    try {
      const res = await postApi.getList(params)
      posts.value = res.data.data.list.map((p) => formatPost(p))
      total.value = res.data.data.total
      pageSize.value = res.data.data.page_size
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
  async function updatePostDetail(id: string, data: Partial<Post>) {
    try {
      const res = await postApi.update(id, data)
      const updatedPost = formatPost(res.data.data)
      postDetails.value.set(updatedPost.id, updatedPost)
      postDetails.value.set(updatedPost.short_id, updatedPost)
      // 同步更新列表中的数据
      const index = posts.value.findIndex((p) => p.id === id || p.short_id === id)
      if (index !== -1) {
        posts.value[index] = updatedPost
      }
    } catch (err) {
      console.error('更新文章失败', err)
    }
  }
  async function createPost(data: Partial<Post>) {
    try {
      const res = await postApi.create(data)
      const newPost = formatPost(res.data.data)
      posts.value.unshift(newPost)
      postDetails.value.set(newPost.id, newPost)
      postDetails.value.set(newPost.short_id, newPost)
      return newPost
    } catch (err) {
      console.error('创建文章失败', err)
    }
  }
  return {
    posts,
    postDetails,
    loading,
    total,
    currentPostId,
    formattedPosts,
    totalPages,
    pageSize,
    refreshPosts,
    createPost,
    togglePost,
    fetchPostDetail,
    updatePostDetail,
  }
})
