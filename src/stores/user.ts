import { loginApi } from '@/api/loginApi'
import type { User } from '@/api/types/interface'
import { userApi } from '@/api/userApi'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User>()
  const token = ref<string>(localStorage.getItem('token') || '')
  const loading = ref(false)

  const isLoggedIn = computed(() => !!token.value)

  async function login(username: string, password: string) {
    loading.value = true
    try {
      const res = await loginApi.login(username, password)
      token.value = res.data.data.access_token
      localStorage.setItem('token', token.value)
      await fetchUserInfo()
      return token.value
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  function logout() {
    token.value = ''
    localStorage.removeItem('token')
  }
  async function fetchUserInfo() {
    loading.value = true
    try {
      const res = await userApi.getMe()
      userInfo.value = res.data.data
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  return {
    userInfo,
    token,
    loading,
    isLoggedIn,
    login,
    logout,
    fetchUserInfo,
  }
})
