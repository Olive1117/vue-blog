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
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('@/views/backend/Dashboard.vue'),
        },
        {
          path: 'posts',
          name: 'Posts',
          component: () => import('@/views/backend/Posts.vue'),
        },
        {
          path: 'posts/create',
          name: 'PostCreate',
          component: () => import('@/views/backend/PostEdit.vue'),
        },
        {
          path: 'posts/edit/:id',
          name: 'PostEdit',
          component: () => import('@/views/backend/PostEdit.vue'),
          props: true,
        },
      ],
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
