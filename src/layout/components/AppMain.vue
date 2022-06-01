<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script setup>
// 这里可以导入其他文件
</script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
