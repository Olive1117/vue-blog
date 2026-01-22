export const useAuthStore = defineStore('auth', () => {
  const isLoginModalVisible = ref(false)

  const showLogin = () => (isLoginModalVisible.value = true)
  const hideLogin = () => (isLoginModalVisible.value = false)
  return { isLoginModalVisible, showLogin, hideLogin }
})
