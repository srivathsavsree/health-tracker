import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './components/Navbar/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HealthProvider } from './context/HealthContext';
import Landing from './components/landing/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Activities from './components/activities/Activities';
import Diet from './components/diet/Diet';
import Goals from './components/goals/Goals';
import Profile from './components/profile/Profile';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <HealthProvider>
                    <div className="App">
                        <NavigationBar />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<Landing />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <PrivateRoute>
                                            <Dashboard />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/activities"
                                    element={
                                        <PrivateRoute>
                                            <Activities />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/diet"
                                    element={
                                        <PrivateRoute>
                                            <Diet />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/goals"
                                    element={
                                        <PrivateRoute>
                                            <Goals />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <PrivateRoute>
                                            <Profile />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </main>
                    </div>
                </HealthProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
