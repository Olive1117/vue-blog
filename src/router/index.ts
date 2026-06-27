import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/DefaultLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          meta: { title: "Home", showBanner: true },
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "post/:id",
          name: "PostDetail",
          meta: { title: "Post" },
          component: () => import("@/views/PostDetail.vue"),
          props: true,
        },
        {
          path: "archive",
          name: "archive",
          meta: { title: "Archive" },
          component: () => import("@/views/Archive.vue"),
        },
        {
          path: "list",
          name: "list",
          component: () => import("@/views/List.vue"),
        },
        {
          path: "category",
          name: "category",
          component: () => import("@/views/Categories.vue"),
        },
        {
          path: "diary",
          name: "diary",
          component: () => import("@/components/UnderConstruction.vue"),
        },
        {
          path: "gallery",
          name: "gallery",
          component: () => import("@/components/UnderConstruction.vue"),
        },
        {
          path: "sponsor",
          name: "sponsor",
          component: () => import("@/components/UnderConstruction.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/components/UnderConstruction.vue"),
        },
        {
          path: "links",
          name: "links",
          component: () => import("@/components/UnderConstruction.vue"),
        },
        {
          path: "guestbook",
          name: "guestbook",
          component: () => import("@/components/UnderConstruction.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      meta: { title: "404 - 页面未找到" },
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
