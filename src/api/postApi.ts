import request from '@/utils/request'
import type { ApiResponse, PageResponse } from './types/common'
import type { Post } from './types/interface'

export const postApi = {
  /** 获取文章列表 */

  getList(params?: Record<string, unknown>) {
    return request.get<ApiResponse<PageResponse<Post>>>('/articles', {
      params: { ...params },
    })
  },

  /** 获取单篇文章详情 */
  getById(identifier: number | string) {
    return request.get<ApiResponse<Post>>(`/articles/${identifier}`)
  },

  /** 创建新明信片 */
  create(data: Partial<Post>) {
    return request.post<ApiResponse<Post>>('/articles', data)
  },

  /** 删除文章 */
  delete(id: number) {
    return request.delete(`/articles/${id}`)
  },

  /** 更新文章 */
  update(id: number, data: Partial<Post>) {
    return request.put<ApiResponse<Post>>(`/articles/${id}`, data)
  },
}
