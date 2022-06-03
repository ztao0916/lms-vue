/*
 * @Author: ztao
 * @Date: 2022-05-27 11:26:46
 * @LastEditTime: 2022-06-02 14:42:00
 * @Description: vue.config.js配置信息:默认不动,只增加
 */
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '@views': resolve('src/views'),
          '@store': resolve('src/store'),
        },
        fallback: {
          path: require.resolve('path-browserify'),
        },
      },
    };
  },
  devServer: {
    // open: true, // 是否打开浏览器
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'https://test.epean.cn',
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
