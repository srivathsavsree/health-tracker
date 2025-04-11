import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import './Goals.css';

const Goals = () => {
    const [newGoal, setNewGoal] = useState({
        type: 'fitness',
        target: '',
        startDate: '',
        endDate: '',
        progress: 0,
        status: 'not-started'
    });
    const [editingGoal, setEditingGoal] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { goals, addGoal, updateGoal, deleteGoal } = useHealth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGoal(prev => ({
            ...prev,
            [name]: name === 'target' || name === 'progress' ? Number(value) : value
        }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setSuccess('');

            // Validate dates
            const startDate = new Date(newGoal.startDate);
            const endDate = new Date(newGoal.endDate);
            
            if (endDate <= startDate) {
                setError('End date must be after start date');
                return;
            }

            // Validate target
            if (newGoal.target <= 0) {
                setError('Target must be greater than 0');
                return;
            }

            if (editingGoal) {
                await updateGoal(editingGoal._id, newGoal);
                setSuccess('Goal updated successfully!');
                setEditingGoal(null);
            } else {
                await addGoal(newGoal);
                setSuccess('Goal added successfully!');
            }
            setNewGoal({
                type: 'fitness',
                target: '',
                startDate: '',
                endDate: '',
                progress: 0,
                status: 'not-started'
            });
        } catch (error) {
            console.error('Error saving goal:', error);
            setError(error.message || 'Error saving goal. Please try again.');
        }
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setNewGoal({
            type: goal.type,
            target: goal.target,
            startDate: goal.startDate.split('T')[0],
            endDate: goal.endDate.split('T')[0],
            progress: goal.progress,
            status: goal.status
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteGoal(id);
            setSuccess('Goal deleted successfully!');
        } catch (error) {
            console.error('Error deleting goal:', error);
            setError('Error deleting goal. Please try again.');
        }
    };

    const handleCancel = () => {
        setEditingGoal(null);
        setNewGoal({
            type: 'fitness',
            target: '',
            startDate: '',
            endDate: '',
            progress: 0,
            status: 'not-started'
        });
        setError('');
        setSuccess('');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'status-completed';
            case 'in-progress':
                return 'status-in-progress';
            case 'not-started':
                return 'status-not-started';
            default:
                return '';
        }
    };

    return (
        <div className="goals-container">
            <h2>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
            
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            <form onSubmit={handleSubmit} className="goal-form">
                <div className="form-group">
                    <label htmlFor="type">Goal Type</label>
                    <select
                        id="type"
                        name="type"
                        value={newGoal.type}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="fitness">Fitness</option>
                        <option value="nutrition">Nutrition</option>
                        <option value="wellness">Wellness</option>
                        <option value="weight">Weight</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="target">Target Value</label>
                    <input
                        type="number"
                        id="target"
                        name="target"
                        value={newGoal.target}
                        onChange={handleInputChange}
                        required
                        min="1"
                        placeholder="e.g., 5 for 5km or 10 for 10kg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={newGoal.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={newGoal.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {editingGoal && (
                    <div className="form-group">
                        <label htmlFor="progress">Progress</label>
                        <input
                            type="number"
                            id="progress"
                            name="progress"
                            value={newGoal.progress}
                            onChange={handleInputChange}
                            min="0"
                            max={newGoal.target}
                        />
                    </div>
                )}
                <div className="form-buttons">
                    <button type="submit" className="submit-button">
                        {editingGoal ? 'Update Goal' : 'Add Goal'}
                    </button>
                    {editingGoal && (
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

            <h2>Your Goals</h2>
            <div className="goals-list">
                {goals.length === 0 ? (
                    <p className="no-goals">No goals set yet. Start by adding a new goal!</p>
                ) : (
                    goals.map((goal) => (
                        <div key={goal._id} className="goal-card">
                            <div className="goal-info">
                                <h3>{goal.type}</h3>
                                <div className="goal-progress">
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill"
                                            style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="progress-text">
                                        {goal.progress} / {goal.target}
                                    </span>
                                </div>
                                <p className="goal-meta">
                                    Start Date: {new Date(goal.startDate).toLocaleDateString()}
                                </p>
                                <p className="goal-meta">
                                    End Date: {new Date(goal.endDate).toLocaleDateString()}
                                </p>
                                <p className="goal-meta">
                                    Status: <span className={`status-tag ${getStatusColor(goal.status)}`}>
                                        {goal.status.replace('-', ' ')}
                                    </span>
                                </p>
                            </div>
                            <div className="goal-actions">
                                <button
                                    onClick={() => handleEdit(goal)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(goal._id)}
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

export default Goals; 