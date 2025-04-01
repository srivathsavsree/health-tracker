
import React, { useState } from 'react';
import BootstrapNavbar from '@/components/layout/BootstrapNavbar';
import { User, Lock, Bell, Database, ChevronRight } from 'lucide-react';

export default function Settings() {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <div className="min-vh-100 bg-light">
      <BootstrapNavbar />
      
      <main className="container py-5 mt-5">
        <header className="mb-4 pt-4">
          <h1 className="fw-bold">Settings</h1>
          <p className="text-muted">
            Manage your account and preferences
          </p>
        </header>
        
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card p-2 sticky-md-top" style={{ top: '80px' }}>
              <div className="list-group list-group-flush">
                {[
                  { id: 'personal', name: 'Personal Information', icon: <User size={18} /> },
                  { id: 'security', name: 'Login & Security', icon: <Lock size={18} /> },
                  { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
                  { id: 'data', name: 'Data & Privacy', icon: <Database size={18} /> },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`list-group-item list-group-item-action d-flex align-items-center ${
                      activeSection === section.id ? 'active' : ''
                    }`}
                  >
                    <span className="me-3">{section.icon}</span>
                    {section.name}
                    <ChevronRight size={16} className="ms-auto" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-md-9">
            {activeSection === 'personal' && (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Personal Information</h5>
                  <p className="text-muted small mb-0">
                    Manage your personal details and health information
                  </p>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" defaultValue="John Doe" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" defaultValue="john.doe@example.com" />
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-4 mb-3 mb-md-0">
                        <label className="form-label">Age</label>
                        <input type="number" className="form-control" defaultValue="32" />
                      </div>
                      <div className="col-md-4 mb-3 mb-md-0">
                        <label className="form-label">Gender</label>
                        <select className="form-select">
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Height (cm)</label>
                        <input type="number" className="form-control" defaultValue="175" />
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label">Weight (kg)</label>
                        <input type="number" className="form-control" defaultValue="75" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Activity Level</label>
                        <select className="form-select">
                          <option value="sedentary">Sedentary</option>
                          <option value="light">Lightly Active</option>
                          <option value="moderate" selected>Moderately Active</option>
                          <option value="very">Very Active</option>
                          <option value="extremely">Extremely Active</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Medical Conditions (optional)</label>
                      <textarea 
                        className="form-control" 
                        rows={3}
                        placeholder="List any relevant medical conditions or allergies..."
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </form>
                </div>
              </div>
            )}
            
            {activeSection === 'security' && (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Login & Security</h5>
                  <p className="text-muted small mb-0">
                    Manage your account security settings and linked accounts
                  </p>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row mb-4">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" defaultValue="johndoe" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                          <input type="password" className="form-control" defaultValue="••••••••" disabled />
                          <button className="btn btn-outline-secondary" type="button">Change</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card bg-light border-0 p-3 mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Two-Factor Authentication</h6>
                          <p className="text-muted small mb-0">Add an extra layer of security to your account</p>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="twoFactorSwitch" />
                        </div>
                      </div>
                    </div>
                    
                    <h6 className="mb-3">Linked Accounts</h6>
                    <div className="d-flex flex-column gap-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="googleAccount" checked />
                        <label className="form-check-label d-flex align-items-center" htmlFor="googleAccount">
                          <svg viewBox="0 0 24 24" className="me-2" width="20" height="20" aria-hidden="true">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          Google
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="appleAccount" />
                        <label className="form-check-label d-flex align-items-center" htmlFor="appleAccount">
                          <svg viewBox="0 0 24 24" className="me-2" width="20" height="20" aria-hidden="true">
                            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.913 1.183-4.962 3.007-2.12 3.675-.543 9.118 1.516 12.105 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.925-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.596 1.09z" fill="currentColor"/>
                          </svg>
                          Apple
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="facebookAccount" checked />
                        <label className="form-check-label d-flex align-items-center" htmlFor="facebookAccount">
                          <svg viewBox="0 0 24 24" className="me-2" width="20" height="20" aria-hidden="true">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                          </svg>
                          Facebook
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {activeSection === 'notifications' && (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Notifications</h5>
                  <p className="text-muted small mb-0">
                    Manage how you receive updates and reports
                  </p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Email Notifications</h6>
                        <p className="text-muted small mb-0">Receive updates and alerts via email</p>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="emailSwitch" checked />
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Push Notifications</h6>
                        <p className="text-muted small mb-0">Receive alerts on your device</p>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="pushSwitch" checked />
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Weekly Progress Reports</h6>
                        <p className="text-muted small mb-0">Receive a summary of your health metrics each week</p>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="weeklyReportSwitch" checked />
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Goal Reminders</h6>
                        <p className="text-muted small mb-0">Get reminded about your incomplete goals</p>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="goalReminderSwitch" />
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">New Features & Updates</h6>
                        <p className="text-muted small mb-0">Learn about new features and app updates</p>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="updateSwitch" checked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'data' && (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Data & Privacy</h5>
                  <p className="text-muted small mb-0">
                    Manage your data and privacy preferences
                  </p>
                </div>
                <div className="card-body">
                  <div className="card bg-light border-0 p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Data Sharing</h6>
                        <p className="text-muted small mb-0">Allow anonymized health data to be used for research and improvements</p>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="dataSharingSwitch" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="card bg-light border-0 p-3 mb-4">
                    <h6 className="mb-2">Export Health Data</h6>
                    <p className="text-muted small mb-3">Download all your health records and metrics as a CSV file</p>
                    <button className="btn btn-outline-primary">Export Data</button>
                  </div>
                  
                  <div className="card bg-danger bg-opacity-10 border-danger border-opacity-25 p-3">
                    <h6 className="mb-2 text-danger">Delete Account</h6>
                    <p className="text-muted small mb-3">Permanently delete your account and all associated data</p>
                    <button className="btn btn-danger">Delete Account</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
