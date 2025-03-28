import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { useAuth } from '../../context/AuthContext';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const { stats, healthRecords, loading } = useHealth();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    // Calculate progress
    const progress = 43; // This will be calculated based on goals met
    const dailyCalories = 1500;
    const nutritionRatio = "10/4/2c";
    const goalsProgress = "2/4";

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>Health Tracker</h1>
                </div>
                <div className="header-right">
                    <span className="user-name">{user.name}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </header>

            <div className="metrics-grid">
                <div className="metric-card progress">
                    <h3>Progress</h3>
                    <div className="metric-value">{progress}%</div>
                </div>
                <div className="metric-card calories">
                    <h3>Daily Calories</h3>
                    <div className="metric-value">{dailyCalories} cal</div>
                </div>
                <div className="metric-card nutrition">
                    <h3>Nutrition</h3>
                    <div className="metric-value">{nutritionRatio}</div>
                </div>
                <div className="metric-card goals">
                    <h3>Goals</h3>
                    <div className="metric-value">{goalsProgress}</div>
                </div>
            </div>

            <div className="tracking-sections">
                <section className="tracking-section activity">
                    <h2>Activity</h2>
                    <div className="tracking-form">
                        <input type="text" placeholder="Activity name" />
                        <input type="number" placeholder="Duration (minutes)" />
                        <button className="set-goal-btn">Set Goal</button>
                    </div>
                </section>

                <section className="tracking-section nutrition">
                    <h2>Nutrition</h2>
                    <div className="tracking-form">
                        <input type="number" placeholder="Calories" />
                        <input type="number" placeholder="Water intake (glasses)" />
                        <button className="set-goal-btn">Set Goal</button>
                    </div>
                </section>

                <section className="tracking-section sleep">
                    <h2>Sleep</h2>
                    <div className="tracking-form">
                        <div className="sleep-info">
                            <span>Sleep: 6 hrs</span>
                            <span>Goal: 8 hrs</span>
                        </div>
                        <button className="start-btn">Start Tracking</button>
                    </div>
                </section>
            </div>

            <div className="visualization">
                <h2>Progress Overview</h2>
                <div className="chart-container">
                    <Line
                        data={{
                            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            datasets: [
                                {
                                    label: 'Calories',
                                    data: [1200, 1500, 1300, 1400, 1600, 1450, 1500],
                                    borderColor: 'rgb(75, 192, 192)',
                                    tension: 0.1
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 