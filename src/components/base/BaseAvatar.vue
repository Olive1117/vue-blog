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
      '@container',
      typeClass,
      circle ? 'rd-full' : 'rd-md',
      disabled ? 'op-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <div wfull hfull flex items-center justify-center>
      <img v-if="renderType === 'image'" :src="value" class="w-full h-full object-cover" />
      <span v-else-if="renderType === 'text'" class="text-[50cqw] font-medium leading-none">
        {{ renderText }}
      </span>
      <div v-else :class="[value, 'text-xl']"></div>
    </div>
  </span>
</template>

<script setup lang="ts">
const {
  type = 'default',
  value,
  circle,
  disabled,
} = defineProps<{
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  value?: string
  circle?: boolean
  disabled?: boolean
}>()

const renderType = computed(() => {
  const val = value || ''
  if (!val) return 'i-tabler-user'
  // 判断是否为图片路径 (以 http, https, 或 / 开头，或者包含常见图片后缀)
  if (/^(http|https|data:image|\/)/.test(val) || /\.(jpg|jpeg|png|gif|webp)$/i.test(val)) {
    return 'image'
  }
  // 判断是否为 UnoCSS 图标类名 (通常以 i- 开头)
  if (val.startsWith('i-')) {
    return 'icon'
  }
  // 否则视为文字
  return 'text'
})
// 处理文字显示（如果是长文字，只显示前两个字符）
const renderText = computed(() => {
  if (renderType.value !== 'text') return ''
  return value?.slice(0, 2)
})
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
