/*
 * @Author: ztao
 * @Date: 2022-05-27 12:33:55
 * @LastEditTime: 2022-06-02 00:10:01
 * @Description:
 */
import { createStore } from 'vuex';
import getters from './getters';
import user from './modules/user';
import app from './modules/app';

export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    user,
    app,
  },
});
