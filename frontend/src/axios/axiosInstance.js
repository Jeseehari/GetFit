import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://18.222.127.231"
});

axiosInstance.defaults.headers.common["Authorization"] = localStorage.getItem('token');

export default axiosInstance;