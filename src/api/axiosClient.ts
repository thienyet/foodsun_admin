import axios from 'axios';
import queryString from 'query-string';
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json; multipart/form-data;',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response) {
        return response;
    }
    return response;
}, (error) => {
     if (error.response.data.code === 401) {
        localStorage.clear();
        history.push("/login");
        console.log("Xóa token thành công");
    }
    console.log(error);
});

export default axiosClient; 
