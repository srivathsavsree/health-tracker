
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BootstrapNavbar from '@/components/layout/BootstrapNavbar';

export default function About() {
  return (
    <div className="min-vh-100 bg-light">
      <BootstrapNavbar />
      
      <main className="container py-5 mt-5">
        <div className="mb-4">
          <Link to="/" className="text-decoration-none d-inline-flex align-items-center mb-4">
            <ArrowLeft size={16} className="me-2" />
            Back to Home
          </Link>
          <h1 className="display-4 mb-3">About WellnessTracker</h1>
          <div className="row">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <h2 className="h4 mb-4">Our Mission</h2>
                  <p>
                    WellnessTracker was founded with a simple but powerful mission: to help people live healthier, 
                    more balanced lives through mindful tracking of their wellness journey.
                  </p>
                  
                  <h2 className="h4 mb-4 mt-5">What We Offer</h2>
                  <div className="row g-4 mb-5">
                    <div className="col-md-6">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="rounded-circle bg-primary bg-opacity-10 p-3 text-primary">
                            <i className="bi bi-activity fs-4"></i>
                          </div>
                        </div>
                        <div className="ms-3">
                          <h3 className="h5">Activity Tracking</h3>
                          <p className="text-muted">Monitor your physical activities and exercise patterns.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="rounded-circle bg-success bg-opacity-10 p-3 text-success">
                            <i className="bi bi-egg-fried fs-4"></i>
                          </div>
                        </div>
                        <div className="ms-3">
                          <h3 className="h5">Diet Management</h3>
                          <p className="text-muted">Log your meals and track nutritional intake.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="rounded-circle bg-warning bg-opacity-10 p-3 text-warning">
                            <i className="bi bi-trophy fs-4"></i>
                          </div>
                        </div>
                        <div className="ms-3">
                          <h3 className="h5">Goal Setting</h3>
                          <p className="text-muted">Set and track personal wellness goals.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="rounded-circle bg-info bg-opacity-10 p-3 text-info">
                            <i className="bi bi-graph-up fs-4"></i>
                          </div>
                        </div>
                        <div className="ms-3">
                          <h3 className="h5">Progress Visualization</h3>
                          <p className="text-muted">See your progress with intuitive charts and graphs.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="h4 mb-4">Our Team</h2>
                  <p>
                    We are a dedicated team of health professionals, nutritionists, fitness experts, and developers 
                    committed to bringing you the best wellness tracking experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="h5 mb-4">Get in Touch</h3>
                  <p>
                    Have questions about our service? Want to provide feedback? We'd love to hear from you!
                  </p>
                  <Link to="/contact" className="btn btn-primary d-block">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
