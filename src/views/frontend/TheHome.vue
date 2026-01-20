<template>
  <div wfull class="the-home">
    <WelcomeBanner py32></WelcomeBanner>
    <div>
      <span font-mono>
        This`s [mono] font
        <br />
      </span>
      <span font-sans>
        This`s [sans] font
        <br />
      </span>
      <span font-serif>
        This`s [serif] font
        <br />
      </span>
    </div>
    <BaseButton @click="toggle()">高度切换</BaseButton>
    <BaseButton type="primary" @click="toggle()">高度切换</BaseButton>
    <BaseButton @click="toggle()">高度切换</BaseButton>
    <div v-for="value in 20" :key="value" v-if="value">撑开高度测试</div>
    <form @submit.prevent="login">
      <label>用户名:</label>
      <input v-model="formData.username" type="text" placeholder="请输入用户名" />
      <label>密码:</label>
      <input v-model="formData.password" type="text" placeholder="请输入密码" />
      <BaseButton type="warning">登录</BaseButton>
    </form>
    <BaseButton @click="logindef()">admin登录</BaseButton>
    <BaseButton @click="userStore.logout()">退出登录</BaseButton>
    <span break-all>当前token: {{ userStore.token }}</span>
    <PostList></PostList>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const [value, toggle] = useToggle()
const userStore = useUserStore()
const logindef = () => {
  userStore.login('admin', '123456').then(() => {
    console.log(userStore.token)
  })
}
const login = () => {
  userStore.login(formData.username, formData.password).then(() => {
    console.log(userStore.token)
  })
}
const formData = reactive({
  username: '',
  password: '',
})
</script>

<style scoped lang="scss"></style>
