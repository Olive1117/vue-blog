import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({ configFile: './uno.config.ts' }),
    vue(),
    vueDevTools(),
    Components({
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      dts: 'src/auto-import.d.ts',
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动引入变量和 mixin，这样你不用在每个组件里手动 @use
        additionalData: `
        @use "@/assets/styles/_variables.scss" as *;
        @use "@/assets/styles/_mixins.scss" as *;`,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 你的后端实际地址
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // 如果后端接口本身没有 /api 前缀，请取消注释
      },
    },
  },
})
