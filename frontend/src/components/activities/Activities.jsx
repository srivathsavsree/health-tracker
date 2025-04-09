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
    });
  };

  return (
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
  );
};

export default Activities; 