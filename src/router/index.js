/*
 * @Author: ztao
 * @Date: 2022-05-27 12:33:55
 * @LastEditTime: 2022-06-03 22:09:19
 * @Description: 需要两份路由: 一份公共的路由(静态),一份权限路由(动态生成)
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@views/login';
import Layout from '@/layout/index';

//路由懒加载 component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//私有路由表
const privateRoutes = [
  {
    path: '/order',
    component: Layout,
    // redirect: '/order/rules/blacklist',
    meta: {
      title: '订单',
      icon: 'Avatar',
    },
    children: [
      {
        path: '/order/rules',
        component: () => import(/* webpackChunkName: "user-manage" */ '@/views/user-manage/index.vue'),
        meta: {
          title: '订单规则',
          icon: 'User',
        },
        children: [
          {
            path: '/order/rules/blacklist',
            component: () => import(/* webpackChunkName: "user-manage" */ '@/views/user-manage/black-list/index.vue'),
            meta: {
              title: '黑名单地址',
              icon: 'User',
            },
          },
          // {
          //   path: '/order/rules/inventoryrules',
          //   component: () => import(/* webpackChunkName: "user-manage" */ '@/views/user-manage/black-list/index.vue'),
          //   meta: {
          //     title: '库存占用规则',
          //     icon: 'User',
          //   },
          // },
          // {
          //   path: '/order/rules/autoAuditRules',
          //   component: () => import(/* webpackChunkName: "user-manage" */ '@/views/user-manage/black-list/index.vue'),
          //   meta: {
          //     title: '自动审核规则',
          //     icon: 'User',
          //   },
          // },
          // {
          //   path: '/order/rules/countryrule',
          //   component: () => import(/* webpackChunkName: "user-manage" */ '@/views/user-manage/black-list/index.vue'),
          //   meta: {
          //     title: '法属国规则',
          //     icon: 'User',
          //   },
          // },
        ],
      },
      {
        path: '/order/auditDespathOrder',
        component: () => import(/* webpackChunkName: "role-list" */ '@/views/role-list/index.vue'),
        meta: {
          title: '直邮订单',
          icon: 'Timer',
        },
      },
      {
        path: '/order/winit',
        component: () => import(/* webpackChunkName: "permission-list" */ '@/views/permission-list/index.vue'),
        meta: {
          title: '海外仓订单',
          icon: 'Iphone',
        },
      },
      {
        path: '/order/oversea',
        component: () => import(/* webpackChunkName: "user-info" */ '@/views/user-info/index.vue'),
        meta: {
          title: '海外仓统计',
        },
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import(/* webpackChunkName: "import" */ '@/views/import/index.vue'),
        meta: {
          title: '导入表格',
        },
      },
    ],
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/ranking',
    meta: {
      title: '文章',
      icon: 'ElementPlus',
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import(/* webpackChunkName: "article-ranking" */ '@/views/article-ranking/index.vue'),
        meta: {
          title: '文章排名',
          icon: 'ElemeFilled',
        },
      },
      {
        path: '/article/:id',
        component: () => import(/* webpackChunkName: "article-detaial" */ '@/views/article-detail/index.vue'),
        meta: {
          title: '文章详情',
        },
      },
      {
        path: '/article/create',
        component: () => import(/* webpackChunkName: "article-create" */ '@/views/article-create/index.vue'),
        meta: {
          title: '创建文章',
          icon: 'Eleme',
        },
      },
      {
        path: '/article/editor/:id',
        component: () => import(/* webpackChunkName: "article-create" */ '@/views/article-create/index.vue'),
        meta: {
          title: '编辑文章',
        },
      },
    ],
  },
];
/**
 * 公共路由表
 */
const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: '个人信息',
          icon: 'Aim',
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404'),
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...privateRoutes, ...publicRoutes],
});

export default router;
