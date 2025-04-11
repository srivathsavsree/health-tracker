import { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import config from '../config';

const AuthContext = createContext();

export { AuthContext };  // Export the context itself

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.get('/auth/check');
                setUser(response.data);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            setError(null);
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 'Login failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const register = async (userData) => {
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            setError(null);
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'Registration failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setError(null);
    };

    const updateUser = async (userData) => {
        try {
            const response = await axiosInstance.put('/users/me', userData);
            setUser(prevUser => ({
                ...prevUser,
                ...response.data
            }));
            return response.data;
        } catch (error) {
            console.error('Profile update error:', error);
            const errorMessage = error.response?.data?.message || 'Profile update failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};