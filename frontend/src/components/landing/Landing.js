import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Track Your Health Journey</h1>
                    <p>Monitor your activities, diet, and progress all in one place. Achieve your health goals with our comprehensive tracking tools.</p>
                    <div className="hero-buttons">
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                        <Link to="/about" className="btn btn-secondary">Learn More</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Track Every Aspect of Your Health</h2>
                <p className="features-subtitle">Our comprehensive health tracker helps you monitor all dimensions of your health journey.</p>
                
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon activity-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                        </div>
                        <h3>Activity Tracking</h3>
                        <p>Log and monitor your daily physical activities, workouts, and exercise routines</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon diet-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 3h18v18H3zM8 12h8M12 8v8"/>
                            </svg>
                        </div>
                        <h3>Diet Management</h3>
                        <p>Keep track of your meals, nutrition intake, and dietary habits to maintain a balanced diet</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon goal-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v20M2 12h20"/>
                            </svg>
                        </div>
                        <h3>Goal Setting</h3>
                        <p>Set personalized health and fitness goals, then track your progress with visual indicators and milestones</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing; 