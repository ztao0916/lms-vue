/*
 * @Author: ztao
 * @Date: 2022-05-27 12:33:55
 * @LastEditTime: 2022-05-28 14:44:54
 * @Description: 需要两份路由: 一份公共的路由(静态),一份权限路由(动态生成)
 */
import { createRouter, createWebHashHistory } from 'vue-router';

//公共路由
const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    // 按需加载
    component: () => import(/* webpackChunkName: "login" */ '@views/login'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});

export default router;
