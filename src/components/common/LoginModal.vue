<template>
  <Teleport to="body">
    <div
      fixed
      top-0
      left-0
      wvw
      hvh
      flex
      items-center
      justify-center
      z1000
      v-if="authStore.isLoginModalVisible"
      class="login-modal bg-black/10"
    >
      <form
        flex
        flex-col
        items-center
        justify-between
        min-h100
        min-w80
        p8
        bg-white
        rounded-xl
        ref="modalRef"
        @submit.prevent="handleLogin()"
        class="modal-content"
      >
        <h3 text-xl>登录</h3>
        <div flex flex-col gap8 wfull>
          <input
            border-2
            p1
            rounded
            ref="defInput"
            v-model="form.username"
            type="text"
            placeholder="用户名"
          />
          <input border-2 p1 rounded v-model="form.password" type="password" placeholder="密码" />
        </div>

        <div flex items-center justify-between wfull>
          <BaseButton flex-1 type="button" @click.prevent="authStore.hideLogin()">取消</BaseButton>
          <BaseButton flex-1 type="submit">登录</BaseButton>
        </div>
      </form>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
const authStore = useAuthStore()
const userStore = useUserStore()
const formRef = useTemplateRef('modalRef')
const defInput = useTemplateRef('defInput')
const form = reactive({
  username: '',
  password: '',
})
onClickOutside(formRef, () => authStore.hideLogin())
whenever(
  () => authStore.isLoginModalVisible,
  async () => {
    await nextTick()
    defInput.value?.focus()
  },
)
const handleLogin = () => {
  userStore.login(form.username, form.password).then((ok) => {
    if (ok) {
      authStore.hideLogin()
      form.username = ''
      form.password = ''
    }
  })
}
</script>

<style scoped lang="scss"></style>
