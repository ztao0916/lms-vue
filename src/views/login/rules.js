/*
 * @Author: ztao
 * @Date: 2022-05-28 21:35:45
 * @LastEditTime: 2022-05-28 21:41:28
 * @Description:
 */
export const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (value.length < 6) {
      callback(new Error('密码长度不能小于6位'));
    }
    callback();
  }
};
