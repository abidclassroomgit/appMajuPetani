import { useState, useEffect } from 'react';
import { KALENDER_DUMMY } from '@/data/kalenderDummy';

export function useKalender() {
  const [activities, setActivities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem('petaniMaju_kalender');
    if (saved) {
      setActivities(JSON.parse(saved));
    } else {
      setActivities(KALENDER_DUMMY);
    }
    setIsLoaded(true);
  }, []);

  // Save ke localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('petaniMaju_kalender', JSON.stringify(activities));
    }
  }, [activities, isLoaded]);

  const addActivity = (newActivity) => {
    const activityWithId = { ...newActivity, id: Date.now() };
    setActivities([...activities, activityWithId]);
  };

  const updateActivity = (id, updatedData) => {
    setActivities(activities.map(act => 
      act.id === id ? { ...act, ...updatedData } : act
    ));
  };

  const deleteActivity = (id) => {
    if (confirm('Yakin ingin menghapus aktivitas ini?')) {
      setActivities(activities.filter(act => act.id !== id));
    }
  };

  const getActivitiesByDate = (date) => {
    return activities.filter(act => act.date === date);
  };

  const getActivitiesByMonth = (year, month) => {
    return activities.filter(act => {
      const actDate = new Date(act.date);
      return actDate.getFullYear() === year && actDate.getMonth() === month;
    });
  };

  return {
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    getActivitiesByDate,
    getActivitiesByMonth,
    isLoaded
  };
}
