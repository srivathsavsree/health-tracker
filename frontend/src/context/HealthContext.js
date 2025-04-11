import { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { useAuth } from './AuthContext';
import config from '../config';

const HealthContext = createContext();

export { HealthContext };  // Export the context itself

export const useHealth = () => {
    return useContext(HealthContext);
};

export const HealthProvider = ({ children }) => {
    const [healthRecords, setHealthRecords] = useState([]);
    const [activities, setActivities] = useState([]);
    const [meals, setMeals] = useState([]);
    const [goals, setGoals] = useState([]);
    const [stats, setStats] = useState({
        avgCalories: 0,
        avgSleepHours: 0,
        totalActivities: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            Promise.all([
                fetchActivities(),
                fetchMeals(),
                fetchGoals(),
                fetchHealthStats()
            ]).finally(() => setLoading(false));
        }
    }, [user]);

    // Activities
    const addActivity = async (activityData) => {
        try {
            setError(null);
            const response = await axiosInstance.post('/activities', activityData);
            setActivities(prevActivities => [response.data, ...prevActivities]);
            await fetchHealthStats(); // Update stats after adding activity
            return response.data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const fetchActivities = async () => {
        try {
            setError(null);
            const response = await axiosInstance.get('/activities');
            setActivities(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            setError(error.message);
            setActivities([]);
        }
    };

    // Meals
    const addMeal = async (mealData) => {
        try {
            setError(null);
            const response = await axiosInstance.post('/meals', mealData);
            setMeals(prevMeals => [response.data, ...prevMeals]);
            await fetchHealthStats(); // Update stats after adding meal
            return response.data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const fetchMeals = async () => {
        try {
            setError(null);
            const response = await axiosInstance.get('/meals');
            setMeals(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            setError(error.message);
            setMeals([]);
        }
    };

    // Goals
    const addGoal = async (goalData) => {
        try {
            const response = await axiosInstance.post('/goals', goalData);
            setGoals(prevGoals => [response.data, ...prevGoals]);
            return response.data;
        } catch (error) {
            console.error('Error adding goal:', error);
            throw error.response?.data?.message || 'Error adding goal';
        }
    };

    const fetchGoals = async () => {
        try {
            const response = await axiosInstance.get('/goals');
            setGoals(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching goals:', error);
            setGoals([]);
        }
    };

    // Health Records
    const fetchHealthRecords = async () => {
        try {
            const response = await axiosInstance.get('/health');
            setHealthRecords(response.data || []);
        } catch (error) {
            console.error('Error fetching health records:', error);
            setHealthRecords([]);
        }
    };

    const fetchHealthStats = async () => {
        try {
            const response = await axiosInstance.get('/health/stats');
            setStats(response.data || {
                avgCalories: 0,
                avgSleepHours: 0,
                totalActivities: 0
            });
        } catch (error) {
            console.error('Error fetching health stats:', error);
            setStats({
                avgCalories: 0,
                avgSleepHours: 0,
                totalActivities: 0
            });
        }
    };

    const createHealthRecord = async (recordData) => {
        try {
            const response = await axiosInstance.post('/health', recordData);
            setHealthRecords([response.data, ...healthRecords]);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error adding activity';
        }
    };

    const updateActivity = async (id, activityData) => {
        try {
            const response = await axiosInstance.put(`/activities/${id}`, activityData);
            setActivities(prevActivities => 
                prevActivities.map(activity => 
                    activity._id === id ? response.data : activity
                )
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error updating activity';
        }
    };

    const deleteActivity = async (id) => {
        try {
            await axiosInstance.delete(`/activities/${id}`);
            setActivities(prevActivities => 
                prevActivities.filter(activity => activity._id !== id)
            );
        } catch (error) {
            throw error.response?.data?.message || 'Error deleting activity';
        }
    };

    // Meals/Diet
    const updateMeal = async (id, mealData) => {
        try {
            const response = await axiosInstance.put(`/meals/${id}`, mealData);
            setMeals(prevMeals => 
                prevMeals.map(meal => 
                    meal._id === id ? response.data : meal
                )
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error updating meal';
        }
    };

    const deleteMeal = async (id) => {
        try {
            await axiosInstance.delete(`/meals/${id}`);
            setMeals(prevMeals => 
                prevMeals.filter(meal => meal._id !== id)
            );
        } catch (error) {
            throw error.response?.data?.message || 'Error deleting meal';
        }
    };

    // Goals
    const updateGoal = async (id, goalData) => {
        try {
            const response = await axiosInstance.put(`/goals/${id}`, goalData);
            setGoals(prevGoals => 
                prevGoals.map(goal => 
                    goal._id === id ? response.data : goal
                )
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error updating goal';
        }
    };

    const deleteGoal = async (id) => {
        try {
            await axiosInstance.delete(`/goals/${id}`);
            setGoals(prevGoals => 
                prevGoals.filter(goal => goal._id !== id)
            );
        } catch (error) {
            throw error.response?.data?.message || 'Error deleting goal';
        }
    };

    // Health Records
    const updateHealthRecord = async (id, recordData) => {
        try {
            const response = await axiosInstance.put(`/health/${id}`, recordData);
            setHealthRecords(healthRecords.map(record => 
                record._id === id ? response.data : record
            ));
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error updating health record';
        }
    };

    const deleteHealthRecord = async (id) => {
        try {
            await axiosInstance.delete(`/health/${id}`);
            setHealthRecords(healthRecords.filter(record => record._id !== id));
        } catch (error) {
            throw error.response?.data?.message || 'Error deleting health record';
        }
    };

    const value = {
        healthRecords,
        activities,
        meals,
        goals,
        stats,
        loading,
        error,
        addActivity,
        updateActivity,
        deleteActivity,
        addMeal,
        updateMeal,
        deleteMeal,
        addGoal,
        updateGoal,
        deleteGoal,
        fetchHealthRecords,
        fetchHealthStats,
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