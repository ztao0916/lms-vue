# lms-vue
```
公司项目重构,从零开始记录项目进度
```

### 2022/5/27 初始化

#### vue初始化

使用的是vue3,大致操作如下

```js
npm install -g @vue/cli
//或者
yarn global add @vue/cli
//查看是否安装成功
vue --version
//创建新项目,项目名demo
vue create demo

```

#### vue代码规范化

##### 配置和插件

参考文章: [传送门](https://fairy.city/2022/03/10/0e2bd3348b44.html)

本地vscode需要安装的插件

```
eslint
prettier
EditorConfig for VS Code
```



##### 类,id还有其他样式定义规范

样式初始化



思考中...待处理



#### 一些基础配置

配置`vue.config.js`文件

```js
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
        changeOrigin: true, // 是否跨域
        //secure: true, //如果是https请设置为true
        pathRewrite: {
          '^/api': '',
        },
        cookieDomainRewrite: {
          'test.epean.cn': 'localhost',
        },
      },
    },
  },
});
```



### 2022/5/28 登录功能开发

#### 1. 导入elementplus

```js
yarn add element-plus
//main.js文件添加如下
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).mount('#app');
```



#### 2. 创建views/login目录

在该目录下创建`index.vue`文件,同时修改`router/index.js`文件匹配到路由

```js
//使用代码片段,在login/index.vue文件中生成以下内容
<template>
<div>
 我是登录页
</div>
</template>

<script setup>
// 这里可以导入其他文件
</script>
<style lang='scss' scoped>
</style>

//router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';

//公共路由
const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    // 按需加载
    component: () => import(/* webpackChunkName: "login" */ '@views/login'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});

export default router;
```

然后,根据`elementplus`官方文档表单模块:[传送门](https://element-plus.gitee.io/zh-CN/component/form.html#%E5%85%B8%E5%9E%8B%E8%A1%A8%E5%8D%95)写登录页,配置好相应的样式以及表单校验,代码如下

```vue
<template>
  <div class="login">
    <div class="login-container">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>亿品贸易</span>
          </div>
        </template>
        <div>
          <el-form ref="ruleFormRef" class="login-form" :model="loginForm" :rules="loginRules">
            <el-form-item prop="username">
              <span class="icon-container">
                <span class="iconfont">&#xe7ae;</span>
              </span>
              <el-input type="text" autocomplete="off" placeholder="用户名" v-model="loginForm.username" />
            </el-form-item>
            <el-form-item prop="password">
              <span class="icon-container">
                <span class="iconfont">&#xe7fb;</span>
              </span>
              <el-input placeholder="密码" type="password" autocomplete="new-password" v-model="loginForm.password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%; margin-top: 30px" :loading="loading" @click="submitForm(ruleFormRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
// 这里可以导入其他文件
import { reactive, ref } from 'vue';
import { validatePassword } from './rules';
const loginForm = reactive({
  username: 'admin',
  password: '123456',
});
const ruleFormRef = ref();
//loading展示
const loading = ref(false);
const loginRules = reactive({
  password: [{ validator: validatePassword, trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
});
//提交表单
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
.login {
  min-height: 100vh;
  width: 100%;
  background-image: url(../../img/login-bg.0899ffa6.jpg);
  background-size: cover;
  background-position: 50%;
  position: relative;
  .login-container {
    position: absolute;
    right: 200px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    .login-form {
      :deep .el-form-item__content {
        position: relative;
        input {
          padding: 12px 5px 12px 15px;
        }
        .icon-container {
          position: absolute;
          padding: 6px;
          vertical-align: middle;
          display: inline-block;
          z-index: 999;
        }
      }
    }
  }
}
</style>

```

接口调用的话,需要封装axios,封装以后的代码如下

```js
//安装axios
yarn add axios
//创建utils/request.js文件,环境变量文件需自定义
import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  // withCredentials: true, //携带身份认证文件cookie
});

service.interceptors.request.use(
  (config) => {
    /**
     * config.headers.cookie = '123456'; //浏览器报错:Refused to set unsafe header "cookie"
     * 这里正常来说是需要有一个请求拦截的,添加token的操作
     * 目标服务器现在是cookie,所以需要添加cookie,
     * 后端这里有个逻辑,你调用登录接口成功以后,就自动把cookie注入到浏览器的cookie里了
     * 所以不需要请求拦截统一注入token
     */
    return config; //必须返回配置
  },
  (error) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const { code, data, msg } = response.data;
    //要根据code决定下面的操作
    if (code == '0000') {
      return data;
    } else {
      //业务错误
      ElMessage.error(msg || '请求失败'); //提示错误信息
      return Promise.reject(new Error(msg || '请求失败'));
    }
  },
  (error) => {
    console.log(error);
    ElMessage.error(error || error.message);
    return Promise.reject(error);
  },
);

export default service;

```

##### 代理问题(重点)

有个代理的问题,需要着重记录一下

我们服务器使用的是cookie校验,加上后端不想改代码,那么前端应该怎么做呢?

处理`cookie`的代理问题

我们代码这里,只要你调用登录成功,`cookie`就会自动注入浏览器的`application-Cookie`里

`httpOnly`的cookie是无法通过`document.cookie`或者`js-cookie`获取的,原因就是浏览器策略问题,防止`cookie`盗用

```js
//第一步: 封装axios添加withCredentials: true
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true, //携带身份认证文件cookie
});
//第二步: 在vue.config.js的devProxy中
    proxy: {
      '/api': {
        target: 'https://xxx',
        changeOrigin: true, // 是否跨域
        secure: true, //如果是https请设置为true
        pathRewrite: {
          '^/api': '',
        },
        cookieDomainRewrite: {
          'xxx': 'localhost',
        },
      },
    },
//第三步: 重启vue项目,然后调用登录接口,登录完成以后在调用权限菜单,可以发现cookie已经被加在菜单请求的headers里了
```



#### 3. 使用store

这里主要是处理登录和退出功能,因为后端设置了`httpOnly`,所以登录和退出时,cookie的操作都不能由js完成,而是通过调用后端接口

需要把登录封装到store里面,方便每次给请求设置`token`

我们项目里是不需要的,因为`cookie`前端不存储,为了熟悉整个开发流程,还是搞一下

```
```













