
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Home, 
  Trophy, 
  Utensils, 
  Menu, 
  X,
  Settings,
  Heart,
  Info,
  Mail,
  LogIn,
  UserPlus,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Activities', path: '/activities', icon: Activity },
  { name: 'Diet', path: '/diet', icon: Utensils },
  { name: 'Goals', path: '/goals', icon: Trophy },
  { name: 'Likes', path: '/likes', icon: Heart },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const publicNavItems = [
  { name: 'About', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Mail },
];

const authNavItems = [
  { name: 'Login', path: '/login', icon: LogIn },
  { name: 'Sign Up', path: '/signup', icon: UserPlus },
];

export default function BootstrapNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(loginStatus === 'true');
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Determine navigation items to show based on login status
  const currentNavItems = isLoggedIn ? navItems : [];
  
  // Check if we're on a dashboard page to show the updated header
  const isDashboardPage = isLoggedIn && location.pathname.includes('/');
  
  if (isDashboardPage && isLoggedIn) {
    return (
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and brand name */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold">HealthMetrics</span>
            </Link>

            {/* Navigation Icons */}
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full" title="Home">
                <Home size={24} />
              </Link>
              <Link to="/activities" className="p-2 hover:bg-gray-100 rounded-full" title="Activities">
                <Activity size={24} />
              </Link>
              <Link to="/diet" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full">
                <Utensils size={20} />
                <span className="font-medium">Diet</span>
              </Link>
              <Link to="/goals" className="p-2 hover:bg-gray-100 rounded-full" title="Goals">
                <Trophy size={24} />
              </Link>
              <Link to="/settings" className="p-2 hover:bg-gray-100 rounded-full" title="Settings">
                <Settings size={24} />
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  // Return the original navbar for non-dashboard pages or when not logged in
  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}
         style={{ transition: 'all 0.3s ease' }}>
      <div className="container">
        <Link to={isLoggedIn ? '/dashboard' : '/'} className="navbar-brand d-flex align-items-center">
          <div className="rounded-circle d-flex align-items-center justify-content-center me-2" 
               style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #0A84FF, #BF5AF2)' }}>
            <Activity className="text-white" size={18} />
          </div>
          <span className="fw-semibold">WellnessTracker</span>
        </Link>

        <button 
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Main Navigation Items */}
            {currentNavItems.map((item) => (
              <li className="nav-item" key={item.name}>
                <Link 
                  to={item.path} 
                  className={`nav-link d-flex align-items-center px-3 py-2 ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <item.icon size={18} className="me-2" />
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Public Navigation - shown when not logged in */}
            {!isLoggedIn && publicNavItems.map((item) => (
              <li className="nav-item" key={item.name}>
                <Link 
                  to={item.path} 
                  className={`nav-link d-flex align-items-center px-3 py-2 ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <item.icon size={18} className="me-2" />
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Authentication Navigation - only shown when not logged in */}
            {!isLoggedIn && authNavItems.map((item) => (
              <li className="nav-item" key={item.name}>
                <Link 
                  to={item.path} 
                  className={`nav-link d-flex align-items-center px-3 py-2 ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <item.icon size={18} className="me-2" />
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Logout Button - only shown when logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <button 
                  onClick={handleLogout}
                  className="nav-link d-flex align-items-center px-3 py-2 border-0 bg-transparent"
                >
                  <LogOut size={18} className="me-2" />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
