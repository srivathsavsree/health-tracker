import React from 'react';
import BootstrapNavbar from '@/components/layout/BootstrapNavbar';
import { Activity, Utensils, Trophy, ArrowRight, ChevronRight, Heart, Watch, Calendar, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-vh-100 bg-light">
      <BootstrapNavbar />
      
      <main className="container py-5 mt-5">
        <header className="mb-4 pt-4">
          <h1 className="fw-bold">Wellness Dashboard</h1>
          <p className="text-muted">
            Welcome back! Here's an overview of your wellness metrics
          </p>
        </header>
        
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="mb-3 p-2 rounded bg-light d-inline-block">
                <Activity size={24} className="text-primary" />
              </div>
              <h3 className="h5 fw-semibold mb-2">Activity Tracking</h3>
              <p className="text-muted mb-4">Track your workouts and stay active</p>
              <div className="mt-auto">
                <Link to="/activities" className="text-decoration-none text-primary fw-medium d-flex align-items-center">
                  <span>View details</span>
                  <ArrowRight size={16} className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="mb-3 p-2 rounded bg-light d-inline-block">
                <Utensils size={24} className="text-success" />
              </div>
              <h3 className="h5 fw-semibold mb-2">Diet & Nutrition</h3>
              <p className="text-muted mb-4">Monitor your calorie intake and diet</p>
              <div className="mt-auto">
                <Link to="/diet" className="text-decoration-none text-primary fw-medium d-flex align-items-center">
                  <span>View details</span>
                  <ArrowRight size={16} className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="mb-3 p-2 rounded bg-light d-inline-block">
                <Trophy size={24} className="text-warning" />
              </div>
              <h3 className="h5 fw-semibold mb-2">Health Goals</h3>
              <p className="text-muted mb-4">Set and achieve your fitness goals</p>
              <div className="mt-auto">
                <Link to="/goals" className="text-decoration-none text-primary fw-medium d-flex align-items-center">
                  <span>View details</span>
                  <ArrowRight size={16} className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card mb-4 p-4">
          <h2 className="h4 fw-semibold mb-4">Weekly Progress</h2>
          
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card bg-light border-0 h-100 p-3">
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle p-2 bg-primary bg-opacity-10 me-3">
                    <Heart size={16} className="text-primary" />
                  </div>
                  <h6 className="mb-0">Heart Rate</h6>
                </div>
                <h3 className="fw-bold mb-1">72 <small className="fw-normal text-muted fs-6">bpm</small></h3>
                <div className="progress mb-2">
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '75%' }}></div>
                </div>
                <span className="text-muted small">Resting average</span>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card bg-light border-0 h-100 p-3">
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle p-2 bg-success bg-opacity-10 me-3">
                    <Activity size={16} className="text-success" />
                  </div>
                  <h6 className="mb-0">Steps</h6>
                </div>
                <h3 className="fw-bold mb-1">8,462 <small className="fw-normal text-muted fs-6">steps</small></h3>
                <div className="progress mb-2">
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: '85%' }}></div>
                </div>
                <span className="text-muted small">Daily goal: 10,000</span>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card bg-light border-0 h-100 p-3">
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle p-2 bg-warning bg-opacity-10 me-3">
                    <Watch size={16} className="text-warning" />
                  </div>
                  <h6 className="mb-0">Sleep</h6>
                </div>
                <h3 className="fw-bold mb-1">7.2 <small className="fw-normal text-muted fs-6">hours</small></h3>
                <div className="progress mb-2">
                  <div className="progress-bar bg-warning" role="progressbar" style={{ width: '65%' }}></div>
                </div>
                <span className="text-muted small">Goal: 8 hours</span>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card bg-light border-0 h-100 p-3">
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle p-2 bg-danger bg-opacity-10 me-3">
                    <Utensils size={16} className="text-danger" />
                  </div>
                  <h6 className="mb-0">Calories</h6>
                </div>
                <h3 className="fw-bold mb-1">1,756 <small className="fw-normal text-muted fs-6">kcal</small></h3>
                <div className="progress mb-2">
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: '60%' }}></div>
                </div>
                <span className="text-muted small">Daily intake</span>
              </div>
            </div>
          </div>
          
          <div className="card bg-light border-0 p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Activity Timeline</h6>
              <div className="btn-group btn-group-sm" role="group">
                <button type="button" className="btn btn-light active">Week</button>
                <button type="button" className="btn btn-light">Month</button>
                <button type="button" className="btn btn-light">Year</button>
              </div>
            </div>
            
            <div style={{ height: "200px" }} className="d-flex align-items-end">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const heights = [60, 80, 45, 90, 70, 55, 65];
                return (
                  <div key={day} className="flex-grow-1 d-flex flex-column align-items-center">
                    <div 
                      className="bg-primary rounded-top w-50" 
                      style={{ height: `${heights[i]}%` }}>
                    </div>
                    <span className="mt-2 small text-muted">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="card mb-4 p-4">
          <h2 className="h4 fw-semibold mb-3">Today's Goals</h2>
          
          <div className="d-flex flex-column gap-3">
            <div className="card bg-light border-0 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-2 bg-primary bg-opacity-10 me-3">
                    <Activity size={16} className="text-primary" />
                  </div>
                  <div>
                    <h6 className="mb-0">Walk 10,000 steps</h6>
                    <span className="text-muted small">8,462 steps completed</span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="badge bg-primary">85%</span>
                </div>
              </div>
              <div className="progress mt-2">
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="card bg-light border-0 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-2 bg-success bg-opacity-10 me-3">
                    <Utensils size={16} className="text-success" />
                  </div>
                  <div>
                    <h6 className="mb-0">Drink 8 glasses of water</h6>
                    <span className="text-muted small">5 glasses consumed</span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="badge bg-success">62%</span>
                </div>
              </div>
              <div className="progress mt-2">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: '62%' }}></div>
              </div>
            </div>
            
            <div className="card bg-light border-0 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-2 bg-warning bg-opacity-10 me-3">
                    <Heart size={16} className="text-warning" />
                  </div>
                  <div>
                    <h6 className="mb-0">30 minutes of exercise</h6>
                    <span className="text-muted small">20 minutes completed</span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="badge bg-warning">67%</span>
                </div>
              </div>
              <div className="progress mt-2">
                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-4 text-white" style={{ 
          background: 'linear-gradient(to right, #0A84FF, #BF5AF2)',
          borderRadius: '1rem'
        }}>
          <div className="row align-items-center">
            <div className="col-md-9">
              <h2 className="h4 fw-semibold mb-2">Ready to start tracking?</h2>
              <p className="opacity-90 mb-md-0">
                Begin logging your activities and see your progress over time
              </p>
            </div>
            <div className="col-md-3 text-md-end">
              <Link to="/activities" className="btn btn-lg btn-light d-inline-flex align-items-center">
                Get Started
                <ChevronRight size={20} className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
