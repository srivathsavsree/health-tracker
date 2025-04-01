import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { HealthProvider } from './context/HealthContext';
import Landing from './components/landing/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Activities from './components/activities/Activities';
import Diet from './components/diet/Diet';
import Goals from './components/goals/Goals';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <HealthProvider>
          <div className="App">
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activities"
                element={
                  <ProtectedRoute>
                    <Activities />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/diet"
                element={
                  <ProtectedRoute>
                    <Diet />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/goals"
                element={
                  <ProtectedRoute>
                    <Goals />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </HealthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
