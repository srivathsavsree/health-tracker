
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Utensils, Trophy, ArrowRight } from 'lucide-react';
import BootstrapNavbar from '@/components/layout/BootstrapNavbar';

export default function MainPage() {
  return (
    <div className="min-vh-100">
      <BootstrapNavbar />
      
      {/* Hero Section */}
      <section className="bg-light py-5 mt-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Track Your Wellness Journey</h1>
              <p className="lead mb-4">Monitor your activities, diet, and progress all in one place. Achieve your health goals with our comprehensive tracking tools.</p>
              <div className="d-flex gap-3">
                <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
                <Link to="/about" className="btn btn-outline-secondary btn-lg">Learn More</Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000" 
                alt="Wellness Tracking" 
                className="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="h1 mb-3">Track Every Aspect of Your Wellness</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>Our comprehensive wellness tracker helps you monitor all dimensions of your health journey.</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <Activity size={32} className="text-primary" />
                  </div>
                  <h3 className="h4 mb-3">Activity Tracking</h3>
                  <p className="text-muted mb-4">Log and monitor your daily physical activities, workouts, and exercise routines with detailed metrics.</p>
                  <Link to="/login" className="btn btn-outline-primary mt-auto d-inline-flex align-items-center">
                    Track Activities <ArrowRight size={16} className="ms-2" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3">
                    <Utensils size={32} className="text-success" />
                  </div>
                  <h3 className="h4 mb-3">Diet Management</h3>
                  <p className="text-muted mb-4">Keep track of your meals, nutrition intake, and dietary habits to maintain a balanced eating pattern.</p>
                  <Link to="/login" className="btn btn-outline-success mt-auto d-inline-flex align-items-center">
                    Monitor Diet <ArrowRight size={16} className="ms-2" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="rounded-circle bg-warning bg-opacity-10 p-3 d-inline-flex mb-3">
                    <Trophy size={32} className="text-warning" />
                  </div>
                  <h3 className="h4 mb-3">Goal Setting</h3>
                  <p className="text-muted mb-4">Set personalized health and fitness goals, then track your progress with visual indicators and milestones.</p>
                  <Link to="/login" className="btn btn-outline-warning mt-auto d-inline-flex align-items-center">
                    Set Goals <ArrowRight size={16} className="ms-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="bg-primary text-white py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2 className="mb-3">Ready to start your wellness journey?</h2>
              <p className="lead mb-lg-0">Create your free account today and begin tracking your progress towards a healthier you.</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/signup" className="btn btn-light btn-lg">Sign Up Now</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
