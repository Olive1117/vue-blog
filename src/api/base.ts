/** 后端统一返回格式 */
export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

/** 分页基础结构 */
export interface PageResponse<T> {
  list: T[]
  page: number
  page_size: number
  total: number
}
