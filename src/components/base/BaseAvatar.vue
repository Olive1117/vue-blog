<template>
  <span
    class="base-avatar"
    inline-flex
    items-center
    justify-center
    select-none
    aspect-square
    w12
    transition-all
    duration-200
    overflow-hidden
    :class="[
      typeClass,
      circle ? 'rd-full' : 'rd-md',
      disabled ? 'op-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <div inline-flex v-if="src"><img :src="src" alt="头像" /></div>
    <div inline-flex v-else-if="alt">{{ alt }}</div>
    <div inline-flex v-else :class="icon"></div>
  </span>
</template>

<script setup lang="ts">
const {
  type = 'default',
  src,
  alt,
  icon,
} = defineProps<{
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  src?: string
  alt?: string
  icon?: string
  circle?: boolean
  disabled?: boolean
}>()

const typeClass = computed(() => {
  const maps = {
    primary: 'bg-primary-500 text-primary-50 hover:bg-primary-600 shadow-primary/20',
    success: 'bg-green-500 text-white hover:bg-green-600',
    warning: 'bg-orange-500 text-white hover:bg-orange-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    info: 'bg-gray-300 text-white hover:bg-gray-400',
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-300 dark:text-gray-200',
  }
  return maps[type]
})
</script>

<style scoped lang="scss"></style>
