import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Fallback dummy data if DB is empty
const DUMMY_TIPS = [
    { id: 1, title: "Cara Memilih Pupuk Organik", category: "Pupuk", description: "Pelajari kriteria penting...", is_featured: true },
    { id: 2, title: "Teknik Tanam Padi Jajar Legowo", category: "Tanam", description: "Sistem tanam jajar legowo...", is_featured: true },
];

export function useTips() {
    const [tips, setTips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const { data: dbTips, error } = await supabase
                    .from('tips')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;

                if (dbTips && dbTips.length > 0) {
                    setTips(dbTips);
                } else {
                    setTips(DUMMY_TIPS);
                }
            } catch (err) {
                console.error("Error fetching tips:", err);
                setTips(DUMMY_TIPS);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTips();
    }, []);

    return {
        tips,
        isLoading
    };
}
