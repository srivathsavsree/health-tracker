
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Mock signup - in a real app, you would call an API
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Account created successfully!');
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <Link to="/" className="d-inline-block mb-4">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                         style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #0A84FF, #BF5AF2)" }}>
                      <Activity className="text-white" size={24} />
                    </div>
                  </Link>
                  <h2 className="mb-1">Create an Account</h2>
                  <p className="text-muted">Join us to track your wellness journey</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <Input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="d-grid mb-3">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="btn btn-primary btn-lg"
                    >
                      {isLoading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="mb-0">
                      Already have an account? <Link to="/login" className="text-decoration-none">Sign in</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="text-center mt-4">
              <Link to="/" className="text-decoration-none d-inline-flex align-items-center">
                <ArrowLeft size={16} className="me-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
