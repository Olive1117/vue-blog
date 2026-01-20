import request from '@/utils/request'
import type { ApiResponse, PageResponse } from './types/common'
import type { User } from './types/interface'

export const userApi = {
  getList(params?: { page?: number; size?: number; keyword?: string }) {
    return request.get<ApiResponse<PageResponse<User>>>('/users', { params })
  },

  getById(identifier: number | string) {
    return request.get<ApiResponse<User>>(`/users/${identifier}`)
  },

  create(data: Partial<User>) {
    return request.post<ApiResponse<User>>('/users', data)
  },

  delete(id: number) {
    return request.delete(`/users/${id}`)
  },

  getMe() {
    return request.get<ApiResponse<User>>('/users/me')
  },
}
