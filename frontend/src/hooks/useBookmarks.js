import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';

export function useBookmarks() {
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBookmarks = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            // 1. Fetch all bookmarks for user
            const { data: bookmarkRefs, error } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!bookmarkRefs || bookmarkRefs.length === 0) {
                setBookmarks([]);
                return;
            }

            // 2. Separate by type to fetch details in parallel
            const postIds = bookmarkRefs.filter(b => b.item_type === 'post').map(b => b.item_id);
            const tipIds = bookmarkRefs.filter(b => b.item_type === 'tip').map(b => b.item_id);
            // const videoIds = bookmarkRefs.filter(b => b.item_type === 'video').map(b => b.item_id);

            // 3. Fetch details
            const promises = [];

            if (postIds.length > 0) {
                promises.push(
                    supabase.from('forum_posts')
                        .select('id, title, category, created_at, content')
                        .in('id', postIds)
                        .then(res => ({ type: 'post', data: res.data }))
                );
            }
            
            if (tipIds.length > 0) {
                 promises.push(
                    supabase.from('tips')
                        .select('id, title, category, image_url')
                        .in('id', tipIds)
                         .then(res => ({ type: 'tip', data: res.data }))
                );
            }

            const results = await Promise.all(promises);
            
            // 4. Map back to bookmark list to preserve order? Or just group?
            // Let's create a combined list
            let finalItems = [];
            
            results.forEach(res => {
                if (res.data) {
                    const items = res.data.map(item => ({
                        ...item,
                        type: res.type, // 'post' or 'tip'
                        // normalize fields for UI
                        displayTitle: item.title,
                        displayDesc: item.content || item.category,
                        displayImage: item.image_url
                    }));
                    finalItems = [...finalItems, ...items];
                }
            });

            // Re-sort by bookmark creation time?
            // This is harder because we lost the map to bookmarkRef. 
            // For MVP, just showing them is enough. 
            // Or we map over `bookmarkRefs` and find the detail.
            
            const orderedItems = bookmarkRefs.map(ref => {
               const detail = finalItems.find(i => i.id === ref.item_id && i.type === ref.item_type);
               if (!detail) return null;
               return { ...detail, bookmarkId: ref.id, bookmarkedAt: ref.created_at };
            }).filter(Boolean);

            setBookmarks(orderedItems);

        } catch (err) {
            console.error("Error fetching bookmarks:", err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchBookmarks();
    }, [fetchBookmarks]);

    return { bookmarks, loading, refreshBookmarks: fetchBookmarks };
}
