import request from '@/utils/request'
import type { ApiResponse, PageResponse } from './types/common'
import type { Tag } from './types/interface'
export const tagApi = {
  /** 获取标签列表 */
  getList(params?: Record<string, unknown>) {
    return request.get<ApiResponse<PageResponse<Tag>>>('/tags', {
      params: { ...params },
    })
  },
}
