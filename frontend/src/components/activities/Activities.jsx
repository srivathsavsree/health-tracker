<<<<<<< HEAD
import React, { useState } from 'react';
import { Activity, Bike, Dumbbell, PersonStanding, X } from 'lucide-react';
import './Activities.css';

const Activities = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    calories: '',
    type: 'cardio',
    time: ''
  });

  const activities = [
    {
      id: 1,
      title: 'Morning Run',
      description: '5km run in the park',
      icon: <PersonStanding size={32} />,
      duration: 30,
      calories: 300,
      type: 'cardio',
      time: '6:30 AM'
    },
    {
      id: 2,
      title: 'Cycling',
      description: 'Bike ride to work',
      icon: <Bike size={32} />,
      duration: 45,
      calories: 400,
      type: 'cardio',
      time: '8:00 AM'
    },
    {
      id: 3,
      title: 'Weight Training',
      description: 'Upper body workout',
      icon: <Dumbbell size={32} />,
      duration: 60,
      calories: 250,
      type: 'strength',
      time: '5:00 PM'
    },
    {
      id: 4,
      title: 'Cardio Session',
      description: 'High-intensity interval training',
      icon: <Activity size={32} />,
      duration: 40,
      calories: 350,
      type: 'cardio',
      time: '7:00 PM'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just close the modal since this is static
    setShowModal(false);
    setFormData({
      title: '',
      description: '',
      duration: '',
      calories: '',
      type: 'cardio',
      time: ''
=======
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { 
  Activity,
  Bike,
  Dumbbell,
  User,
  Waves,
  Flower2,
  Heart,
  Clock,
  Flame
} from 'lucide-react';
import { HealthContext } from '../../context/HealthContext';
import './Activities.css';

const Activities = () => {
  const { addActivity, activities } = useContext(HealthContext);
  const [newActivity, setNewActivity] = useState({
    type: '',
    duration: '',
    intensity: 'moderate',
    date: new Date().toISOString().split('T')[0]
  });

  const activityTypes = [
    { name: 'Running', icon: Activity, color: '#ff6b6b' },
    { name: 'Swimming', icon: Waves, color: '#339af0' },
    { name: 'Cycling', icon: Bike, color: '#51cf66' },
    { name: 'Gym', icon: Dumbbell, color: '#fcc419' },
    { name: 'Walking', icon: User, color: '#20c997' },
    { name: 'Yoga', icon: Flower2, color: '#845ef7' }
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
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
    });
  };

  return (
<<<<<<< HEAD
    <div className="main-content">
      <div className="page-container">
        <h1 className="page-title">Activities</h1>
        <p className="page-subtitle">Track your workouts and physical activities</p>

        <div className="card-grid">
          {activities.map(activity => (
            <div key={activity.id} className="custom-card">
              <div className="card-icon" style={{ color: '#ff5722' }}>
                {activity.icon}
              </div>
              <h3 className="card-title">{activity.title}</h3>
              <p className="card-text">{activity.description}</p>
              <div className="activity-details">
                <p className="card-text">Time: {activity.time}</p>
                <p className="card-text">Duration: {activity.duration} mins</p>
                <p className="card-text">Calories: {activity.calories} kcal</p>
                <p className="card-text">Type: {activity.type}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="add-button" onClick={() => setShowModal(true)}>
          <Activity size={24} />
        </button>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Activity</h2>
                <button className="close-button" onClick={() => setShowModal(false)}>
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Activity Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration (minutes)</label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="calories">Calories</label>
                  <input
                    type="number"
                    id="calories"
                    name="calories"
                    value={formData.calories}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Activity Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-buttons">
                  <button type="button" onClick={() => setShowModal(false)} className="cancel-button">
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Add Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
=======
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
                  <activity.icon size={24} style={{ color: activity.color }} />
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
                <Activity size={20} className="me-2" />
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
                  <Activity size={18} className="me-2" />
                  Add Activity
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
  );
};

export default Activities; 