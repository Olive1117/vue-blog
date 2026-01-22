<template>
  <div flex flex-col min-h-vh>
    <TheBackground></TheBackground>
    <TheNavbar z100 />
    <WelcomeBanner py16 v-if="shouldShowBanner"></WelcomeBanner>
    <div flex wfull p8 gap-8 flex-1 justify-center>
      <router-view flex w64 v-slot="{ Component }" name="LeftSidebar" class="view left-sidebar">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <main overflow-hidden flex-1 max-w-350 class="view main-content">
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <transition name="page-fade" mode="out-in">
              <Suspense :timeout="0"><component :is="Component" /></Suspense>
            </transition>
          </template>
        </router-view>
      </main>
    </div>
    <TheFooter />
  </div>

  <LoginModal />
</template>

<script setup lang="ts">
const route = useRoute()
const shouldShowBanner = computed(() => {
  return !!route.meta.showBanner
})
</script>

<style scoped lang="scss"></style>
