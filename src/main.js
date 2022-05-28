/*
 * @Author: ztao
 * @Date: 2022-05-27 11:26:46
 * @LastEditTime: 2022-05-28 15:54:53
 * @Description:
 */
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'normalize.css';
import '@/styles/index.scss';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store).use(router).use(ElementPlus).mount('#app');
