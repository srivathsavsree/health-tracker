import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  Home,
  Activity,
  Utensils,
  Target,
  Settings,
<<<<<<< HEAD
  LogOut,
  Trophy
=======
  LogOut
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
} from 'lucide-react';
import './Navbar.css';

const NavigationBar = () => {
  const { isAuthenticated, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Show a simplified navbar while loading
  if (loading) {
    return (
      <Navbar bg="light" expand="lg" className="navbar-custom" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-text">
            Health Tracker
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          Health Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className="nav-link-custom">
                  <Home size={18} className="me-2" />
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/activities" className="nav-link-custom">
                  <Activity size={18} className="me-2" />
                  Activities
                </Nav.Link>
                <Nav.Link as={Link} to="/diet" className="nav-link-custom">
                  <Utensils size={18} className="me-2" />
                  Diet
                </Nav.Link>
                <Nav.Link as={Link} to="/goals" className="nav-link-custom">
                  <Target size={18} className="me-2" />
                  Goals
                </Nav.Link>
<<<<<<< HEAD
                <Nav.Link as={Link} to="/achievements" className="nav-link-custom">
                  <Trophy size={18} className="me-2" />
                  Achievements
                </Nav.Link>
=======
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
                <Nav.Link as={Link} to="/settings" className="nav-link-custom">
                  <Settings size={18} className="me-2" />
                  Settings
                </Nav.Link>
                <Button 
                  variant="outline-danger" 
                  onClick={handleLogout}
                  className="ms-2 logout-btn"
                >
                  <LogOut size={18} className="me-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 