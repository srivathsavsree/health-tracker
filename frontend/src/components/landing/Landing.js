import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Landing.css';
import config from '../../config';

const Landing = () => {
    const { user } = useAuth();

    return (
        <div className="landing">
            <div className="landing-content">
                <h1>{config.APP_NAME}</h1>
                <p>Track your health, achieve your goals, and live better.</p>
                
                {user ? (
                    <Link to="/dashboard" className="cta-button">
                        Go to Dashboard
                    </Link>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="cta-button">
                            Login
                        </Link>
                        <Link to="/register" className="cta-button secondary">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Landing; 