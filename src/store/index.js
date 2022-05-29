/*
 * @Author: ztao
 * @Date: 2022-05-27 12:33:55
 * @LastEditTime: 2022-05-29 10:57:30
 * @Description:
 */
import { createStore } from 'vuex';
import getters from './getters';
import user from './modules/user';

export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    user,
  },
});
