import { createRouter, createWebHashHistory } from "vue-router";

// 由于懒加载经常无法正常跳转，所以先引入
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/visitor_home/visitor_article_pre",
    },
    {
      path: "/signin",
      components: { content: () => import("../components/signin/index.vue") },
    },
    {
      path: "/visitor_home",
      name: "visitor_home",
      components: {
        content: () => import("../components/static_content/article/index.vue"),
        sidebar: () => import("../components/sidebar/visitor_sidebar.vue"),
      },
      children: [
        {
          path: "visitor_article_pre",
          name: "visitor_article_pre",
          components: {
            article: () =>
              import(
                "../components/static_content/article/article_pre/index.vue"
              ),
          },
        },
        {
          path: "article_detail/:_id",
          name: "visitor_article_detail",
          components: {
            article: () =>
              import(
                "../components/static_content/article/article_detail/index.vue"
              ),
          },
        },
      ],
    },
    {
      path: "/admin_home",
      name: "admin_home",
      components: {
        content: () => import("../components/manage/articleManage.vue"),

        sidebar: () => import("../components/sidebar/admin_sidebar.vue"),
      },
    },
    {
      path: "/admin_about",
      name: "admin_about",
      components: {
        content: () => import("../components/static_content/about.vue"),
        sidebar: () => import("../components/sidebar/admin_sidebar.vue"),
      },
    },
    {
      path: "/visitor_about",
      name: "visitor_about",
      components: {
        content: () => import("../components/static_content/about.vue"),
        sidebar: () => import("../components/sidebar/visitor_sidebar.vue"),
      },
    },
    {
      path: "/article_write",
      name: "article_write",
      components: {
        content: () => import("../components/manage/articleEdit.vue"),
        sidebar: () => import("../components/sidebar/admin_sidebar.vue"),
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  // 路由跳转，滚动到顶部
  document.documentElement.scrollTop = 0;
  next();
})
  router.beforeEach((to, from, next) => {
    if (to.path === "/signin" || to.path === "/visitor_home/visitor_article_pre") {
      next();
    } else {
      const isLogin = localStorage.getItem("isLogin_token");
      if (isLogin) {
        next();
      } else
        next({
          path: "/signin",
        });
    }
  }
  
  // 想直接访问admin_home，需要如果没带着登陆过后返回的token，则跳转到登陆页面，如果带着token，则允许直接跳转到admin_home页面
  )