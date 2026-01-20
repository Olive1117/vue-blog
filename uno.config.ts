import {
  defineConfig,
  presetWind4,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
  presetTypography,
} from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/, 'src/**/*.{js,ts}'],
    },
  },
  presets: [
    presetWind4(), // UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设。
    presetAttributify({ prefix: 'un-', prefixedOnly: false }), // 开启“属性化”支持，如 <div flex border="1">
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
    }), // 允许直接使用图标，如 class="i-mdi-home"
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(), // 允许你在 <style> 里写 @apply
    transformerVariantGroup(), // 允许你写 hover:(bg-red text-white)
  ],

  theme: {
    // 同步你的 _variables.scss 中的颜色
    colors: {
      primary: {
        DEFAULT: 'var(--el-color-primary)',
        50: 'var(--el-color-primary-light-9)',
        100: 'var(--el-color-primary-light-8)',
        200: 'var(--el-color-primary-light-7)',
        300: 'var(--el-color-primary-light-6)',
        400: 'var(--el-color-primary-light-5)',
        500: 'var(--el-color-primary-light-4)',
        600: 'var(--el-color-primary-light-3)',
        700: 'var(--el-color-primary-light-2)',
        800: 'var(--el-color-primary-light-1)',
        900: 'var(--el-color-primary-dark-1)',
        // ...以此类推
        dark: 'var(--el-color-primary-dark-2)',
      },
      success: 'var(--el-color-success)',
      warning: 'var(--el-color-warning)',
      danger: 'var(--el-color-danger)',
      info: 'var(--el-color-info)',
    },
    breakpoints: {
      // 同步你的响应式断点
      sm: '640px',
      md: '768px',
      lg: '1080px',
      xl: '1280px',
    },
  },
  shortcuts: {
    // 你也可以在这里封装类似 Mixin 的快捷方式
    // 'flex-center': 'flex items-center justify-center',
  },
})
