import request from '@/utils/request'
import type { ApiResponse, PageResponse } from './types/common'
import type { Category } from './types/interface'

export const categoryApi = {
  /** 获取分类列表 */
  getList(params?: Record<string, unknown>) {
    return request.get<ApiResponse<PageResponse<Category>>>('/categories', {
      params: { ...params },
    })
  },
}
