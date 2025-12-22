"use client";
import { useState } from "react";
import { Search, MessageSquare, ThumbsUp, MessageCircle, Bookmark, Plus, Edit2 } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useForum } from "@/hooks/useForum";

export default function ForumPage() {
    const { posts, isLoaded, toggleLikePost, toggleBookmarkPost } = useForum();
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [sortBy, setSortBy] = useState("Terbaru");

    const filteredPosts = posts.filter(post => {
        if (activeCategory === "Semua") return true;
        return post.category === activeCategory;
    });

    // Implement sort logic
    // For simplicity in this step, we just use filteredPosts as is since dummy data is somewhat static
    // Real app would sort by timestamp or likes count

    const CATEGORY_COLORS = {
        "Pertanyaan": "bg-blue-100 text-blue-700",
        "Tips & Trik": "bg-green-100 text-green-700",
        "Pengalaman": "bg-purple-100 text-purple-700",
        "Diskusi Umum": "bg-gray-100 text-gray-700"
    };

    if (!isLoaded) return <div className="p-10 text-center">Memuat forum...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <MessageSquare className="text-green-700" size={24} />
                            Forum Petani
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">Berbagi pengalaman & bertanya</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {["Semua", "Pertanyaan", "Tips & Trik", "Pengalaman", "Diskusi Umum"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                                activeCategory === cat ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Post Feed */}
            <div className="p-4 space-y-4">
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                        <MessageSquare className="mx-auto text-gray-300 mb-2" size={48} />
                        <p className="text-gray-500">Belum ada postingan. Jadilah yang pertama!</p>
                        <Link href="/forum/create" className="inline-block mt-4 text-green-700 font-bold text-sm">
                            Buat Postingan
                        </Link>
                    </div>
                ) : (
                    filteredPosts.map(post => (
                        <Link href={`/forum/${post.id}`} key={post.id} className="block">
                            <div className="bg-white rounded-xl p-4 shadow-sm active:scale-[0.99] transition-transform">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg shadow-sm border border-gray-100">
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

                                {/* Content */}
                                <div className="mb-4">
                                    {post.title && <h2 className="font-bold text-gray-900 mb-1">{post.title}</h2>}
                                    <p className="text-sm text-gray-600 line-clamp-3">{post.content}</p>
                                </div>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-between border-t pts-3 mt-2 pt-3">
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleLikePost(post.id);
                                            }}
                                            className={`flex items-center gap-1 text-xs font-medium transition-colors ${post.isLiked ? "text-green-600" : "text-gray-500 hover:text-green-600"}`}
                                        >
                                            <ThumbsUp size={16} className={post.isLiked ? "fill-green-600" : ""} />
                                            {post.likes}
                                        </button>
                                        <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
                                            <MessageCircle size={16} />
                                            {post.commentsCount}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleBookmarkPost(post.id);
                                        }}
                                        className={`text-gray-400 hover:text-green-600 ${post.isBookmarked ? "text-green-600" : ""}`}
                                    >
                                        <Bookmark size={16} className={post.isBookmarked ? "fill-green-600" : ""} />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            {/* FAB Create Post */}
            <Link 
                href="/forum/create"
                className="fixed bottom-20 right-4 bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg shadow-green-200 z-30 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
                <Edit2 size={24} />
            </Link>

            <BottomNav />
        </div>
    );
}
