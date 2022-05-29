/*
 * @Author: ztao
 * @Date: 2022-05-29 10:02:44
 * @LastEditTime: 2022-05-29 10:52:50
 * @Description: localStorage存储
 */
export const setItem = (key, value) => {
  //storage不能存储引用类型,需要转成基础类型
  if (typeof value == 'object') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

export const getItem = (key) => {
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

export const removeAllItem = () => {
  window.localStorage.clear();
};
