
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Home, 
  Trophy, 
  Utensils, 
  Menu, 
  X,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Activities', path: '/activities', icon: Activity },
  { name: 'Diet', path: '/diet', icon: Utensils },
  { name: 'Goals', path: '/goals', icon: Trophy },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Navbar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-health-blue to-health-purple flex items-center justify-center">
              <Activity className="text-white" size={18} />
            </div>
            <span className="text-xl font-semibold tracking-tight">HealthMetrics</span>
          </Link>

          {/* Mobile menu button */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-white/90 shadow-sm"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          {/* Desktop navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      {isMobile && isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 animate-fade-in">
          <nav className="bg-white/90 backdrop-blur-md shadow-md rounded-b-2xl p-3 mx-4">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  item={item}
                  isActive={location.pathname === item.path}
                  isMobile={true}
                />
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

interface NavLinkProps {
  item: {
    name: string;
    path: string;
    icon: React.ElementType;
  };
  isActive: boolean;
  isMobile?: boolean;
}

const NavLink = ({ item, isActive, isMobile = false }: NavLinkProps) => {
  const Icon = item.icon;
  
  return (
    <Link
      to={item.path}
      className={cn(
        "group flex items-center px-3 py-2 rounded-full transition-all duration-300",
        isMobile ? "w-full" : "",
        isActive 
          ? "bg-primary text-white" 
          : "hover:bg-secondary"
      )}
    >
      <Icon 
        size={isMobile ? 18 : 16} 
        className={cn(
          "transition-transform group-hover:scale-110",
          isMobile ? "mr-3" : (isActive ? "mr-2" : "mr-0")
        )} 
      />
      <span 
        className={cn(
          "font-medium transition-all duration-300",
          isMobile ? "" : isActive ? "opacity-100" : "opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto group-hover:ml-2"
        )}
      >
        {item.name}
      </span>
    </Link>
  );
};
