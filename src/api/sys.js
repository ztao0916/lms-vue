/*
 * @Author: ztao
 * @Date: 2022-05-28 22:56:51
 * @LastEditTime: 2022-05-29 10:14:34
 * @Description: 登录 获取菜单等操作
 */
import request from '@/utils/request';
import qs from 'qs';
/**
 * 登录接口
 * @param {obj} data 账户密码集合
 * @returns 登录状态
 */
export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    data: qs.stringify(data),
  });
};

//获取用户信息
export const getWorkToDoMap = () => {
  return request({
    url: '/lms/dashboard/getWorkToDoMap',
    method: 'post',
  });
};

//获取菜单
export const menu = () => {
  return request({
    url: '/lms/menu',
    method: 'get',
  });
};
