import axios from 'axios';
import config from '../config';

const instance = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    timeout: 10000 // 10 second timeout
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
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
        return response;
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            
            const errorMessage = error.response.data?.message || 'An error occurred. Please try again.';
            console.error('API Error:', errorMessage);
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network Error:', error.request);
            throw new Error('Network error. Please check your connection and try again.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            throw new Error('An unexpected error occurred. Please try again.');
        }
    }
);

export default instance; 