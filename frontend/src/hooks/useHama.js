import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { HAMA_PENYAKIT_DATA } from '@/data/hamaDummy'; // Fallback

export function useHama() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: hama, error } = await supabase
                    .from('hama_penyakit')
                    .select('*');
                
                if (error) throw error;
                
                if (hama && hama.length > 0) {
                    setData(hama);
                } else {
                    setData(HAMA_PENYAKIT_DATA); // Fallback if empty
                }
            } catch (err) {
                console.error("Error fetching hama:", err);
                setData(HAMA_PENYAKIT_DATA); // Fallback on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getHamaById = (id) => {
        return data.find(item => item.id == id);
    };

    return {
        data,
        isLoading,
        getHamaById
    };
}
