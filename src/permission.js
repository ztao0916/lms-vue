/*
 * @Author: ztao
 * @Date: 2022-05-29 10:51:26
 * @LastEditTime: 2022-05-29 10:59:57
 * @Description: 这是路由前置守卫
 */
import router from './router';
import store from './store';

//白名单路由
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  //存在token进入主页
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/');
    } else {
      //判断用户资料是否获取,不存在就需要获取,展示在页面右上角的
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo');
      }
      next();
    }
  } else {
    //没有token的话只可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next('/login');
    }
  }
});
