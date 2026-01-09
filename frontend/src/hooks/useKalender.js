import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';

export function useKalender() {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from Supabase on start or when user changes
  useEffect(() => {
    if (user?.id) {
        fetchActivities();
    } else {
        setActivities([]);
        setIsLoaded(true);
    }
  }, [user]);

  const fetchActivities = async () => {
    try {
        const { data, error } = await supabase
            .from('calendar_events')
            .select('*')
            .eq('user_id', user.id)
            .order('date', { ascending: true });
        
        if (error) throw error;
        setActivities(data || []);
    } catch (error) {
        console.error("Error fetching calendar:", error);
    } finally {
        setIsLoaded(true);
    }
  };

  const addActivity = async (newActivity) => {
    // Optimistic UI Update
    const tempId = Date.now();
    const tempActivity = { ...newActivity, id: tempId, user_id: user.id };
    
    setActivities(prev => [...prev, tempActivity]);

    try {
        const { date, type, title, notes, weather } = newActivity;
        const { data, error } = await supabase
            .from('calendar_events')
            .insert([{
                user_id: user.id,
                date,
                type,
                title,
                notes,
                weather
            }])
            .select() // Return the created row to get real ID
            .single();

        if (error) throw error;

        // Replace temp activity with real one (with real ID)
        setActivities(prev => prev.map(a => a.id === tempId ? data : a));

    } catch (error) {
        console.error("Error adding activity:", error);
        alert("Gagal menambah aktivitas");
        // Revert optimistic update
        setActivities(prev => prev.filter(a => a.id !== tempId));
    }
  };

  const updateActivity = async (id, updatedData) => {
    // Optimistic UI Update
    const originalActivities = [...activities];
    setActivities(prev => prev.map(a => a.id === id ? { ...a, ...updatedData } : a));

    try {
        const { date, type, title, notes, weather } = updatedData;
        const { error } = await supabase
            .from('calendar_events')
            .update({ date, type, title, notes, weather })
            .eq('id', id)
            .eq('user_id', user.id); 

        if (error) throw error;
    } catch (error) {
        console.error("Error updating activity:", error);
        alert("Gagal mengubah aktivitas");
        setActivities(originalActivities); // Revert
    }
  };

  const deleteActivity = async (id) => {
    if (!confirm('Yakin ingin menghapus aktivitas ini?')) return;

    // Optimistic UI Update
    const originalActivities = [...activities];
    setActivities(prev => prev.filter(a => a.id !== id));

    try {
        const { error } = await supabase
            .from('calendar_events')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) throw error;
    } catch (error) {
        console.error("Error deleting activity:", error);
        alert("Gagal menghapus aktivitas");
        setActivities(originalActivities); // Revert
    }
  };

  const getActivitiesByDate = (date) => {
    return activities.filter(act => act.date === date);
  };

  return {
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    getActivitiesByDate,
    isLoaded
  };
}
