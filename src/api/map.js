/*
 * @Author: ztao
 * @Date: 2022-05-28 22:56:51
 * @LastEditTime: 2022-06-02 15:25:57
 * @Description: 法属国规则
 */
import request from '@/utils/request';
import qs from 'qs';

//获取国家列表
export const listCountry = () => {
  return request({
    url: '/lms/order/rule/fr/country/listcountry.html',
    method: 'get',
  });
};

//新增映射国家
export const updateCountry = (data) => {
  return request({
    url: '/lms/order/rule/fr/country/update.html',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    data: qs.stringify(data),
  });
};

//搜索映射国家
export const searchCountry = () => {
  return request({
    url: '/lms/order/rule/fr/country/list.html',
    method: 'get',
    params: {
      page: 1,
      limit: 100,
    },
  });
};
//删除映射国家
export const deleteCountry = (data) => {
  return request({
    url: '/lms/order/rule/fr/country/delete.html',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    data: qs.stringify(data),
  });
};
