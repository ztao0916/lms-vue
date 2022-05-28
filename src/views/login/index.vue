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
import { login } from '@/api/sys';
const loginForm = reactive({
  username: 'ztt',
  // password: 'Rc1335',
  password: 'z123456',
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
      login(loginForm).then((res) => {
        console.log(res);
      });
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
