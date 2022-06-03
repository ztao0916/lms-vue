/*
 * @Author: ztao
 * @Date: 2022-06-02 00:08:23
 * @LastEditTime: 2022-06-02 00:08:49
 * @Description:
 */
import { LANG } from '@/constant';
import { getItem, setItem } from '@/utils/storage';
export default {
  namespaced: true,
  state: {
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
  },
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
    //设置国际化
    setLanguage(state, lang) {
      setItem(LANG, lang);
      state.language = lang;
    },
  },
  action: {},
};
