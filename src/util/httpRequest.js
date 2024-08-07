import axios from 'axios';
import Cookies from 'js-cookie';

const url = process.env.REACT_APP_BACKEND_URL;
const httpRequest = axios.create({
    baseURL: 'http://202.191.56.11:8081', // Thay bằng URL API của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
httpRequest.interceptors.request.use(
    (config) => {
        const token = Cookies.get('jwt');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Add a response interceptor
httpRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = Cookies.get('refresh-token');
            if (refreshToken) {
                try {
                    const response = await httpRequest.post(`/refresh-token?refresh-token=${refreshToken}`, {
                        token: refreshToken,
                    });
                    const { AccessToken } = response.data.Data;
                    Cookies.set('jwt', response.data.Data, { expires: 7 });
                    httpRequest.defaults.headers['Authorization'] = 'Bearer ' + AccessToken;
                    originalRequest.headers['Authorization'] = 'Bearer ' + AccessToken;
                    return httpRequest(originalRequest);
                } catch (err) {
                    console.log('Refresh token expired or invalid, redirect to login');
                    Cookies.remove('jwt');
                    // Cookies.remove('refresh-token');
                    // window.location.href = '/';
                }
            } else {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    },
);

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, data = {}, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export const put = async (path, data = {}, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
};

export const deleted = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;
