/*
 * @Author: ztao
 * @Date: 2022-05-27 11:26:46
 * @LastEditTime: 2022-05-29 22:05:53
 * @Description:
 */
import { createApp } from 'vue';
import App from './App.vue';
import './permission';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'normalize.css';
import '@/styles/index.scss';
import router from './router';
import * as icons from '@element-plus/icons-vue';
import store from './store';

const app = createApp(App);

//图标白名单(待思考)
// const iconWhiteList = [{ key: 'Menu', alias: 'IconMenu' }];
Object.keys(icons).forEach((key) => {
  //Menu as IconMenu
  if (key == 'Menu') {
    app.component('IconMenu', icons[key]);
  }
  app.component(key, icons[key]);
});

app.use(store).use(router).use(ElementPlus).mount('#app');
