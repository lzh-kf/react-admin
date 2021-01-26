import axios from 'axios'
import { setSession } from "./cache"
import { message } from 'antd'
import { refreshToken } from '@/apis/login'

axios.defaults.baseURL = process.env.REACT_APP_API

let token

const handleError = (msg, data) => {
    message.info(msg)
    return [data, null]
}

axios.interceptors.request.use((config) => {
    if (token) {
        config.headers.common["Authorization"] = token
        console.log('token11', token)
    } else {
        token = setSession.token
        console.log('token', token)
        config.headers.common["Authorization"] = token
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(async (response) => {
    if (response.data.err_code === 0) {
        if (response.config.url === '/logout') {
            token = undefined
        }
        return [null, response.data];
    } else if (response.data.err_code === 1001) {
        // token过期
        const [error, responseData] = await refreshToken({ userAccount: setSession.user.userAccount });
        console.log(error)
        response.config.headers.Authorization = setSession.token = token = responseData.data.token;
        const [, refreshResponse] = await axios(response.config);
        if (refreshResponse.err_code === 0) {
            return [null, refreshResponse];
        } else {
            if (refreshResponse.error) {
                return handleError(refreshResponse.error.message, refreshResponse)
            }
        }
    } else {
        return handleError(response.data.error.message, response.data)
    }
}, (error) => handleError(error.message, null))

export default axios