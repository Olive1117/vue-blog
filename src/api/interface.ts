export interface AuthRequest {
  username: string;
  password: string;
  captcha_id?: string;
  captcha_code: string;
}

export interface AuthResponse {
  access_token: string;
  expires_at: string;
  token_type: string;
}

export interface ArticleVO {
  id: string;
  title: string;
  desc: string;
  content: string;
  state: number;
  created_at: string;
  updated_at: string;
  short_id: string;
  word_count: number;
  image_count: number;
  slug: string;

  category: string;

  tags: string[];
}

export interface ArticleQuery {
  title?: string;
  category?: string;
  tags?: string[];
  state?: number;
}

export interface CategoryDTO {
  id: string;
  name: string;
  state: number;
}
export interface TagDTO {
  id: string;
  name: string;
  state: number;
}
export interface UserDTO {
  // 账号核心
  id: string;
  username: string;
  email: string;

  //: 基本资料
  nickname: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  website: string;
  birthdate: string;

  //: 统计数据 (如果你想学推特做缓存计数)
  post_count: number;
  friend_count: number;
  //: 权限控制
  role: string;
  state: number;

  created_at: string;
  updated_at: string;
}
export interface RegisterRequest {
  // 账号核心
  username: string;
  email: string;
  password: string;
  // 基本资料
  nickname: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  website: string;
  birthdate: string;
}

export interface ArticleStatsDTO {
  total: number;
  total_by_category: { string: number };
  total_by_tag: { string: number };
}
