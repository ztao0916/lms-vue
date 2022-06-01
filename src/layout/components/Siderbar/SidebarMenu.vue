<template>
  <el-menu default-active="2" text-color="#fff" :background-color="variables.menuBg">
    <el-sub-menu index="1">
      <template #title>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="2">
      <span>导航二</span>
    </el-menu-item>
    <el-menu-item index="3">
      <span>导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <span>导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
// 这里可以导入其他文件
import variables from '@/styles/variables.module.scss';
import { generateMenus } from '@/utils/route';
import { useRouter } from 'vue-router';
import {} from 'vuex';
const router = useRouter();
// const store = useStore();
console.log('router路由', router.getRoutes());
console.log('处理后的路由', generateMenus(router.getRoutes()));
// let menus = store.getters.menus;
// for (let i = 0; i < menus.length; i++) {
//   console.log(menus[i].name);
// }
</script>
<style lang="scss" scoped></style>
