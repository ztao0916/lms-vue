/*
 * @Author: ztao
 * @Date: 2022-05-27 12:33:55
 * @LastEditTime: 2022-06-01 16:04:48
 * @Description: 需要两份路由: 一份公共的路由(静态),一份权限路由(动态生成)
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@views/login';
import Layout from '@/layout/index';

//路由懒加载 component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//私有路由表
const privateRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'Avatar',
    },
    children: [
      {
        path: '/user/manage',
        component: () => import(/* webpackChunkName: "user-manage" */ '@/views/user-manage/index.vue'),
        meta: {
          title: 'userManage',
          icon: 'User',
        },
      },
      {
        path: '/user/role',
        component: () => import(/* webpackChunkName: "role-list" */ '@/views/role-list/index.vue'),
        meta: {
          title: 'roleList',
          icon: 'Timer',
        },
      },
      {
        path: '/user/permission',
        component: () => import(/* webpackChunkName: "permission-list" */ '@/views/permission-list/index.vue'),
        meta: {
          title: 'permissionList',
          icon: 'Iphone',
        },
      },
      {
        path: '/user/info/:id',
        component: () => import(/* webpackChunkName: "user-info" */ '@/views/user-info/index.vue'),
        meta: {
          title: 'userInfo',
        },
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import(/* webpackChunkName: "import" */ '@/views/import/index.vue'),
        meta: {
          title: 'excelImport',
        },
      },
    ],
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'ElementPlus',
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import(/* webpackChunkName: "article-ranking" */ '@/views/article-ranking/index.vue'),
        meta: {
          title: 'articleRanking',
          icon: 'ElemeFilled',
        },
      },
      {
        path: '/article/:id',
        component: () => import(/* webpackChunkName: "article-detaial" */ '@/views/article-detail/index.vue'),
        meta: {
          title: 'articleDetail',
        },
      },
      {
        path: '/article/create',
        component: () => import(/* webpackChunkName: "article-create" */ '@/views/article-create/index.vue'),
        meta: {
          title: 'articleCreate',
          icon: 'Eleme',
        },
      },
      {
        path: '/article/editor/:id',
        component: () => import(/* webpackChunkName: "article-create" */ '@/views/article-create/index.vue'),
        meta: {
          title: 'articleEditor',
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
          title: 'profile',
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
