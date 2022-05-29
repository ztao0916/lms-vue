<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    active-text-color="#ffd04b"
    background-color="#545c64"
  >
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>导航二</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><document /></el-icon>
      <span>导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span>导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
// 这里可以导入其他文件
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>
<style lang="scss" scoped></style>
