/*
 * @Author: ztao
 * @Date: 2022-05-29 10:14:14
 * @LastEditTime: 2022-05-29 11:07:14
 * @Description:
 */
import { login, getWorkToDoMap } from '@/api/sys';
import { setItem, getItem } from '@/utils/storage';
import { TOKEN } from '@/constant';
export default {
  namespaced: true,
  state: {
    token: getItem(TOKEN) || '',
    userInfo: {},
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
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
        console.log(res);
        this.commit('user/setUserInfo', res);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
};
