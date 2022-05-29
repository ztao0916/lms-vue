/*
 * @Author: ztao
 * @Date: 2022-05-28 22:33:19
 * @LastEditTime: 2022-05-29 11:01:55
 * @Description: axios封装
 */
import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true, //携带身份认证文件cookie
});

service.interceptors.request.use(
  (config) => {
    /**
     * config.headers.cookie = '123456'; //浏览器报错:Refused to set unsafe header "cookie"
     * 这里正常来说是需要有一个请求拦截的,添加token的操作
     * 目标服务器现在是cookie,所以需要添加cookie,
     * 后端这里有个逻辑,你调用登录接口成功以后,就通过set-cookie把cookie注入到浏览器里了,而且前端获取不到
     * 所以不需要请求拦截统一注入token
     */
    return config; //必须返回配置
  },
  (error) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const { code, data, msg } = response.data;
    //要根据code决定下面的操作
    if (code == '0000') {
      return data;
    } else {
      //业务错误
      ElMessage.error(msg || '请求失败'); //提示错误信息
      return Promise.reject(new Error(msg || '请求失败'));
    }
  },
  (error) => {
    console.log(error);
    ElMessage.error(error || error.message);
    return Promise.reject(error);
  },
);

export default service;
