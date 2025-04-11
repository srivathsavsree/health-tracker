import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        height: '',
        weight: '',
        age: '',
        gender: '',
        activityLevel: 'moderate'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                height: user.height || '',
                weight: user.weight || '',
                age: user.age || '',
                gender: user.gender || '',
                activityLevel: user.activityLevel || 'moderate'
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'height' || name === 'weight' || name === 'age' 
                ? value === '' ? '' : Number(value)
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate and format the data
            const updatedData = {
                ...formData,
                height: formData.height === '' ? null : parseFloat(formData.height),
                weight: formData.weight === '' ? null : parseFloat(formData.weight),
                age: formData.age === '' ? null : parseInt(formData.age),
                gender: formData.gender || null,
                activityLevel: formData.activityLevel || 'moderate'
            };

            // Remove any null or undefined values
            Object.keys(updatedData).forEach(key => 
                (updatedData[key] === null || updatedData[key] === undefined) && delete updatedData[key]
            );

            const updatedUser = await updateUser(updatedData);
            
            // Update the form data with the new values
            setFormData(prev => ({
                ...prev,
                ...updatedUser
            }));
            
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
        } catch (error) {
            console.error('Profile update error:', error);
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || error.message || 'Failed to update profile' 
            });
        }
    };

    return (
        <div className="profile-container">
            <h2>Your Profile</h2>
            
            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="profile-card">
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled
                            />
                            <small>Email cannot be changed</small>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="height">Height (cm)</label>
                                <input
                                    type="number"
                                    id="height"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="weight">Weight (kg)</label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="activityLevel">Activity Level</label>
                            <select
                                id="activityLevel"
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={handleChange}
                            >
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Lightly Active</option>
                                <option value="moderate">Moderately Active</option>
                                <option value="active">Very Active</option>
                                <option value="extra">Extra Active</option>
                            </select>
                        </div>
                        
                        <div className="form-buttons">
                            <button type="submit" className="save-button">Save Changes</button>
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-info">
                        <div className="profile-header">
                            <div className="profile-avatar">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="profile-name">
                                <h3>{user?.name || 'User'}</h3>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                        
                        <div className="profile-details">
                            <div className="detail-item">
                                <span className="detail-label">Height:</span>
                                <span className="detail-value">{user?.height ? `${user.height} cm` : 'Not set'}</span>
                            </div>
                            
                            <div className="detail-item">
                                <span className="detail-label">Weight:</span>
                                <span className="detail-value">{user?.weight ? `${user.weight} kg` : 'Not set'}</span>
                            </div>
                            
                            <div className="detail-item">
                                <span className="detail-label">Age:</span>
                                <span className="detail-value">{user?.age || 'Not set'}</span>
                            </div>
                            
                            <div className="detail-item">
                                <span className="detail-label">Gender:</span>
                                <span className="detail-value">{user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not set'}</span>
                            </div>
                            
                            <div className="detail-item">
                                <span className="detail-label">Activity Level:</span>
                                <span className="detail-value">
                                    {user?.activityLevel ? 
                                        user.activityLevel.charAt(0).toUpperCase() + user.activityLevel.slice(1) : 
                                        'Not set'}
                                </span>
                            </div>
                        </div>
                        
                        <button 
                            className="edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile; 