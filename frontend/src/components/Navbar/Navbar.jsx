import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, Home, Activity, Utensils, Target } from 'lucide-react';
import './Navbar.css';
import config from '../../config';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/" className="brand-link">
                        <span className="brand-text">{config.APP_NAME}</span>
                    </Link>
                </div>

                <button className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {user ? (
                    <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/dashboard" className="nav-link">
                            <Home size={18} className="nav-icon" />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/activities" className="nav-link">
                            <Activity size={18} className="nav-icon" />
                            <span>Activities</span>
                        </Link>
                        <Link to="/diet" className="nav-link">
                            <Utensils size={18} className="nav-icon" />
                            <span>Diet</span>
                        </Link>
                        <Link to="/goals" className="nav-link">
                            <Target size={18} className="nav-icon" />
                            <span>Goals</span>
                        </Link>
                        <Link to="/profile" className="nav-link">
                            <User size={18} className="nav-icon" />
                            <span>Profile</span>
                        </Link>
                        <button onClick={handleLogout} className="logout-btn">
                            <LogOut size={18} className="nav-icon" />
                            <span>Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="nav-link login-btn">Login</Link>
                        <Link to="/register" className="nav-link register-btn">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 