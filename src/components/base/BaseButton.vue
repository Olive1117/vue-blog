<template>
  <component
    inline-flex
    items-center
    justify-center
    select-none
    p1.5
    m1
    rd
    transition-all
    gap1
    duration-200
    class="base-button active:scale-95"
    :class="[
      typeClass,
      { 'rounded-full px-2': circle },
      disabled ? 'op-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    :disabled="disabled"
    :is="tag"
  >
    <div flex items-center justify-center :class="icon" v-if="icon || $slots.icon">
      <slot name="icon"></slot>
    </div>

    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </component>
</template>

<script setup lang="ts">
const {
  tag = 'button',
  circle,
  icon,
  theme = 'default',
} = defineProps<{
  tag?: 'button' | 'RouterLink' | 'link' | Component
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
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
  return maps[theme]
})
</script>

<style scoped lang="scss"></style>
