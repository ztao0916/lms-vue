/*
 * @Author: ztao
 * @Date: 2022-05-29 10:19:04
 * @LastEditTime: 2022-06-02 00:08:29
 * @Description: 可以看成computed
 */
import varibales from '@/styles/variables.module.scss';
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => Object.keys(state.user.userInfo).length !== 0,
  menus: (state) => state.user.menus,
  cssVar: () => varibales,
  sidebarOpened: (state) => state.app.sidebarOpened,
};

export default getters;
