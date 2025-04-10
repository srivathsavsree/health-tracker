import React from 'react';
import { Link } from 'react-router-dom';
import healthImage from '../../assets/health-tracking.jpg';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing">
<<<<<<< HEAD
=======
            <nav className="landing-nav">
                <div className="nav-logo">Health Tracker</div>
                <div className="nav-buttons">
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-button">Sign Up</Link>
                </div>
            </nav>
            
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
            <div className="landing-content">
                <div className="landing-text">
                    <h1>
                        <span className="text-primary">Track Your</span><br />
                        <span className="text-secondary">Health Journey</span><br />
                        <span className="text-primary">With Us</span>
                    </h1>
                    <p className="subtitle">
                        Your all-in-one solution for monitoring fitness,<br />
                        nutrition, and wellness goals.
                    </p>
                    <Link to="/register" className="cta-button">
<<<<<<< HEAD
                        Get Started
=======
                        Sign Up Now
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
                    </Link>
                </div>
                <div className="landing-image">
                    <img src={healthImage} alt="Health tracking illustration" />
                </div>
            </div>
        </div>
    );
};

export default Landing; 