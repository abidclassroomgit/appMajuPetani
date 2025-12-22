"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, ThumbsUp, MessageCircle, Bookmark, Share2, Send, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForum } from "@/hooks/useForum";
import { useAuth } from "@/hooks/useAuth";

export default function ForumDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { getPostById, toggleLikePost, toggleBookmarkPost, addComment } = useForum();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const id = parseInt(params.id);
        const foundPost = getPostById(id);
        if (foundPost) {
            setPost(foundPost);
        }
    }, [params.id, getPostById]); // Dependency on getPostById might trigger re-renders if hook returns new func instance, but okay for MVP

    const handleSendComment = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setIsSending(true);
        // Simulate network delay
        setTimeout(() => {
            addComment(post.id, commentText, user || {});
            setCommentText("");
            setIsSending(false);
            // Refresh post data
            const updated = getPostById(post.id);
            setPost(updated);
        }, 500);
    };

    const handleShare = () => {
         if (navigator.share) {
            navigator.share({
                title: `PetaniMaju Forum`,
                text: post.title ? `${post.title}` : `Postingan dari ${post.author.name}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert("Fitur bagikan link: " + window.location.href);
        }
    };

    if (!post) return <div className="p-10 text-center">Memuat postingan...</div>;

    const CATEGORY_COLORS = {
        "Pertanyaan": "bg-blue-100 text-blue-700",
        "Tips & Trik": "bg-green-100 text-green-700",
        "Pengalaman": "bg-purple-100 text-purple-700",
        "Diskusi Umum": "bg-gray-100 text-gray-700"
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-sm font-bold text-gray-800">Detail Postingan</h1>
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Post Content */}
            <div className="bg-white p-4 mb-4">
                {/* User Info */}
                <div className="flex items-start justify-between mb-4">
                     <div className="flex gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg border border-gray-100">
                            {post.author.avatar}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">{post.author.name}</h3>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                <span>{post.author.location}</span>
                                <span>• {post.timestamp}</span>
                            </div>
                        </div>
                    </div>
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${CATEGORY_COLORS[post.category] || "bg-gray-100"}`}>
                        {post.category}
                    </span>
                </div>

                {/* Body */}
                <div className="mb-4">
                    {post.title && <h2 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h2>}
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                </div>

                 {/* Stats & Actions */}
                <div className="border-t pt-3">
                    <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                        <span>{post.likes} Orang menyukai ini</span>
                        <span>{post.commentsCount} Komentar</span>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => {
                                toggleLikePost(post.id);
                                setPost({...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1});
                            }}
                            className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-xs font-bold transition-all ${post.isLiked ? "bg-green-50 text-green-700 ring-1 ring-green-200" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                        >
                            <ThumbsUp size={16} className={post.isLiked ? "fill-green-700" : ""} /> Like
                        </button>
                        <button 
                            onClick={() => {
                                toggleBookmarkPost(post.id);
                                setPost({...post, isBookmarked: !post.isBookmarked});
                            }}
                            className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-xs font-bold ${post.isBookmarked ? "bg-green-50 text-green-700 ring-1 ring-green-200" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                        >
                            <Bookmark size={16} className={post.isBookmarked ? "fill-green-700" : ""} /> Simpan
                        </button>
                         <button 
                            onClick={handleShare}
                            className="flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-xs font-bold bg-gray-50 text-gray-600 hover:bg-gray-100"
                        >
                            <Share2 size={16} /> Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white p-4">
                <h3 className="font-bold text-gray-800 text-sm mb-4">Komentar ({post.commentsCount})</h3>
                
                <div className="space-y-6">
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map(comment => (
                            <div key={comment.id}>
                                <div className="flex gap-3 mb-2">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm border border-gray-100 shrink-0">
                                        {comment.author.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-gray-50 rounded-2xl rounded-tl-none p-3 relative">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-xs text-gray-800">{comment.author.name}</h4>
                                                <span className="text-[10px] text-gray-400">{comment.timestamp}</span>
                                            </div>
                                            <p className="text-xs text-gray-700">{comment.content}</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 pl-2">
                                            <button className="text-[10px] font-bold text-gray-500 hover:text-green-700">Like</button>
                                            <button className="text-[10px] font-bold text-gray-500 hover:text-green-700">Balas</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Nested Replies */}
                                {comment.replies && comment.replies.map(reply => (
                                     <div key={reply.id} className="flex gap-3 mb-2 pl-11">
                                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs border border-gray-100 shrink-0">
                                            {reply.author.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gray-50 rounded-2xl rounded-tl-none p-2 relative">
                                                <div className="flex justify-between items-start mb-0.5">
                                                    <h4 className="font-bold text-xs text-gray-800">{reply.author.name}</h4>
                                                    <span className="text-[10px] text-gray-400">{reply.timestamp}</span>
                                                </div>
                                                <p className="text-xs text-gray-700">{reply.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-sm text-gray-400 italic py-4">Belum ada komentar. Jadilah yang pertama!</p>
                    )}
                </div>
            </div>

            {/* Comment Input */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-2 items-center z-20">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm border border-green-200 shrink-0">
                    👤
                </div>
                <form onSubmit={handleSendComment} className="flex-1 relative">
                    <input 
                        type="text" 
                        placeholder="Tulis komentar..." 
                        className="w-full bg-gray-100 rounded-full py-2 pl-4 pr-10 text-sm outline-none focus:ring-1 focus:ring-green-500"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={isSending}
                    />
                    <button 
                        type="submit"
                        disabled={!commentText.trim() || isSending}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-green-700 text-white rounded-full hover:bg-green-800 disabled:bg-gray-300 transition-colors"
                    >
                        <Send size={14} />
                    </button>
                </form>
            </div>
        </div>
    );
}
