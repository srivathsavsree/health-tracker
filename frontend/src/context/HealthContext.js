import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

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
    const { user } = useAuth();

    // Activities
    const addActivity = async (activityData) => {
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
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error creating health record';
        }
    };

    const updateHealthRecord = async (id, recordData) => {
        try {
            const response = await axios.put(`/api/health/${id}`, recordData);
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
            await axios.delete(`/api/health/${id}`);
            setHealthRecords(healthRecords.filter(record => record._id !== id));
        } catch (error) {
            throw error.response?.data?.message || 'Error deleting health record';
        }
    };

    useEffect(() => {
        if (user) {
            Promise.all([
                fetchHealthRecords(),
                fetchHealthStats(),
                fetchActivities(),
                fetchMeals(),
                fetchGoals()
            ]).finally(() => setLoading(false));
        }
    }, [user]);

    const value = {
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