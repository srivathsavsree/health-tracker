import React, { useState, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import './Activities.css';

const Activities = () => {
    const [newActivity, setNewActivity] = useState({
        name: '',
        type: 'walking',
        date: new Date().toISOString().split('T')[0],
        duration: '',
        calories: '',
        distance: '',
        intensity: 'moderate',
        notes: '',
        status: 'completed'
    });
    const [editingActivity, setEditingActivity] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { activities, addActivity, updateActivity, deleteActivity, fetchActivities } = useHealth();

    useEffect(() => {
        loadActivities();
    }, []);

    const loadActivities = async () => {
        try {
            setLoading(true);
            await fetchActivities();
            setError('');
        } catch (error) {
            setError('Failed to fetch activities. Please try again later.');
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewActivity(prev => ({
            ...prev,
            [name]: ['duration', 'calories', 'distance'].includes(name) ? Number(value) : value
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
            if (!newActivity.name || !newActivity.type || !newActivity.date || !newActivity.duration) {
                setError('Please fill in all required fields');
                return;
            }

            // Validate numeric fields
            if (newActivity.duration <= 0) {
                setError('Duration must be greater than 0');
                return;
            }

            if (newActivity.calories && newActivity.calories < 0) {
                setError('Calories cannot be negative');
                return;
            }

            if (['walking', 'running', 'cycling'].includes(newActivity.type) && (!newActivity.distance || newActivity.distance <= 0)) {
                setError('Distance is required for walking, running, and cycling activities');
                return;
            }

            // Clean up the data before sending
            const activityData = {
                name: newActivity.name,
                type: newActivity.type,
                date: newActivity.date,
                duration: Number(newActivity.duration),
                intensity: newActivity.intensity,
                status: newActivity.status,
                notes: newActivity.notes || undefined
            };

            // Only include numeric fields if they have values
            if (newActivity.calories) {
                activityData.calories = Number(newActivity.calories);
            }
            
            if (newActivity.distance) {
                activityData.distance = Number(newActivity.distance);
            }

            if (editingActivity) {
                await updateActivity(editingActivity._id, activityData);
                setSuccess('Activity updated successfully!');
                setEditingActivity(null);
            } else {
                await addActivity(activityData);
                setSuccess('Activity added successfully!');
            }

            setNewActivity({
                name: '',
                type: 'walking',
                date: new Date().toISOString().split('T')[0],
                duration: '',
                calories: '',
                distance: '',
                intensity: 'moderate',
                notes: '',
                status: 'completed'
            });
        } catch (error) {
            console.error('Error saving activity:', error);
            setError(error.response?.data?.message || error.message || 'Error saving activity. Please try again.');
        }
    };

    const handleEdit = (activity) => {
        setEditingActivity(activity);
        setNewActivity({
            name: activity.name,
            type: activity.type,
            date: activity.date.split('T')[0],
            duration: activity.duration,
            calories: activity.calories,
            distance: activity.distance || '',
            intensity: activity.intensity,
            notes: activity.notes || '',
            status: activity.status
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteActivity(id);
            setSuccess('Activity deleted successfully!');
        } catch (error) {
            console.error('Error deleting activity:', error);
            setError('Error deleting activity. Please try again.');
        }
    };

    const handleCancel = () => {
        setEditingActivity(null);
        setNewActivity({
            name: '',
            type: 'walking',
            date: new Date().toISOString().split('T')[0],
            duration: '',
            calories: '',
            distance: '',
            intensity: 'moderate',
            notes: '',
            status: 'completed'
        });
        setError('');
        setSuccess('');
    };

    return (
        <div className="activities-container">
            <h2>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</h2>
            
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            <form onSubmit={handleSubmit} className="activity-form">
                <div className="form-group">
                    <label htmlFor="name">Activity Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newActivity.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Morning Run"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Activity Type*</label>
                    <select
                        id="type"
                        name="type"
                        value={newActivity.type}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="walking">Walking</option>
                        <option value="running">Running</option>
                        <option value="cycling">Cycling</option>
                        <option value="swimming">Swimming</option>
                        <option value="gym">Gym</option>
                        <option value="yoga">Yoga</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date*</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={newActivity.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duration">Duration (minutes)*</label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={newActivity.duration}
                        onChange={handleInputChange}
                        required
                        min="1"
                    />
                </div>

                {['walking', 'running', 'cycling'].includes(newActivity.type) && (
                    <div className="form-group">
                        <label htmlFor="distance">Distance (km)*</label>
                        <input
                            type="number"
                            id="distance"
                            name="distance"
                            value={newActivity.distance}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="intensity">Intensity*</label>
                    <select
                        id="intensity"
                        name="intensity"
                        value={newActivity.intensity}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="light">Light</option>
                        <option value="moderate">Moderate</option>
                        <option value="vigorous">Vigorous</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="calories">Calories Burned</label>
                    <input
                        type="number"
                        id="calories"
                        name="calories"
                        value={newActivity.calories}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="Leave empty for auto-calculation"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={newActivity.notes}
                        onChange={handleInputChange}
                        placeholder="Add any additional notes"
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="submit-button">
                        {editingActivity ? 'Update Activity' : 'Add Activity'}
                    </button>
                    {editingActivity && (
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

            <h2>Activity History</h2>
            <div className="activities-list">
                {!Array.isArray(activities) || activities.length === 0 ? (
                    <p className="no-activities">No activities recorded yet.</p>
                ) : (
                    activities.map((activity) => (
                        <div key={activity._id} className="activity-card">
                            <div className="activity-info">
                                <h3>{activity.name}</h3>
                                <div className="activity-details">
                                    <p><strong>Type:</strong> {activity.type}</p>
                                    <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                                    <p><strong>Duration:</strong> {activity.duration} minutes</p>
                                    <p><strong>Intensity:</strong> {activity.intensity}</p>
                                    {activity.distance && <p><strong>Distance:</strong> {activity.distance} km</p>}
                                    <p><strong>Calories:</strong> {activity.calories}</p>
                                    {activity.notes && <p><strong>Notes:</strong> {activity.notes}</p>}
                                </div>
                            </div>
                            <div className="activity-actions">
                                <button
                                    onClick={() => handleEdit(activity)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(activity._id)}
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

export default Activities; 