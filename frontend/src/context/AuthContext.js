import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const AuthContext = createContext();

export { AuthContext };  // Export the context itself

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Try to get user data with the token
            fetchUserData(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        } finally {
            setLoading(false);
        }
    };

    const login = async (formData) => {
        try {
            const response = await axios.post(`${config.API_BASE_URL}/users/login`, formData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(response.data);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'An error occurred during login';
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post(`${config.API_BASE_URL}/users`, userData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(response.data);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'An error occurred during registration';
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user  // Add isAuthenticated property
    };

    return (
        <AuthContext.Provider value={value}>
            {children}  // Remove the loading check to prevent flickering
        </AuthContext.Provider>
    );
};