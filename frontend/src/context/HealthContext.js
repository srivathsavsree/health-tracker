import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import config from '../config';

const HealthContext = createContext();

export { HealthContext };  // Export the context itself

export const useHealth = () => {
    return useContext(HealthContext);
};

export const HealthProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [meals, setMeals] = useState([]);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Activities
    const addActivity = async (activityData) => {
        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/activities`, activityData);
            setActivities([response.data, ...activities]);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error adding activity';
        }
    };

    const updateActivity = async (id, activityData) => {
        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/activities/${id}`, activityData);
            setActivities(activities.map(activity => 
                activity._id === id ? response.data : activity
            ));
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error updating activity';
        }
    };

    const deleteActivity = async (id) => {
        try {
            await axios.delete(`${config.API_BASE_URL}/api/activities/${id}`);
            setActivities(activities.filter(activity => activity._id !== id));
        } catch (error) {
            throw error.response?.data?.message || 'Error deleting activity';
        }
    };

    const fetchActivities = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/activities`);
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    // Meals/Diet
    const addMeal = async (mealData) => {
        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/diet`, {
                mealType: mealData.type,
                foods: [{
                    name: mealData.name,
                    quantity: 1,
                    unit: 'serving',
                    calories: parseInt(mealData.calories)
                }],
                totalCalories: parseInt(mealData.calories),
                date: new Date(mealData.date + 'T' + mealData.time)
            });
            setMeals([response.data, ...meals]);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error adding meal';
        }
    };

    const updateMeal = async (id, mealData) => {
        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/diet/${id}`, mealData);
            setMeals(meals.map(meal => 
                meal._id === id ? response.data : meal
            ));
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error updating meal';
        }
    };

    const deleteMeal = async (id) => {
        try {
            await axios.delete(`${config.API_BASE_URL}/api/diet/${id}`);
            setMeals(meals.filter(meal => meal._id !== id));
        } catch (error) {
            throw error.response?.data?.message || 'Error deleting meal';
        }
    };

    const fetchMeals = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/diet`);
            setMeals(response.data);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    // Goals
    const addGoal = async (goalData) => {
        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/goals`, goalData);
            setGoals([response.data, ...goals]);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error adding goal';
        }
    };

    const updateGoal = async (id, goalData) => {
        try {
            const response = await axios.put(`${config.API_BASE_URL}/api/goals/${id}`, goalData);
            setGoals(goals.map(goal => 
                goal._id === id ? response.data : goal
            ));
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error updating goal';
        }
    };

    const deleteGoal = async (id) => {
        try {
            await axios.delete(`${config.API_BASE_URL}/api/goals/${id}`);
            setGoals(goals.filter(goal => goal._id !== id));
        } catch (error) {
            throw error.response?.data?.message || 'Error deleting goal';
        }
    };

    const fetchGoals = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/goals`);
            setGoals(response.data);
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    };

    useEffect(() => {
        if (user) {
            Promise.all([
                fetchActivities(),
                fetchMeals(),
                fetchGoals()
            ]).finally(() => setLoading(false));
        }
    }, [user]);

    const value = {
        activities,
        meals,
        goals,
        loading,
        addActivity,
        updateActivity,
        deleteActivity,
        addMeal,
        updateMeal,
        deleteMeal,
        addGoal,
        updateGoal,
        deleteGoal,
        fetchActivities,
        fetchMeals,
        fetchGoals
    };

    return (
        <HealthContext.Provider value={value}>
            {children}
        </HealthContext.Provider>
    );
}; 