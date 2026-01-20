import request from '@/utils/request'
import type { ApiResponse } from './types/common'
import type { LoginResponse } from './types/interface'

export const loginApi = {
  login(username: string, password: string) {
    return request.post<ApiResponse<LoginResponse>>('/login', {
      username: username,
      password: password,
    })
  },
}
