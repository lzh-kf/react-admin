import axios from "axios";
import { message } from 'antd';
import { refreshToken } from "../apis/index";
import { setSession } from './cache'
axios.defaults.baseURL = process.env.REACT_APP_API;
const whiteUrl = ["/login", "/queryMenusAndPermission"];
// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        const { action, url } = config;
        if (
            action &&
            !whiteUrl.includes(url)
        ) {
            // throw new Error("暂无权限");
        }
        config.headers.common["Authorization"] = setSession.token;
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    async response => {
        const { data } = response;
        if (data.err_code === 0) {
            return [null, response.data];
        } else if (data.err_code === 1001) {
            const [error, data] = await refreshToken();
            const { token } = data.data;
            if (error) {
                console.log(error);
            } else {
                sessionStorage.setItem("token", token);
            }
        } else {
            message.error(data.error.message)
            return [response.data, null];
        }
    },
    error => {
        message.error(error.message)
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default axios;
