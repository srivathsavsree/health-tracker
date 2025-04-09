import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal, Alert } from 'react-bootstrap';
import { Plus, Edit2, Trash2, AlertCircle, Coffee, Sun, Moon } from 'lucide-react';
import axios from 'axios';
import config from '../../config';
import './Meals.css';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const initialMealState = {
    name: '',
    type: 'breakfast',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5)
  };

  const [newMeal, setNewMeal] = useState(initialMealState);

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast', icon: Coffee },
    { value: 'lunch', label: 'Lunch', icon: Sun },
    { value: 'dinner', label: 'Dinner', icon: Moon }
  ];

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_BASE_URL}/api/meals`);
      setMeals(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch meals. Please try again later.');
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateMeal = (meal) => {
    if (!meal.name.trim()) return 'Meal name is required';
    if (!meal.calories || isNaN(meal.calories)) return 'Valid calories are required';
    if (!meal.date) return 'Date is required';
    if (!meal.time) return 'Time is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateMeal(newMeal);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      if (selectedMeal) {
        await axios.put(`${config.API_BASE_URL}/api/meals/${selectedMeal.id}`, newMeal);
      } else {
        await axios.post(`${config.API_BASE_URL}/api/meals`, newMeal);
      }
      await fetchMeals();
      handleCloseModal();
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save meal');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (meal) => {
    setSelectedMeal(meal);
    setNewMeal({
      ...meal,
      date: new Date(meal.date).toISOString().split('T')[0],
      time: meal.time
    });
    setShowEditModal(true);
  };

  const handleDelete = async (mealId) => {
    try {
      await axios.delete(`${config.API_BASE_URL}/api/meals/${mealId}`);
      await fetchMeals();
      setDeleteConfirm(null);
    } catch (error) {
      setError('Failed to delete meal');
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedMeal(null);
    setNewMeal(initialMealState);
    setError('');
  };

  const getMealIcon = (type) => {
    const mealType = mealTypes.find(t => t.value === type);
    if (!mealType) return null;
    const Icon = mealType.icon;
    return <Icon size={20} className={`meal-icon ${type}`} />;
  };

  const renderMealForm = () => (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Meal Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={newMeal.name}
          onChange={handleInputChange}
          placeholder="Enter meal name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Meal Type</Form.Label>
        <Form.Select
          name="type"
          value={newMeal.type}
          onChange={handleInputChange}
          required
        >
          {mealTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Calories</Form.Label>
            <Form.Control
              type="number"
              name="calories"
              value={newMeal.calories}
              onChange={handleInputChange}
              placeholder="Enter calories"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Protein (g)</Form.Label>
            <Form.Control
              type="number"
              name="protein"
              value={newMeal.protein}
              onChange={handleInputChange}
              placeholder="Enter protein"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Carbs (g)</Form.Label>
            <Form.Control
              type="number"
              name="carbs"
              value={newMeal.carbs}
              onChange={handleInputChange}
              placeholder="Enter carbs"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Fat (g)</Form.Label>
            <Form.Control
              type="number"
              name="fat"
              value={newMeal.fat}
              onChange={handleInputChange}
              placeholder="Enter fat"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={newMeal.date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={newMeal.time}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="form-buttons">
        <Button
          variant="secondary"
          onClick={handleCloseModal}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : selectedMeal ? 'Update Meal' : 'Add Meal'}
        </Button>
      </div>
    </Form>
  );

  const groupMealsByDate = () => {
    const grouped = {};
    meals.forEach(meal => {
      const date = new Date(meal.date).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(meal);
    });
    return grouped;
  };

  return (
    <Container className="meals-container">
      <div className="meals-header">
        <h1>Meals</h1>
        <p>Track your daily nutrition</p>
        <Button 
          variant="primary" 
          className="add-meal-button"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} className="me-2" />
          Add Meal
        </Button>
      </div>

      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          <AlertCircle size={20} className="me-2" />
          {error}
        </Alert>
      )}

      {Object.entries(groupMealsByDate()).map(([date, dayMeals]) => (
        <Card key={date} className="mb-4">
          <Card.Header>
            <h2>{date}</h2>
            <div className="daily-totals">
              <span>Total Calories: {dayMeals.reduce((sum, meal) => sum + Number(meal.calories), 0)}</span>
              <span>Protein: {dayMeals.reduce((sum, meal) => sum + Number(meal.protein || 0), 0)}g</span>
              <span>Carbs: {dayMeals.reduce((sum, meal) => sum + Number(meal.carbs || 0), 0)}g</span>
              <span>Fat: {dayMeals.reduce((sum, meal) => sum + Number(meal.fat || 0), 0)}g</span>
            </div>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Calories</th>
                  <th>Protein</th>
                  <th>Carbs</th>
                  <th>Fat</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dayMeals.map(meal => (
                  <tr key={meal.id}>
                    <td>{meal.time}</td>
                    <td>
                      <div className="meal-type">
                        {getMealIcon(meal.type)}
                        {mealTypes.find(t => t.value === meal.type)?.label}
                      </div>
                    </td>
                    <td>{meal.name}</td>
                    <td>{meal.calories}</td>
                    <td>{meal.protein || '-'}</td>
                    <td>{meal.carbs || '-'}</td>
                    <td>{meal.fat || '-'}</td>
                    <td>
                      <div className="table-actions">
                        <Button
                          variant="link"
                          className="p-0 me-2"
                          onClick={() => handleEdit(meal)}
                        >
                          <Edit2 size={18} />
                        </Button>
                        <Button
                          variant="link"
                          className="p-0 text-danger"
                          onClick={() => setDeleteConfirm(meal.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}

      {/* Add/Edit Modal */}
      <Modal 
        show={showAddModal || showEditModal} 
        onHide={handleCloseModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedMeal ? 'Edit Meal' : 'Add New Meal'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderMealForm()}
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={!!deleteConfirm} onHide={() => setDeleteConfirm(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this meal? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteConfirm)}>
            Delete Meal
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Meals; 