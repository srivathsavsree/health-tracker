import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage and verify token on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Set token in api headers
        api.defaults.headers.common['x-auth-token'] = token;
        
        // Verify token and get fresh user data
        const res = await api.get('/api/auth');
        const userData = res.data;
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (err) {
        console.error('Error loading user:', err);
        // Clear invalid token/data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['x-auth-token'];
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { email, password });
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      api.defaults.headers.common['x-auth-token'] = token;
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to login' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/api/users', userData);
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      api.defaults.headers.common['x-auth-token'] = token;
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err.response?.data?.message || err.message);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to register' 
      };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await api.put('/api/users/profile', profileData);
      const updatedUser = res.data;
      
      // Update both local state and storage
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Refresh the user data to ensure consistency
      const freshUserData = await api.get('/api/auth');
      setUser(freshUserData.data);
      localStorage.setItem('user', JSON.stringify(freshUserData.data));
      
      return { success: true };
    } catch (err) {
      console.error('Profile update error:', err.response?.data?.message || err.message);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to update profile' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['x-auth-token'];
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        register, 
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 