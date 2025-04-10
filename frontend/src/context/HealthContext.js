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
<<<<<<< HEAD
    const [activities, setActivities] = useState([]);
    const [meals, setMeals] = useState([]);
    const [goals, setGoals] = useState([]);
=======
    const [healthRecords, setHealthRecords] = useState([]);
    const [activities, setActivities] = useState([]);
    const [meals, setMeals] = useState([]);
    const [goals, setGoals] = useState([]);
    const [stats, setStats] = useState({
        avgCalories: 0,
        avgSleepHours: 0,
        totalActivities: 0
    });
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Activities
    const addActivity = async (activityData) => {
<<<<<<< HEAD
        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/activities`, activityData);
            setActivities([response.data, ...activities]);
=======
        try {
            const response = await axios.post('/api/activities', activityData);
            setActivities([response.data, ...activities]);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error adding activity';
        }
    };

    const fetchActivities = async () => {
        try {
            const response = await axios.get('/api/activities');
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    // Meals
    const addMeal = async (mealData) => {
        try {
            const response = await axios.post('/api/meals', mealData);
            setMeals([response.data, ...meals]);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error adding meal';
        }
    };

    const fetchMeals = async () => {
        try {
            const response = await axios.get('/api/meals');
            setMeals(response.data);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    // Goals
    const addGoal = async (goalData) => {
        try {
            const response = await axios.post('/api/goals', goalData);
            setGoals([response.data, ...goals]);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error adding goal';
        }
    };

    const fetchGoals = async () => {
        try {
            const response = await axios.get('/api/goals');
            setGoals(response.data);
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    };

    // Health Records
    const fetchHealthRecords = async () => {
        try {
            const response = await axios.get('/api/health');
            setHealthRecords(response.data);
        } catch (error) {
            console.error('Error fetching health records:', error);
        }
    };

    const fetchHealthStats = async () => {
        try {
            const response = await axios.get('/api/health/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching health stats:', error);
        }
    };

    const createHealthRecord = async (recordData) => {
        try {
            const response = await axios.post('/api/health', recordData);
            setHealthRecords([response.data, ...healthRecords]);
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error adding activity';
        }
    };

    const updateActivity = async (id, activityData) => {
        try {
<<<<<<< HEAD
            const response = await axios.put(`${config.API_BASE_URL}/api/activities/${id}`, activityData);
            setActivities(activities.map(activity => 
                activity._id === id ? response.data : activity
=======
            const response = await axios.put(`/api/health/${id}`, recordData);
            setHealthRecords(healthRecords.map(record => 
                record._id === id ? response.data : record
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
            ));
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error updating activity';
        }
    };

    const deleteActivity = async (id) => {
        try {
<<<<<<< HEAD
            await axios.delete(`${config.API_BASE_URL}/api/activities/${id}`);
            setActivities(activities.filter(activity => activity._id !== id));
=======
            await axios.delete(`/api/health/${id}`);
            setHealthRecords(healthRecords.filter(record => record._id !== id));
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
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
<<<<<<< HEAD
=======
                fetchHealthRecords(),
                fetchHealthStats(),
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
                fetchActivities(),
                fetchMeals(),
                fetchGoals()
            ]).finally(() => setLoading(false));
        }
    }, [user]);

    const value = {
<<<<<<< HEAD
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
=======
        healthRecords,
        activities,
        meals,
        goals,
        stats,
        loading,
        addActivity,
        addMeal,
        addGoal,
        createHealthRecord,
        updateHealthRecord,
        deleteHealthRecord,
        fetchHealthRecords,
        fetchHealthStats,
>>>>>>> 38d5d9ac36d70cfe93b98db1f590c4c2c64ac384
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