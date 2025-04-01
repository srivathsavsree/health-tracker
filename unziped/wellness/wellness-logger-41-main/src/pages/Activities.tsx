
import React, { useEffect } from 'react';
import BootstrapNavbar from '@/components/layout/BootstrapNavbar';
import { Activity, TrendingUp, Clock, Flame, Heart, Watch, Dumbbell, Bike } from 'lucide-react';

const weeklyActivityData = {
  current: 12.5, // hours
  previous: 10.2, // hours
  change: 22.5, // percentage
};

const dailyActivityData = [
  { day: 'Mon', hours: 1.2 },
  { day: 'Tue', hours: 2.5 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 2.0 },
  { day: 'Fri', hours: 2.7 },
  { day: 'Sat', hours: 1.5 },
  { day: 'Sun', hours: 0.8 },
];

const recentActivityLogs = [
  {
    id: 1,
    activity: 'Running',
    duration: '45 min',
    calories: 320,
    timestamp: new Date('2023-07-01T08:30:00'),
    icon: <Activity className="text-primary" />
  },
  {
    id: 2,
    activity: 'Strength Training',
    duration: '60 min',
    calories: 280,
    timestamp: new Date('2023-07-01T16:15:00'),
    icon: <Dumbbell className="text-warning" />
  },
  {
    id: 3,
    activity: 'Yoga',
    duration: '30 min',
    calories: 150,
    timestamp: new Date('2023-06-30T07:00:00'),
    icon: <Activity className="text-success" />
  },
  {
    id: 4,
    activity: 'Swimming',
    duration: '40 min',
    calories: 350,
    timestamp: new Date('2023-06-29T18:00:00'),
    icon: <Activity className="text-info" />
  },
  {
    id: 5,
    activity: 'Cycling',
    duration: '75 min',
    calories: 480,
    timestamp: new Date('2023-06-28T16:30:00'),
    icon: <Bike className="text-danger" />
  },
];

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default function Activities() {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <BootstrapNavbar />
      
      <main className="container py-5 mt-5">
        <header className="mb-4 pt-4">
          <h1 className="fw-bold">Activity Tracking</h1>
          <p className="text-muted">
            Track and monitor your physical activity
          </p>
        </header>
        
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="text-muted">Weekly Activity</h5>
                <Activity size={24} className="text-primary" />
              </div>
              <h2 className="display-4 fw-bold mb-0">{weeklyActivityData.current}</h2>
              <p className="text-muted">hours</p>
              <div className="badge bg-success bg-opacity-10 text-success px-2 py-1 d-inline-flex align-items-center">
                <TrendingUp size={14} className="me-1" />
                {weeklyActivityData.change}% vs last week
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="text-muted">Daily Average</h5>
                <TrendingUp size={24} className="text-success" />
              </div>
              <h2 className="display-4 fw-bold mb-0">{(weeklyActivityData.current / 7).toFixed(1)}</h2>
              <p className="text-muted">hours</p>
              <div className="text-muted">
                Based on your weekly activities
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="text-muted">Top Activity</h5>
                <Heart size={24} className="text-danger" />
              </div>
              <h2 className="display-4 fw-bold mb-0">Running</h2>
              <p className="text-muted">3.2 hours this week</p>
              <div className="text-muted">
                45% of your total activity time
              </div>
            </div>
          </div>
        </div>
        
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="mb-1">Daily Activity</h5>
                  <p className="text-muted mb-0">Hours of activity per day</p>
                </div>
                <div className="d-flex align-items-center">
                  <Clock className="text-primary me-2" size={20} />
                  <span className="fw-medium">Hours</span>
                </div>
              </div>
              
              <div style={{ height: "250px" }} className="d-flex align-items-end">
                {dailyActivityData.map((item) => (
                  <div key={item.day} className="flex-grow-1 d-flex flex-column align-items-center">
                    <div 
                      className="bg-primary rounded-top w-50" 
                      style={{ height: `${(item.hours / 3) * 100}%` }}>
                    </div>
                    <span className="mt-2 small text-muted">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Recent Activities</h5>
                <button className="btn btn-sm btn-outline-primary">View All</button>
              </div>
              
              <div className="d-flex flex-column gap-3">
                {recentActivityLogs.map((activity) => (
                  <div key={activity.id} className="card bg-light border-0 p-3">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-white p-2 me-3">
                        {activity.icon}
                      </div>
                      
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{activity.activity}</h6>
                        <p className="text-muted small mb-0">{formatDate(activity.timestamp)}</p>
                      </div>
                      
                      <div className="text-end">
                        <div className="d-flex align-items-center text-muted small mb-1">
                          <Clock size={14} className="me-1" />
                          {activity.duration}
                        </div>
                        <div className="d-flex align-items-center text-muted small">
                          <Flame size={14} className="me-1" />
                          {activity.calories} cal
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="btn btn-primary mt-3">
                <div className="d-flex align-items-center justify-content-center">
                  <Activity size={18} className="me-2" />
                  Log New Activity
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
