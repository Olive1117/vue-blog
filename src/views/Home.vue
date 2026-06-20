<template>
  <div class="home">
    <!-- 开屏背景图 -->
    <img class="sticky h-dvh w-full top-0 -z-10 object-cover select-none" src="/IMG_2550.PNG" alt="背景图" />
    <!-- 开屏文字 -->
    <div class="absolute h-dvh w-full top-0 whitespace-nowrap bg-linear-to-b from-white to-transparent to-20%">
      <!-- 装饰条 -->
      <div class="absolute top-32 left-8 opacity-50 h-6 w-6 border-l-2 border-t-2 border-olive-700"></div>
      <div class="absolute bottom-16 right-8 opacity-50 h-6 w-6 border-r-2 border-b-2 border-olive-700"></div>
      <div
        class="absolute left-[3.2vw] bottom-[6.4vh] w-[48vw] h-[1px] bg-linear-to-r from-olive-900/0 via-olive-900/50 via-olive-900 via-olive-900/50 to-olive-900/0"
      ></div>
      <div
        class="absolute left-[6.4vw] bottom-[1.2vh] h-[32vw] w-[1px] bg-linear-to-t from-olive-900/0 via-olive-900/50 via-olive-900 via-olive-900/50 to-olive-900/0"
      ></div>
      <!-- 大字介绍 -->
      <div class="absolute left-[10vw] bottom-[10vh] flex flex-col gap-4">
        <span class="text-4xl font-black">小榄もしあげるよ&nbsp;&nbsp;^⌯𖥦⌯^੭</span>
        <div class="flex gap-4">
          <span v-for="skill in skill_languages" class="bg-black text-white text-xl rounded-full px-2">
            {{ skill }}
          </span>
        </div>
        <span class="text-8xl font-black text-white mix-blend-difference">OLIVETINT.COM</span>
      </div>
      <!-- 侧边文字 -->
      <div class="flex items-center gap-4 absolute right-[8vw] top-[12vh] [writing-mode:vertical-rl]">
        <span class="text-4xl">博客</span>
        <div class="h-[1px] w-[4rem] bg-linear-to-r from-olive-900/0 via-olive-900/50 via-olive-900 via-olive-900/50 to-olive-900/0"></div>
        <span class="uppercase text-sm tracking-[0.25rem]">olive</span>
        <DynamicIcon icon-name="Heart" color="red"/>
        <span class="uppercase text-sm tracking-[0.25rem]">Come on and work hard</span>
      </div>
    </div>
    <div class="h-dvh w-full bg-white flex items-center justify-center text-9xl">内容施工中</div>
  </div>
</template>

<script setup lang="ts">
import DynamicIcon from '@/components/DynamicIcon.vue';

const skill_languages: string[] = ['JavaScript', 'Golang', 'Vue'];
</script>

<style scoped></style>
