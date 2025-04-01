
import React from 'react';
import { Link } from 'react-router-dom';
import BootstrapNavbar from '@/components/layout/BootstrapNavbar';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-vh-100 bg-light">
      <BootstrapNavbar />
      
      <main className="container py-5 mt-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-5 shadow-sm">
              <h1 className="display-1 fw-bold text-primary mb-4">404</h1>
              <h2 className="h3 mb-3">Page Not Found</h2>
              <p className="text-muted mb-4">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <Link to="/" className="btn btn-primary d-inline-flex align-items-center mx-auto">
                <ArrowLeft size={18} className="me-2" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
