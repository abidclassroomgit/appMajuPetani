import { useState, useEffect } from 'react';

export function useVideo() {
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('petaniMaju_bookmarkedVideos');
    if (saved) {
      setBookmarkedVideos(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('petaniMaju_bookmarkedVideos', JSON.stringify(bookmarkedVideos));
    }
  }, [bookmarkedVideos, isLoaded]);

  const toggleBookmark = (videoId) => {
    if (bookmarkedVideos.includes(videoId)) {
      setBookmarkedVideos(bookmarkedVideos.filter(id => id !== videoId));
    } else {
      setBookmarkedVideos([...bookmarkedVideos, videoId]);
    }
  };

  const isBookmarked = (videoId) => {
    return bookmarkedVideos.includes(videoId);
  };

  return { toggleBookmark, isBookmarked, bookmarkedVideos };
}
