import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRunning,
  faSwimming,
  faBiking,
  faDumbbell,
  faWalking,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { HealthContext } from '../../context/HealthContext';
import './Activities.css';

const Activities = () => {
  const { addActivity } = useContext(HealthContext);
  const [newActivity, setNewActivity] = useState({
    type: '',
    duration: '',
    intensity: 'moderate',
    date: new Date().toISOString().split('T')[0]
  });

  const activityTypes = [
    { name: 'Running', icon: faRunning, color: '#ff6b6b' },
    { name: 'Swimming', icon: faSwimming, color: '#339af0' },
    { name: 'Cycling', icon: faBiking, color: '#51cf66' },
    { name: 'Gym', icon: faDumbbell, color: '#fcc419' },
    { name: 'Walking', icon: faWalking, color: '#20c997' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(newActivity);
      setNewActivity({
        type: '',
        duration: '',
        intensity: 'moderate',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const handleChange = (e) => {
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="activities-container">
      <div className="activities-header">
        <h1>Track Your Activities</h1>
        <p>Log your daily physical activities to monitor your progress</p>
      </div>

      <Row className="activity-types-grid">
        {activityTypes.map((activity, index) => (
          <Col key={index} xs={6} md={4} lg={2} className="mb-4">
            <Card 
              className={`activity-type-card ${newActivity.type === activity.name ? 'selected' : ''}`}
              onClick={() => setNewActivity({ ...newActivity, type: activity.name })}
            >
              <Card.Body>
                <div className="activity-icon" style={{ backgroundColor: activity.color + '15' }}>
                  <FontAwesomeIcon icon={activity.icon} style={{ color: activity.color }} />
                </div>
                <h3>{activity.name}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="add-activity-card">
            <Card.Body>
              <h2>
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add New Activity
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Activity Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={newActivity.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Activity</option>
                    {activityTypes.map((activity, index) => (
                      <option key={index} value={activity.name}>
                        {activity.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Duration (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={newActivity.duration}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Intensity</Form.Label>
                  <Form.Select
                    name="intensity"
                    value={newActivity.intensity}
                    onChange={handleChange}
                    required
                  >
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="vigorous">Vigorous</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newActivity.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="submit-button">
                  Add Activity
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Activities; 