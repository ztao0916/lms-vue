/*
 * @Author: ztao
 * @Date: 2022-05-27 11:26:46
 * @LastEditTime: 2022-06-02 00:04:35
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
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import store from './store';

const app = createApp(App);

//图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  if (key == 'Menu') {
    app.component('IconMenu', component);
  } else {
    app.component(key, component);
  }
}

app.use(store).use(router).use(ElementPlus).mount('#app');
