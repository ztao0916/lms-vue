<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const breadcrumbData = ref([]);
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item) => item.meta && item.meta.title);
};
watch(
  route,
  () => {
    getBreadcrumbData();
  },
  {
    immediate: true,
  },
);
const router = useRouter();
const onLinkClick = (item) => {
  router.push(item.path);
};
//将来需要替换主题
const store = useStore();
const linkHoverColor = ref(store.getters.cssVar.menuBg);
</script>
<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }
}
</style>
