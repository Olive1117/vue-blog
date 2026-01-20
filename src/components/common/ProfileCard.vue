<template>
  <div class="profile-card">
    <h1>hello world olive!</h1>
    <BaseButton @click="userStore.fetchUserInfo()">加载个人信息</BaseButton>
    <div flex flex-col>
      <BaseAvatar mxauto :alt="userinfo?.avatar" type="primary" circle></BaseAvatar>
      <div>
        <div i-tabler-user></div>
        {{ userinfo?.username }}
      </div>
      <div>
        <div i-tabler-id></div>
        {{ userinfo?.nickname }}
      </div>
      <div>
        <div i-tabler-mail></div>
        {{ userinfo?.email }}
      </div>
      <div>
        <div i-tabler-quote></div>
        {{ userinfo?.bio }}
      </div>
      <div>
        <div i-tabler-cake></div>
        {{ userinfo?.birthdate }}
      </div>
      <div>
        <div i-tabler-news></div>
        {{ userinfo?.post_count }}
      </div>
      <div>
        <div i-tabler-users></div>
        {{ userinfo?.friend_count }}
      </div>
      <div>
        <div i-tabler-map-pin></div>
        {{ userinfo?.location }}
      </div>
      <div>
        <div i-tabler-world-www></div>
        {{ userinfo?.website }}
      </div>
      <div>
        <div i-tabler-calendar-plus></div>
        {{ useDateFormat(userinfo?.created_at, 'YYYY-MM-DD') }}
      </div>
      <div>
        <div i-tabler-history></div>
        {{ useDateFormat(userinfo?.updated_at, 'YYYY-MM-DD') }}
      </div>
    </div>
    <BaseButton @click="console.log(userinfo)">打印</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userinfo = computed(() => {
  return userStore.userInfo
})
</script>

<style scoped lang="scss"></style>
