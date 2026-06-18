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
          component: () => import('@/views/Home.vue'),
        },
        {
          path: 'post',
          name: 'archive',
          meta: { title: 'Archive' },
          components: {
            default: () => import('@/views/Archive.vue'),
            LeftSidebar: () => import('@/views/Aside.vue'),
          },
        },
        {
          path: 'post/:id',
          name: 'post',
          meta: { title: 'Post' },
          component: () => import('@/views/PostDetail.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: { title: '404 - 页面未找到' },
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

export default router
