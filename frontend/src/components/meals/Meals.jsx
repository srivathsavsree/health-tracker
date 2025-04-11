import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal, Alert } from 'react-bootstrap';
import { Plus, Edit2, Trash2, AlertCircle, Coffee, Sun, Moon } from 'lucide-react';
import axios from 'axios';
import config from '../../config';
import { useHealth } from '../../context/HealthContext';
import './Meals.css';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { meals: healthMeals, addMeal, updateMeal, deleteMeal } = useHealth();

  const initialMealState = {
    name: '',
    type: 'breakfast',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    ingredients: [],
    notes: '',
    tags: []
  };

  const [newMeal, setNewMeal] = useState(initialMealState);
  const [currentIngredient, setCurrentIngredient] = useState({
    name: '',
    amount: '',
    unit: 'g',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

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
      [name]: ['calories', 'protein', 'carbs', 'fat'].includes(name) ? Number(value) : value
    }));
    setError('');
  };

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setCurrentIngredient(prev => ({
      ...prev,
      [name]: ['amount', 'calories', 'protein', 'carbs', 'fat'].includes(name) ? Number(value) : value
    }));
  };

  const addIngredient = () => {
    if (!currentIngredient.name || !currentIngredient.amount) {
      setError('Ingredient name and amount are required');
      return;
    }

    setNewMeal(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, currentIngredient],
      calories: prev.calories + (currentIngredient.calories || 0),
      protein: prev.protein + (currentIngredient.protein || 0),
      carbs: prev.carbs + (currentIngredient.carbs || 0),
      fat: prev.fat + (currentIngredient.fat || 0)
    }));

    setCurrentIngredient({
      name: '',
      amount: '',
      unit: 'g',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
  };

  const removeIngredient = (index) => {
    const ingredient = newMeal.ingredients[index];
    setNewMeal(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
      calories: prev.calories - (ingredient.calories || 0),
      protein: prev.protein - (ingredient.protein || 0),
      carbs: prev.carbs - (ingredient.carbs || 0),
      fat: prev.fat - (ingredient.fat || 0)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');

      // Validate required fields
      if (!newMeal.name || !newMeal.type || !newMeal.date || !newMeal.time) {
        setError('Please fill in all required fields');
        return;
      }

      // Validate numeric fields
      if (newMeal.calories < 0 || newMeal.protein < 0 || newMeal.carbs < 0 || newMeal.fat < 0) {
        setError('Nutritional values cannot be negative');
        return;
      }

      const mealData = {
        ...newMeal,
        calories: newMeal.calories || 0,
        protein: newMeal.protein || 0,
        carbs: newMeal.carbs || 0,
        fat: newMeal.fat || 0
      };

      if (selectedMeal) {
        await updateMeal(selectedMeal._id, mealData);
        setError('Meal updated successfully!');
        setSelectedMeal(null);
      } else {
        await addMeal(mealData);
        setError('Meal added successfully!');
      }

      setNewMeal(initialMealState);
    } catch (error) {
      console.error('Error saving meal:', error);
      setError(error.message || 'Error saving meal. Please try again.');
    }
  };

  const handleEdit = (meal) => {
    setSelectedMeal(meal);
    setNewMeal({
      name: meal.name,
      type: meal.type,
      date: meal.date.split('T')[0],
      time: meal.time,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      ingredients: meal.ingredients || [],
      notes: meal.notes || '',
      tags: meal.tags || []
    });
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMeal(id);
      setError('Meal deleted successfully!');
    } catch (error) {
      console.error('Error deleting meal:', error);
      setError('Error deleting meal. Please try again.');
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

  const groupMealsByDate = () => {
    const grouped = {};
    healthMeals.forEach(meal => {
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
                  <tr key={meal._id}>
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
                          onClick={() => setDeleteConfirm(meal._id)}
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
          <form onSubmit={handleSubmit} className="meal-form">
            <div className="form-group">
              <label htmlFor="name">Meal Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newMeal.name}
                onChange={handleInputChange}
                required
                placeholder="e.g., Chicken Salad"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Meal Type*</label>
              <select
                id="type"
                name="type"
                value={newMeal.type}
                onChange={handleInputChange}
                required
              >
                {mealTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date*</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newMeal.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Time*</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={newMeal.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="ingredients-section">
              <h3>Ingredients</h3>
              <div className="ingredient-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ingredientName">Name</label>
                    <input
                      type="text"
                      id="ingredientName"
                      name="name"
                      value={currentIngredient.name}
                      onChange={handleIngredientChange}
                      placeholder="e.g., Chicken Breast"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={currentIngredient.amount}
                      onChange={handleIngredientChange}
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="unit">Unit</label>
                    <select
                      id="unit"
                      name="unit"
                      value={currentIngredient.unit}
                      onChange={handleIngredientChange}
                    >
                      <option value="g">grams</option>
                      <option value="ml">milliliters</option>
                      <option value="oz">ounces</option>
                      <option value="cup">cups</option>
                      <option value="tbsp">tablespoons</option>
                      <option value="tsp">teaspoons</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ingredientCalories">Calories</label>
                    <input
                      type="number"
                      id="ingredientCalories"
                      name="calories"
                      value={currentIngredient.calories}
                      onChange={handleIngredientChange}
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ingredientProtein">Protein (g)</label>
                    <input
                      type="number"
                      id="ingredientProtein"
                      name="protein"
                      value={currentIngredient.protein}
                      onChange={handleIngredientChange}
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ingredientCarbs">Carbs (g)</label>
                    <input
                      type="number"
                      id="ingredientCarbs"
                      name="carbs"
                      value={currentIngredient.carbs}
                      onChange={handleIngredientChange}
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ingredientFat">Fat (g)</label>
                    <input
                      type="number"
                      id="ingredientFat"
                      name="fat"
                      value={currentIngredient.fat}
                      onChange={handleIngredientChange}
                      min="0"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addIngredient}
                  className="add-ingredient-button"
                >
                  Add Ingredient
                </button>
              </div>

              <div className="ingredients-list">
                {newMeal.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <span>{ingredient.name} - {ingredient.amount}{ingredient.unit}</span>
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="remove-ingredient-button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="nutrition-summary">
              <h3>Nutrition Summary</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="calories">Total Calories</label>
                  <input
                    type="number"
                    id="calories"
                    name="calories"
                    value={newMeal.calories}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="protein">Protein (g)</label>
                  <input
                    type="number"
                    id="protein"
                    name="protein"
                    value={newMeal.protein}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="carbs">Carbs (g)</label>
                  <input
                    type="number"
                    id="carbs"
                    name="carbs"
                    value={newMeal.carbs}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fat">Fat (g)</label>
                  <input
                    type="number"
                    id="fat"
                    name="fat"
                    value={newMeal.fat}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={newMeal.notes}
                onChange={handleInputChange}
                placeholder="Add any additional notes"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-button">
                {selectedMeal ? 'Update Meal' : 'Add Meal'}
              </button>
              {selectedMeal && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
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