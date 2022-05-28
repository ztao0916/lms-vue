/*
 * @Author: ztao
 * @Date: 2022-05-27 11:26:46
 * @LastEditTime: 2022-05-28 23:58:15
 * @Description: vue.config.js配置信息:默认不动,只增加
 */
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
  },
  devServer: {
    open: true, // 是否打开浏览器
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://test.epean.cn',
        // target: 'https://lms.epean.com.cn',
        changeOrigin: true, // 是否跨域
        secure: true, //如果是https请设置为true
        pathRewrite: {
          '^/api': '',
        },
        cookieDomainRewrite: {
          // 'lms.epean.com.cn': 'localhost',
          'test.epean.cn': 'localhost',
        },
      },
    },
  },
});
