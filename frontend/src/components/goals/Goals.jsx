import React, { useState } from 'react';
import { Target, Dumbbell, Droplets, Moon, Plus, X } from 'lucide-react';
import './Goals.css';

const Goals = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetValue: '',
    currentValue: '',
    type: 'water',
    deadline: '',
    frequency: 'daily'
  });

  const goals = [
    {
      id: 1,
      title: 'Water Intake',
      description: 'Drink 8 glasses of water daily',
      icon: <Droplets size={32} />,
      targetValue: 8,
      currentValue: 5,
      type: 'water',
      progress: 62.5,
      frequency: 'daily'
    },
    {
      id: 2,
      title: 'Sleep Goal',
      description: 'Get 8 hours of sleep each night',
      icon: <Moon size={32} />,
      targetValue: 8,
      currentValue: 7,
      type: 'sleep',
      progress: 87.5,
      frequency: 'daily'
    },
    {
      id: 3,
      title: 'Weight Training',
      description: 'Complete 12 strength training sessions',
      icon: <Dumbbell size={32} />,
      targetValue: 12,
      currentValue: 8,
      type: 'exercise',
      progress: 66.7,
      frequency: 'monthly'
    },
    {
      id: 4,
      title: 'Weight Goal',
      description: 'Reach target weight of 70kg',
      icon: <Target size={32} />,
      targetValue: 70,
      currentValue: 75,
      type: 'weight',
      progress: 50,
      frequency: 'overall'
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
      targetValue: '',
      currentValue: '',
      type: 'water',
      deadline: '',
      frequency: 'daily'
    });
  };

  return (
    <div className="main-content">
      <div className="page-container">
        <h1 className="page-title">Goals</h1>
        <p className="page-subtitle">Track and manage your health and fitness goals</p>

        <div className="card-grid">
          {goals.map(goal => (
            <div key={goal.id} className="custom-card">
              <div className="card-icon" style={{ color: '#4CAF50' }}>
                {goal.icon}
              </div>
              <h3 className="card-title">{goal.title}</h3>
              <p className="card-text">{goal.description}</p>
              <div className="goal-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <p className="progress-text">{goal.progress}%</p>
              </div>
              <div className="goal-details">
                <p className="card-text">Target: {goal.targetValue}</p>
                <p className="card-text">Current: {goal.currentValue}</p>
                <p className="card-text">Frequency: {goal.frequency}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="add-button" onClick={() => setShowModal(true)}>
          <Plus size={24} />
        </button>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Goal</h2>
                <button className="close-button" onClick={() => setShowModal(false)}>
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Goal Title</label>
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
                  <label htmlFor="type">Goal Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="water">Water Intake</option>
                    <option value="sleep">Sleep</option>
                    <option value="exercise">Exercise</option>
                    <option value="weight">Weight</option>
                    <option value="nutrition">Nutrition</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="targetValue">Target Value</label>
                  <input
                    type="number"
                    id="targetValue"
                    name="targetValue"
                    value={formData.targetValue}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="currentValue">Current Value</label>
                  <input
                    type="number"
                    id="currentValue"
                    name="currentValue"
                    value={formData.currentValue}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="frequency">Frequency</label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="overall">Overall</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="deadline">Deadline (optional)</label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-buttons">
                  <button type="button" onClick={() => setShowModal(false)} className="cancel-button">
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Add Goal
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

export default Goals; 