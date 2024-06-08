import axios from 'axios';

const url = process.env.REACT_APP_BACKEND_URL;

const httpRequest = axios.create({
    baseURL: 'http://13.239.21.34:8081',
    headers: {
        'Content-Type': 'application/json',
    },
});

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
