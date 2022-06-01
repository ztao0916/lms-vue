/*
 * @Author: ztao
 * @Date: 2022-05-29 10:14:14
 * @LastEditTime: 2022-06-01 17:14:40
 * @Description:
 */
import { login, getWorkToDoMap, logout, menu } from '@/api/sys';
import { setItem, getItem, removeAllItem } from '@/utils/storage';
import { TOKEN } from '@/constant';
import router from '@/router';
export default {
  namespaced: true,
  state: {
    token: getItem(TOKEN) || '',
    userInfo: {},
    menus: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    setUserInfo(state, userInfo) {
      let newUserInfo = Object.assign({}, userInfo, {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      });
      state.userInfo = newUserInfo;
    },
    setMenu(state, menus) {
      state.menus = menus;
    },
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
        })
          .then((data) => {
            this.commit('user/setToken', data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async getUserInfo() {
      try {
        const res = await getWorkToDoMap();
        this.commit('user/setUserInfo', res);
        return res;
      } catch (err) {
        return err;
      }
    },
    async getMenu() {
      try {
        const res = await menu();
        this.commit('user/setMenu', res);
        return res;
      } catch (err) {
        return err;
      }
    },
    async logout() {
      await logout();
      this.commit('user/setToken', '');
      this.commit('user/setUserInfo', {});
      removeAllItem();
      router.push('/login');
    },
  },
};
