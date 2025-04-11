import axios from 'axios';
import config from '../config';

const instance = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`${config.method.toUpperCase()} ${config.url}`, config.data);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        console.log('Response:', response.config.url, response.data);
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        console.error('Response error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default instance; 