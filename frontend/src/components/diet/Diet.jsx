import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import './Diet.css';

const Diet = () => {
    const [newMeal, setNewMeal] = useState({
        name: '',
        type: 'breakfast',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        notes: ''
    });
    const [editingMeal, setEditingMeal] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { meals = [], addMeal, updateMeal, deleteMeal } = useHealth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMeal(prev => ({
            ...prev,
            [name]: ['calories', 'protein', 'carbs', 'fat'].includes(name) ? Number(value) || '' : value
        }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setSuccess('');

            // Validate required fields
            if (!newMeal.name || !newMeal.type) {
                setError('Please fill in all required fields');
                return;
            }

            // Convert string values to numbers
            const mealData = {
                ...newMeal,
                calories: Number(newMeal.calories) || 0,
                protein: Number(newMeal.protein) || 0,
                carbs: Number(newMeal.carbs) || 0,
                fat: Number(newMeal.fat) || 0
            };

            if (editingMeal) {
                await updateMeal(editingMeal._id, mealData);
                setSuccess('Meal updated successfully!');
                setEditingMeal(null);
            } else {
                await addMeal(mealData);
                setSuccess('Meal added successfully!');
            }

            setNewMeal({
                name: '',
                type: 'breakfast',
                calories: '',
                protein: '',
                carbs: '',
                fat: '',
                notes: ''
            });
        } catch (error) {
            console.error('Error saving meal:', error);
            setError(error.response?.data?.message || error.message || 'Error saving meal. Please try again.');
        }
    };

    const handleEdit = (meal) => {
        setEditingMeal(meal);
        setNewMeal({
            name: meal.name,
            type: meal.type,
            calories: meal.calories,
            protein: meal.protein,
            carbs: meal.carbs,
            fat: meal.fat,
            notes: meal.notes || ''
        });
        setError('');
        setSuccess('');
    };

    const handleDelete = async (id) => {
        try {
            await deleteMeal(id);
            setSuccess('Meal deleted successfully!');
        } catch (error) {
            console.error('Error deleting meal:', error);
            setError('Error deleting meal. Please try again.');
        }
    };

    const handleCancel = () => {
        setEditingMeal(null);
        setNewMeal({
            name: '',
            type: 'breakfast',
            calories: '',
            protein: '',
            carbs: '',
            fat: '',
            notes: ''
        });
        setError('');
        setSuccess('');
    };

    return (
        <div className="diet-container">
            <h2>{editingMeal ? 'Edit Meal' : 'Add New Meal'}</h2>
            
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
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
                        placeholder="e.g., Grilled Chicken Salad"
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
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                    </select>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="calories">Calories</label>
                        <input
                            type="number"
                            id="calories"
                            name="calories"
                            value={newMeal.calories}
                            onChange={handleInputChange}
                            min="0"
                            placeholder="kcal"
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
                            placeholder="g"
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
                            placeholder="g"
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
                            placeholder="g"
                        />
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
                        {editingMeal ? 'Update Meal' : 'Add Meal'}
                    </button>
                    {editingMeal && (
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2>Meal History</h2>
            <div className="meals-list">
                {!Array.isArray(meals) || meals.length === 0 ? (
                    <p className="no-meals">No meals recorded yet.</p>
                ) : (
                    meals.map((meal) => (
                        <div key={meal._id} className="meal-card">
                            <div className="meal-info">
                                <h3>{meal.name}</h3>
                                <p className="meal-type">{meal.type}</p>
                                <div className="nutrition-info">
                                    <div className="nutrition-item">
                                        <span>Calories</span>
                                        <span>{meal.calories} kcal</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span>Protein</span>
                                        <span>{meal.protein}g</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span>Carbs</span>
                                        <span>{meal.carbs}g</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span>Fat</span>
                                        <span>{meal.fat}g</span>
                                    </div>
                                </div>
                                {meal.notes && <p className="meal-notes">{meal.notes}</p>}
                            </div>
                            <div className="meal-actions">
                                <button
                                    onClick={() => handleEdit(meal)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(meal._id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Diet; 