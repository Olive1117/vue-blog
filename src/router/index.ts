import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          meta: { title: 'Home', showBanner: true },
          components: {
            default: () => import('@/views/frontend/TheHome.vue'),
            LeftSidebar: () => import('@/views/frontend/TheAside.vue'),
          },
        },
        {
          path: 'post',
          name: 'archive',
          meta: { title: 'Archive' },
          components: {
            default: () => import('@/views/frontend/TheArchive.vue'),
            LeftSidebar: () => import('@/views/frontend/TheAside.vue'),
          },
        },
        {
          path: 'post/:id',
          name: 'post',
          meta: { title: 'Post' },
          component: () => import('@/views/frontend/PostDetail.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/views/AdminLayout.vue'),
      children: [],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: { title: '404 - 页面未找到' },
      component: () => import('@/views/frontend/NotFound.vue'),
    },
  ],
})

export default router
