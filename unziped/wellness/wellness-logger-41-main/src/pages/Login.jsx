
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login - in a real app, you would call an API
    setTimeout(() => {
      // For demonstration purposes, we'll consider the login successful
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Login successful!');
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
                  <h2 className="mb-1">Welcome Back</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit}>
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
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label htmlFor="password" className="form-label">Password</label>
                      <Link to="/forgot-password" className="text-decoration-none small">Forgot password?</Link>
                    </div>
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
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
                      {isLoading ? 'Logging in...' : 'Sign In'}
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link>
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
