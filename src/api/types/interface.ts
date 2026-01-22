/**
 * 文章数据接口
 */
export interface Post {
  id: string
  title: string
  desc: string
  content: string
  state: number
  category: string
  tags: string[]
  short_id: string
  created_at: string
  updated_at: string
  created_at_display?: string
  updated_at_display?: string
}

/**
 * 登录接口
 */
export interface LoginResponse {
  access_token: string
  expires_at: string
  token_type: string
}

/**
 * 用户接口
 */
export interface User {
  id: string
  username: string
  email: string
  nickname: string
  avatar: string
  banner: string
  bio: string
  location: string
  website: string
  birthdate: string
  post_count: number
  friend_count: number
  role: string
  state: number
  created_at: string
  updated_at: string
}
