<template>
  <div flex flex-col min-h-vh>
    <TheBackground></TheBackground>
    <TheNavbar />
    <div flex wfull p8 gap-8 flex-1>
      <router-view flex w64 v-slot="{ Component }" name="LeftSidebar" class="view left-sidebar">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <main overflow-hidden flex-1 class="view main-content">
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
