import { useState, useEffect } from 'react';
import { FORUM_POSTS } from '@/data/forumDummy';

export function useForum() {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage or use dummy data
  useEffect(() => {
    const saved = localStorage.getItem('petaniMaju_forum_posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(FORUM_POSTS);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever posts change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('petaniMaju_forum_posts', JSON.stringify(posts));
    }
  }, [posts, isLoaded]);

  const addPost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: Date.now(),
      timestamp: "Baru saja",
      likes: 0,
      commentsCount: 0,
      isLiked: false,
      isBookmarked: false,
      comments: []
    };
    setPosts([postWithId, ...posts]);
    return postWithId.id;
  };

  const getPostById = (id) => {
    return posts.find(p => p.id === Number(id));
  };

  const toggleLikePost = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const toggleBookmarkPost = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  const addComment = (postId, commentContent, user) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          author: { name: user.name || "Petani", avatar: "👤" },
          timestamp: "Baru saja",
          content: commentContent,
          likes: 0,
          replies: []
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
          commentsCount: post.commentsCount + 1
        };
      }
      return post;
    }));
  };

  return {
    posts,
    addPost,
    getPostById,
    toggleLikePost,
    toggleBookmarkPost,
    addComment,
    isLoaded
  };
}
