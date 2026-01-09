import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { VIDEO_DUMMY } from '@/data/videoDummy';

export function useVideo() {
    const [bookmarks, setBookmarks] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initial load for videos
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data: dbVideos, error } = await supabase
                    .from('videos')
                    .select('*')
                    .order('upload_date', { ascending: false });
                
                if (error) throw error;

                if (dbVideos && dbVideos.length > 0) {
                    setVideos(dbVideos);
                } else {
                    setVideos(VIDEO_DUMMY);
                }
            } catch (err) {
                console.error("Error fetching videos:", err);
                setVideos(VIDEO_DUMMY);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // Load bookmarks (Local Storage for now, migrating to DB next phase)
    useEffect(() => {
        const saved = localStorage.getItem('petaniMaju_bookmarks');
        if (saved) {
            setBookmarks(JSON.parse(saved));
        }
    }, []);

    // Save bookmarks
    useEffect(() => {
        localStorage.setItem('petaniMaju_bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const toggleBookmark = (videoId) => {
        if (bookmarks.includes(videoId)) {
            setBookmarks(bookmarks.filter(id => id !== videoId));
        } else {
            setBookmarks([...bookmarks, videoId]);
        }
    };

    const isBookmarked = (videoId) => bookmarks.includes(videoId);

    const getVideoById = (id) => {
        return videos.find(v => v.id == id);
    };

    return {
        videos,
        isLoading,
        isBookmarked,
        toggleBookmark,
        getVideoById
    };
}
