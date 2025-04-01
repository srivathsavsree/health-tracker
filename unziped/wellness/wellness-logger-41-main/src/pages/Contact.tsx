
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import BootstrapNavbar from '@/components/layout/BootstrapNavbar';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-vh-100 bg-light">
      <BootstrapNavbar />
      
      <main className="container py-5 mt-5">
        <div className="mb-4">
          <Link to="/" className="text-decoration-none d-inline-flex align-items-center mb-4">
            <ArrowLeft size={16} className="me-2" />
            Back to Home
          </Link>
          <h1 className="display-4 mb-3">Contact Us</h1>
          <div className="row">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <h2 className="h4 mb-4">Send us a message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        id="message"
                        className="form-control"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What would you like to tell us?"
                        required
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      <Send size={16} className="me-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h3 className="h5 mb-3">Contact Information</h3>
                  <p className="mb-2">
                    <strong>Email:</strong><br />
                    <a href="mailto:info@wellnesstracker.com" className="text-decoration-none">
                      info@wellnesstracker.com
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>Phone:</strong><br />
                    <a href="tel:+1-800-123-4567" className="text-decoration-none">
                      +1 (800) 123-4567
                    </a>
                  </p>
                  <p className="mb-0">
                    <strong>Address:</strong><br />
                    123 Wellness Street<br />
                    Healthy City, HC 98765<br />
                    United States
                  </p>
                </div>
              </div>
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="h5 mb-3">Office Hours</h3>
                  <p className="mb-2">
                    <strong>Monday - Friday:</strong><br />
                    9:00 AM - 6:00 PM EST
                  </p>
                  <p className="mb-0">
                    <strong>Saturday - Sunday:</strong><br />
                    Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
