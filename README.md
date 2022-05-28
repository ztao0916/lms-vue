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

```

```

最后有个大问题

后端没有提供接口,所以需要做一个接口代理(这里代理生产的API,因为测试的API只能公司服务器访问)

使用node编写,代码如下

```
```









