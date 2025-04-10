<<<<<<< HEAD
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
=======
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { 
  Utensils,
  Plus,
  Clock,
  Calendar,
  Flame
} from 'lucide-react';
import { HealthContext } from '../../context/HealthContext';
import './Diet.css';

const Diet = () => {
  const { addMeal } = useContext(HealthContext);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    type: 'breakfast',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5)
  });

  const mealTypes = [
    { name: 'Breakfast', value: 'breakfast' },
    { name: 'Lunch', value: 'lunch' },
    { name: 'Dinner', value: 'dinner' },
    { name: 'Snack', value: 'snack' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMeal(newMeal);
      setNewMeal({
        name: '',
        calories: '',
        type: 'breakfast',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].slice(0, 5)
      });
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  const handleChange = (e) => {
    setNewMeal({
      ...newMeal,
      [e.target.name]: e.target.value
    });
  };

  const recentMeals = [
    { name: 'Oatmeal with Berries', calories: 350, type: 'Breakfast', time: '08:00' },
    { name: 'Grilled Chicken Salad', calories: 450, type: 'Lunch', time: '12:30' },
    { name: 'Protein Smoothie', calories: 200, type: 'Snack', time: '15:00' }
  ];

  return (
    <Container className="diet-container">
      <div className="diet-header">
        <h1>Track Your Diet</h1>
        <p>Monitor your daily nutrition and calorie intake</p>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="meal-log-card">
            <Card.Body>
              <h2>
                <Utensils size={20} className="me-2" />
                Recent Meals
              </h2>
              <Table responsive className="meal-table">
                <thead>
                  <tr>
                    <th>Meal</th>
                    <th>Type</th>
                    <th>Time</th>
                    <th>Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMeals.map((meal, index) => (
                    <tr key={index}>
                      <td>{meal.name}</td>
                      <td>{meal.type}</td>
                      <td>{meal.time}</td>
                      <td>{meal.calories} cal</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="add-meal-card">
            <Card.Body>
              <h2>
                <Plus size={20} className="me-2" />
                Add Meal
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Meal Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newMeal.name}
                    onChange={handleChange}
                    placeholder="Enter meal name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Meal Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={newMeal.type}
                    onChange={handleChange}
                    required
                  >
                    {mealTypes.map((type, index) => (
                      <option key={index} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <Flame size={18} className="me-2" />
                    Calories
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="calories"
                    value={newMeal.calories}
                    onChange={handleChange}
                    placeholder="Enter calories"
                    required
                    min="0"
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Calendar size={18} className="me-2" />
                        Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={newMeal.date}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Clock size={18} className="me-2" />
                        Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        name="time"
                        value={newMeal.time}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className="submit-button">
                  <Plus size={18} className="me-2" />
                  Add Meal
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

export default Diet; 