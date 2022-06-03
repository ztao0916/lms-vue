/*
 * @Author: ztao
 * @Date: 2022-03-21 15:55:56
 * @LastEditTime: 2022-06-02 10:21:26
 * @Description: 处理路由:生成menu格式的路由
 */
import path from 'path';

//返回所有的子路由

const getChildrenRoutes = (routes) => {
  const result = [];
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children);
    }
  });
  return result;
};

/**
 * @description: 筛选出一级路由
 * @param {*} routes router.getRoutes() 获取所有的路由
 * @return {*} 筛选出一级路由
 */
export const filterRoutes = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes);
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path;
    });
  });
};

/**
 * @description: 判断数据是否为空值
 * @param {*} data 传入的数据
 * @return {*} 返回布尔值
 */
function isNull(data) {
  if (!data) return true;
  if (JSON.stringify(data) === '{}') return true;
  if (JSON.stringify(data) === '[]') return true;
  return false;
}

/**
 * @description: 创建菜单路由表
 * @param {*} routes 路由集合
 * @param {*} basePath 基础路径
 * @return {*} 返回菜单路由结构
 */
export function generateMenus(routes, basePath = '') {
  const result = [];
  //遍历路由表
  routes.forEach((item) => {
    //不存在children并且不存在meta,直接return
    if (isNull(item.meta) && isNull(item.children)) return;
    //存在children但是不存在meta,迭代处理,只有path=/不存在meta
    if (isNull(item.meta) && !isNull(item.children)) {
      // console.log('meta为空,children不为空', item.children);
      result.push(...generateMenus(item.children)); //执行递归
      return;
    }
    //执行具体的逻辑
    // console.log('item', item);
    //合并path作为跳转路径
    const routePath = path.resolve(basePath, item.path);
    //路由分离之后,存在同名副路由的情况,需要单独处理
    let route = result.find((item) => item.path === routePath);
    // console.log('route', route);
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: [],
      };
      //icon与title必须全部存在
      if (route.meta.icon && route.meta.title) {
        //meta存在生成route对象,放入arr
        result.push(route);
      }
    }
    //存在children进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path));
    }
  });
  return result;
}
