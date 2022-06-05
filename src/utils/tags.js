/*
 * @Author: ztao
 * @Date: 2022-06-05 17:36:13
 * @LastEditTime: 2022-06-05 17:36:22
 * @Description:不需要缓存的路由
 */
const whiteList = ['/login', '/import', '/404', '/401'];

export function isTags(path) {
  return !whiteList.includes(path);
}
