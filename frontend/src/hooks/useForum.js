import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';

export function useForum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all posts with user profiles
  const fetchPosts = useCallback(async () => {
    try {
        setLoading(true);
        
        // Fetch Posts with Author profile
        const { data, error } = await supabase
            .from('forum_posts')
            .select(`
                *,
                profiles:user_id (nama, kabupaten, avatar_url),
                is_liked:forum_likes(user_id),
                is_bookmarked:bookmarks(item_id)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform data to match UI needs
        const formatted = data.map(post => ({
            id: post.id,
            user_id: post.user_id, // Expose ID for filtering
            title: post.title,
            content: post.content,
            category: post.category,
            timestamp: new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            likes: post.likes_count || 0,
            commentsCount: post.comments_count || 0,
            isLiked: user ? post.is_liked.some(like => like.user_id === user.id) : false,
            isBookmarked: user ? post.is_bookmarked.some(b => b.item_id === post.id && b.item_type === 'post') : false, // Filter by type if needed, or simple check
            author: {
                name: post.profiles?.nama || "Petani",
                location: post.profiles?.kabupaten || "Indonesia",
                avatar: "👤" // fallback avatar
            }
        }));

        setPosts(formatted);
    } catch (err) {
        console.error("Error fetching forum:", err);
    } finally {
        setIsLoaded(true);
        setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const addPost = async (newPost) => {
    if (!user) {
        alert("Sesi anda habis. Silakan login kembali.");
        return;
    }
    try {
        const { data, error } = await supabase
            .from('forum_posts')
            .insert([{
                user_id: user.id,
                title: newPost.title,
                content: newPost.content,
                category: newPost.category,
                image_urls: newPost.image ? [newPost.image] : []
            }])
            .select()
            .single();

        if (error) throw error;
        
        // Refresh list
        await fetchPosts();
        return data.id;

    } catch (err) {
        console.error("Error adding post:", err);
        alert("Gagal memposting: " + err.message);
    }
  };

  const getPostById = async (id) => {
      // For details page, we might want fresh data including comments
      try {
        const { data, error } = await supabase
            .from('forum_posts')
            .select(`
                *,
                profiles:user_id (nama, kabupaten),
                forum_comments (
                    id, content, created_at,
                    profiles:user_id (nama, avatar_url)
                )
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        
        // Check like/bookmark status separately or rely on list (for simplicity in detail, we re-check or pass from list)
        // Here we just formatter for the detail view
        return {
            id: data.id,
            title: data.title,
            content: data.content,
            category: data.category,
            timestamp: new Date(data.created_at).toLocaleDateString('id-ID'),
            likes: data.likes_count,
            commentsCount: data.comments_count,
            // Re-use current user state for these if possible, or fetch separate
            isLiked: false, // Placeholder, usually checked real-time or passed via props
            isBookmarked: false,
            author: { 
                name: data.profiles?.nama || "Petani", 
                location: data.profiles?.kabupaten || "Indonesia", 
                avatar: "👤" 
            },
            comments: data.forum_comments.map(c => ({
                id: c.id,
                content: c.content,
                timestamp: new Date(c.created_at).toLocaleDateString('id-ID'),
                author: {
                    name: c.profiles?.nama || "User",
                    avatar: "👤"
                }
            }))
        };
      } catch (err) {
          console.error("Error getting post:", err);
          return null;
      }
  };

  const toggleLikePost = async (id) => {
    if (!user) return alert("Silakan login untuk menyukai.");
    
    // Optimistic UI
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) return;
    
    const oldPost = posts[postIndex];
    const newIsLiked = !oldPost.isLiked;
    const newLikes = newIsLiked ? oldPost.likes + 1 : oldPost.likes - 1;

    const newPosts = [...posts];
    newPosts[postIndex] = { ...oldPost, isLiked: newIsLiked, likes: newLikes };
    setPosts(newPosts);

    try {
        if (newIsLiked) {
             await supabase.from('forum_likes').insert([{ user_id: user.id, post_id: id }]);
             // Increment counter RPC or rely on trigger? simplified:
             await supabase.rpc('increment_likes', { row_id: id });
        } else {
             await supabase.from('forum_likes').delete().eq('user_id', user.id).eq('post_id', id);
             await supabase.rpc('decrement_likes', { row_id: id });
        }
    } catch (err) {
        console.error("Like error:", err);
        setPosts(posts); // Revert
    }
  };

  const toggleBookmarkPost = async (id) => {
    if (!user) return alert("Silakan login untuk menyimpan.");
    
    // Optimistic
    const postIndex = posts.findIndex(p => p.id === id);
    const oldPost = posts[postIndex];
    const newPosts = [...posts];
    newPosts[postIndex] = { ...oldPost, isBookmarked: !oldPost.isBookmarked };
    setPosts(newPosts);

    try {
        if (!oldPost.isBookmarked) {
            await supabase.from('bookmarks').insert([{ user_id: user.id, item_type: 'post', item_id: id }]);
        } else {
            await supabase.from('bookmarks').delete().eq('user_id', user.id).eq('item_type', 'post').eq('item_id', id);
        }
    } catch (err) {
        console.error("Bookmark error:", err);
        setPosts(posts);
    }
  };

  const addComment = async (postId, content) => {
    if (!user) return;
    try {
        const { error } = await supabase
            .from('forum_comments')
            .insert([{
                post_id: postId,
                user_id: user.id,
                content: content
            }]);
        
        if (error) throw error;
        
        // Increment comment count
        await supabase.rpc('increment_comments', { row_id: postId });
        
        // We usually reload the specific post here
    } catch (err) {
        console.error("Comment error:", err);
    }
  };

  return {
    posts,
    addPost,
    getPostById,
    toggleLikePost,
    toggleBookmarkPost,
    addComment,
    isLoaded,
    loading,
    refreshPosts: fetchPosts
  };
}
