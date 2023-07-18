import axios from 'axios'
import {ElMessage} from 'element-plus'
import useStore from "@/store";

// 创建 axios 实例
const service = axios.create({
    baseURL: "http://127.0.0.1:8888"
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.satoken = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const {code, msg} = response.data;
        if (code === 200) {
            return response.data;
        } else {
            ElMessage({message: msg, type: 'error'});
            return Promise.reject(new Error(msg));
        }
    },
    (error) => {
        ElMessage({message: '系统出错', type: 'error',});
        return Promise.reject(error.message);
    }
);
// 导出 axios 实例
export default service;
