import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faRunning, 
  faUtensils, 
  faBullseye, 
  faCog, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const NavigationBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
                  <FontAwesomeIcon icon={faHome} className="me-2" />
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/activities" className="nav-link-custom">
                  <FontAwesomeIcon icon={faRunning} className="me-2" />
                  Activities
                </Nav.Link>
                <Nav.Link as={Link} to="/diet" className="nav-link-custom">
                  <FontAwesomeIcon icon={faUtensils} className="me-2" />
                  Diet
                </Nav.Link>
                <Nav.Link as={Link} to="/goals" className="nav-link-custom">
                  <FontAwesomeIcon icon={faBullseye} className="me-2" />
                  Goals
                </Nav.Link>
                <Nav.Link as={Link} to="/settings" className="nav-link-custom">
                  <FontAwesomeIcon icon={faCog} className="me-2" />
                  Settings
                </Nav.Link>
                <Button 
                  variant="outline-danger" 
                  onClick={handleLogout}
                  className="ms-2 logout-btn"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
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