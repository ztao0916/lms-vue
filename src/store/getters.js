/*
 * @Author: ztao
 * @Date: 2022-05-29 10:19:04
 * @LastEditTime: 2022-06-01 17:14:24
 * @Description: 可以看成computed
 */
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => Object.keys(state.user.userInfo).length !== 0,
  menus: (state) => state.user.menus,
};

export default getters;
