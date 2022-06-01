<template>
  <div class="app-wrapper">
    <!-- 左侧menu -->
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部导航 -->
        <navbar />
      </div>
      <!-- 主体内容 -->
      <app-main />
    </div>
  </div>
</template>

<script setup>
// 这里可以导入其他文件
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Siderbar';
import AppMain from './components/AppMain.vue';
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>
