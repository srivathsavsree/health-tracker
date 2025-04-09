import React, { useState } from 'react';
import { Apple, Coffee, Pizza, Utensils, Plus, X } from 'lucide-react';
import './Diet.css';

const Diet = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: 'breakfast',
    time: ''
  });

  const meals = [
    {
      id: 1,
      title: 'Breakfast',
      description: 'Oatmeal with fruits and nuts',
      icon: <Coffee size={32} />,
      calories: 350,
      protein: 12,
      carbs: 45,
      fat: 14,
      time: '8:00 AM',
      type: 'breakfast'
    },
    {
      id: 2,
      title: 'Morning Snack',
      description: 'Greek yogurt with berries',
      icon: <Apple size={32} />,
      calories: 180,
      protein: 15,
      carbs: 20,
      fat: 8,
      time: '10:30 AM',
      type: 'snack'
    },
    {
      id: 3,
      title: 'Lunch',
      description: 'Grilled chicken salad',
      icon: <Utensils size={32} />,
      calories: 450,
      protein: 35,
      carbs: 25,
      fat: 22,
      time: '1:00 PM',
      type: 'lunch'
    },
    {
      id: 4,
      title: 'Dinner',
      description: 'Salmon with quinoa and vegetables',
      icon: <Pizza size={32} />,
      calories: 550,
      protein: 40,
      carbs: 35,
      fat: 25,
      time: '7:00 PM',
      type: 'dinner'
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
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      mealType: 'breakfast',
      time: ''
    });
  };

  return (
    <div className="main-content">
      <div className="page-container">
        <h1 className="page-title">Diet</h1>
        <p className="page-subtitle">Track your meals and nutrition</p>

        <div className="card-grid">
          {meals.map(meal => (
            <div key={meal.id} className="custom-card">
              <div className="card-icon" style={{ color: '#9C27B0' }}>
                {meal.icon}
              </div>
              <h3 className="card-title">{meal.title}</h3>
              <p className="card-text">{meal.description}</p>
              <div className="meal-details">
                <p className="card-text">Time: {meal.time}</p>
                <div className="nutrition-info">
                  <p className="card-text">Calories: {meal.calories} kcal</p>
                  <p className="card-text">Protein: {meal.protein}g</p>
                  <p className="card-text">Carbs: {meal.carbs}g</p>
                  <p className="card-text">Fat: {meal.fat}g</p>
                </div>
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
                <h2>Add New Meal</h2>
                <button className="close-button" onClick={() => setShowModal(false)}>
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Meal Title</label>
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
                  <label htmlFor="mealType">Meal Type</label>
                  <select
                    id="mealType"
                    name="mealType"
                    value={formData.mealType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="snack">Snack</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="calories">Calories (kcal)</label>
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
                  <label htmlFor="protein">Protein (g)</label>
                  <input
                    type="number"
                    id="protein"
                    name="protein"
                    value={formData.protein}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="carbs">Carbs (g)</label>
                  <input
                    type="number"
                    id="carbs"
                    name="carbs"
                    value={formData.carbs}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fat">Fat (g)</label>
                  <input
                    type="number"
                    id="fat"
                    name="fat"
                    value={formData.fat}
                    onChange={handleInputChange}
                    required
                  />
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
                    Add Meal
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

export default Diet; 