import { loginApi } from '@/api/loginApi'
import type { User } from '@/api/types/interface'
import { userApi } from '@/api/userApi'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User>()
  const token = ref<string>(localStorage.getItem('token') || '')
  const loading = ref(false)

  const isLoggedIn = computed(() => !!token.value && !!userInfo)

  async function login(username: string, password: string) {
    loading.value = true
    try {
      const res = await loginApi.login(username, password)
      token.value = res.data.data.access_token
      localStorage.setItem('token', token.value)
      await fetchUserInfo()
      return true
    } catch (err) {
      console.error(err)
      return false
    } finally {
      loading.value = false
    }
  }
  function logout() {
    token.value = ''
    userInfo.value = undefined
    localStorage.removeItem('token')
  }
  async function fetchUserInfo() {
    loading.value = true
    try {
      const res = await userApi.getMe()
      userInfo.value = {
        ...res.data.data,
        birthdate: useDateFormat(res.data.data.birthdate, 'YYYY-MM-DD').value,
      }
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
