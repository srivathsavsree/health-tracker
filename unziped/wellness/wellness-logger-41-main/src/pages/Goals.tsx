
import React, { useState } from 'react';
import BootstrapNavbar from '@/components/layout/BootstrapNavbar';
import { CheckCircle, Activity, GlassWater, Watch, Utensils, Brain, Apple, Heart } from 'lucide-react';

// Sample data for goals
const goalCategories = {
  daily: [
    { id: 1, title: 'Drink water', current: 6, target: 8, unit: 'glasses', completed: false, icon: <GlassWater size={16} className="text-primary" /> },
    { id: 2, title: 'Walk', current: 8500, target: 10000, unit: 'steps', completed: false, icon: <Activity size={16} className="text-success" /> },
    { id: 3, title: 'Meditate', current: 10, target: 10, unit: 'minutes', completed: true, icon: <Brain size={16} className="text-purple" /> },
    { id: 4, title: 'Eat vegetables', current: 3, target: 5, unit: 'servings', completed: false, icon: <Apple size={16} className="text-danger" /> },
  ],
  weekly: [
    { id: 1, title: 'Exercise', current: 3, target: 5, unit: 'days', completed: false, icon: <Activity size={16} className="text-success" /> },
    { id: 2, title: 'Sleep well', current: 4, target: 7, unit: 'nights', completed: false, icon: <Watch size={16} className="text-info" /> },
    { id: 3, title: 'Meal prep', current: 1, target: 1, unit: 'times', completed: true, icon: <Utensils size={16} className="text-warning" /> },
    { id: 4, title: 'Cardio workout', current: 2, target: 3, unit: 'hours', completed: false, icon: <Heart size={16} className="text-danger" /> },
  ],
  monthly: [
    { id: 1, title: 'Weight target', current: 2, target: 4, unit: 'lbs', completed: false, icon: <Activity size={16} className="text-success" /> },
    { id: 2, title: 'New recipes', current: 5, target: 8, unit: 'recipes', completed: false, icon: <Utensils size={16} className="text-warning" /> },
    { id: 3, title: 'Yoga classes', current: 6, target: 12, unit: 'classes', completed: false, icon: <Activity size={16} className="text-primary" /> },
    { id: 4, title: 'Alcohol-free days', current: 18, target: 20, unit: 'days', completed: false, icon: <GlassWater size={16} className="text-info" /> },
  ]
};

export default function Goals() {
  const [timeframe, setTimeframe] = useState('daily');

  const getGoals = () => {
    return goalCategories[timeframe as keyof typeof goalCategories] || goalCategories.daily;
  };

  return (
    <div className="min-vh-100 bg-light">
      <BootstrapNavbar />
      
      <main className="container py-5 mt-5">
        <header className="mb-4 pt-4">
          <h1 className="fw-bold">Health Goals</h1>
          <p className="text-muted">
            Set and track your health and fitness goals
          </p>
        </header>
        
        <div className="card p-4 mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div className="mb-3 mb-md-0">
              <h2 className="h4 fw-semibold mb-1">Goals Tracking</h2>
              <p className="text-muted">Track your health and fitness goals</p>
            </div>
            <div className="btn-group" role="group">
              <button 
                type="button" 
                className={`btn ${timeframe === 'daily' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setTimeframe('daily')}
              >
                Daily
              </button>
              <button 
                type="button" 
                className={`btn ${timeframe === 'weekly' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setTimeframe('weekly')}
              >
                Weekly
              </button>
              <button 
                type="button" 
                className={`btn ${timeframe === 'monthly' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setTimeframe('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>
          
          <div className="row g-3">
            {getGoals().map((goal) => (
              <div key={goal.id} className="col-md-6">
                <div className={`card p-3 ${goal.completed ? 'border-success bg-success bg-opacity-10' : 'bg-light border-0'}`}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center">
                      {goal.icon}
                      <h5 className="h6 mb-0 ms-2">{goal.title}</h5>
                    </div>
                    {goal.completed && (
                      <CheckCircle className="text-success" size={18} />
                    )}
                  </div>
                  
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="text-muted small">Progress</span>
                      <span className="fw-medium small">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                    </div>
                    
                    <div className="progress" style={{ height: "8px" }}>
                      <div 
                        className={`progress-bar ${getProgressColor(Math.round((goal.current / goal.target) * 100))}`}
                        role="progressbar" 
                        style={{ width: `${Math.min(Math.round((goal.current / goal.target) * 100), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="col-12 mt-3">
              <button className="btn btn-primary d-flex align-items-center justify-content-center w-100">
                <span className="me-2">+</span> Add New Goal
              </button>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <h2 className="h4 fw-semibold mb-3">Recommended Goals</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card bg-light border-0 p-3">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-primary p-2 text-white me-3">
                    <Heart size={16} />
                  </div>
                  <h6 className="mb-0">Improve Cardio</h6>
                </div>
                <p className="small mb-3">30 min cardio exercise 3x per week to improve heart health</p>
                <button className="btn btn-sm btn-outline-primary w-100">Add Goal</button>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card bg-light border-0 p-3">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-success p-2 text-white me-3">
                    <GlassWater size={16} />
                  </div>
                  <h6 className="mb-0">Hydration</h6>
                </div>
                <p className="small mb-3">Drink 2.5L of water daily to maintain proper hydration</p>
                <button className="btn btn-sm btn-outline-success w-100">Add Goal</button>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card bg-light border-0 p-3">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-warning p-2 text-white me-3">
                    <Watch size={16} />
                  </div>
                  <h6 className="mb-0">Better Sleep</h6>
                </div>
                <p className="small mb-3">Get 7-8 hours of quality sleep each night for recovery</p>
                <button className="btn btn-sm btn-outline-warning w-100">Add Goal</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getProgressColor(percentage: number) {
  if (percentage < 25) return "bg-danger";
  if (percentage < 50) return "bg-warning";
  if (percentage < 75) return "bg-info";
  return "bg-success";
}
