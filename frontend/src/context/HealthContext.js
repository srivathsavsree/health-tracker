import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const HealthContext = createContext();

export const useHealth = () => {
    return useContext(HealthContext);
};

export const HealthProvider = ({ children }) => {
    const [healthRecords, setHealthRecords] = useState([]);
    const [stats, setStats] = useState({
        avgCalories: 0,
        avgSleepHours: 0,
        totalActivities: 0
    });
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchHealthRecords = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/health');
            setHealthRecords(response.data);
        } catch (error) {
            console.error('Error fetching health records:', error);
        }
    };

    const fetchHealthStats = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/health/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching health stats:', error);
        }
    };

    const createHealthRecord = async (recordData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/health', recordData);
            setHealthRecords([response.data, ...healthRecords]);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Error creating health record';
        }
    };

    const updateHealthRecord = async (id, recordData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/health/${id}`, recordData);
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
            await axios.delete(`http://localhost:5000/api/health/${id}`);
            setHealthRecords(healthRecords.filter(record => record._id !== id));
        } catch (error) {
            throw error.response?.data?.message || 'Error deleting health record';
        }
    };

    useEffect(() => {
        if (user) {
            Promise.all([fetchHealthRecords(), fetchHealthStats()])
                .finally(() => setLoading(false));
        }
    }, [user]);

    const value = {
        healthRecords,
        stats,
        loading,
        createHealthRecord,
        updateHealthRecord,
        deleteHealthRecord,
        fetchHealthRecords,
        fetchHealthStats
    };

    return (
        <HealthContext.Provider value={value}>
            {children}
        </HealthContext.Provider>
    );
}; 