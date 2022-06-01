<template>
  <div class="navbar">
    <hamburger class="humburger-container" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item command="modifyPassword">修改密码</el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item command="personConfig">个人设置</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
// 这里可以导入其他文件
import { useStore } from 'vuex';
import Hamburger from '@/components/Humburger';
import Breadcrumb from '@/components/Breadcrumb';
const store = useStore();
const handleCommand = (command) => {
  if (command == 'logout') {
    store.dispatch('user/logout');
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
  .humburger-container {
    line-height: 55px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>
