/*
 * @Author: ztao
 * @Date: 2022-05-29 10:19:04
 * @LastEditTime: 2022-05-29 10:57:09
 * @Description: 可以看成computed
 */
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
};

export default getters;