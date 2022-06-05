<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <template v-for="item in menuRoutes" :key="item.path">
      <sidebar-item :route="item" />
    </template>
  </el-menu>
</template>

<script setup>
// 这里可以导入其他文件
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { filterRoutes, generateMenus } from '@/utils/route';
import SidebarItem from './SidebarItem.vue';
const router = useRouter();
const menuRoutes = computed(() => {
  const filterRoutesArr = filterRoutes(router.getRoutes());
  return generateMenus(filterRoutesArr);
});
//计算高亮menu
const route = useRoute();
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>
<style lang="scss" scoped></style>
