import axios from 'axios'
import qs from 'qs'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat', allowDots: true })
    },
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 比如：从 localstorage 获取 Token 注入 Header
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 统一处理 401 (未授权)、404、500 等错误
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export default service
