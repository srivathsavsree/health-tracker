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
  );
};

export default Diet; 