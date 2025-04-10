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
<<<<<<< HEAD
            const response = await axios.get(`${config.API_BASE_URL}/api/auth/profile`, {
=======
            const response = await axios.get(`${config.API_BASE_URL}/users/me`, {
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
<<<<<<< HEAD
            setUser(null);
=======
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
        } finally {
            setLoading(false);
        }
    };

    const login = async (formData) => {
        try {
<<<<<<< HEAD
            const response = await axios.post(`${config.API_BASE_URL}/api/auth/login`, formData);
            const { token, user } = response.data;
=======
            const response = await axios.post(`${config.API_BASE_URL}/users/login`, formData);
            const { token } = response.data;
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
<<<<<<< HEAD
            const response = await axios.post(`${config.API_BASE_URL}/api/auth/register`, userData);
            const { token, user } = response.data;
=======
            const response = await axios.post(`${config.API_BASE_URL}/users`, userData);
            const { token } = response.data;
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const updateUser = async (userData) => {
        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/user/profile`, userData);
            setUser(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const value = {
        user,
        login,
        register,
        logout,
<<<<<<< HEAD
        updateUser,
        loading,
        isAuthenticated: !!user
=======
        loading,
        isAuthenticated: !!user  // Add isAuthenticated property
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
    };

    if (loading) {
        return null; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={value}>
<<<<<<< HEAD
            {children}
=======
            {children}  // Remove the loading check to prevent flickering
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
        </AuthContext.Provider>
    );
};