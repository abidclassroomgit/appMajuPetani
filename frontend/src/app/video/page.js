"use client";
import { useState } from "react";
import { Search, Play, Eye, Filter, PlayCircle } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { VIDEO_DUMMY } from "@/data/videoDummy";

export default function VideoPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [activeDuration, setActiveDuration] = useState("Semua Durasi");
    const [sortBy, setSortBy] = useState("Terbaru");

    const filteredVideos = VIDEO_DUMMY.filter(video => {
        // Search
        if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        
        // Category
        if (activeCategory !== 'Semua' && video.category !== activeCategory) return false;
        
        // Duration
        if (activeDuration !== 'Semua Durasi') {
            const [minutes] = video.duration.split(':').map(Number);
            if (activeDuration === '< 5 menit' && minutes >= 5) return false;
            if (activeDuration === '5-10 menit' && (minutes < 5 || minutes > 10)) return false;
            if (activeDuration === '> 10 menit' && minutes <= 10) return false;
        }
        
        return true;
    });

    const sortedVideos = [...filteredVideos].sort((a, b) => {
        if (sortBy === 'Terbaru') return b.id - a.id; // Using ID as proxy for date
        if (sortBy === 'Terpopuler') return b.views - a.views;
        if (sortBy === 'Terlama') return a.id - b.id;
        return 0;
    });

    const CATEGORY_COLORS = {
        Tanam: "bg-green-100 text-green-800",
        Rawat: "bg-blue-100 text-blue-800",
        Panen: "bg-orange-100 text-orange-800",
        Teknologi: "bg-purple-100 text-purple-800",
        Pengolahan: "bg-yellow-100 text-yellow-800"
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <PlayCircle className="text-red-600" size={24} />
                            Video Tutorial
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">Pelajari teknik pertanian praktis</p>
                    </div>
                </div>
                
                {/* Search */}
                <div className="relative mt-4 mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari video tutorial..."
                        className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="space-y-3">
                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {["Semua", "Tanam", "Rawat", "Panen", "Teknologi", "Pengolahan"].map((cat) => (
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
                    
                    {/* Duration & Sort */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        <select 
                            className="bg-white border rounded-lg text-xs px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                            value={activeDuration}
                            onChange={(e) => setActiveDuration(e.target.value)}
                        >
                            <option>Semua Durasi</option>
                            <option>&lt; 5 menit</option>
                            <option>5-10 menit</option>
                            <option>&gt; 10 menit</option>
                        </select>
                         <select 
                            className="bg-white border rounded-lg text-xs px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option>Terbaru</option>
                            <option>Terpopuler</option>
                            <option>Terlama</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Video Grid */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedVideos.length === 0 ? (
                     <div className="col-span-full text-center py-10 text-gray-500">
                        Tidak ditemukan video sesuai filter.
                    </div>
                ) : (
                    sortedVideos.map((video) => (
                        <Link href={`/video/${video.id}`} key={video.id}>
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group h-full flex flex-col">
                                <div className="relative aspect-video bg-gray-200">
                                    {/* Thumbnail Placeholder logic if string URL fails, simpler to just use placeholder service in dummy */}
                                    <div className="absolute inset-0 bg-gray-300 animate-pulse group-hover:hidden" /> 
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover relative z-10" />
                                    
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors z-20">
                                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                                            <Play size={20} className="text-green-700 ml-1" fill="currentColor" />
                                        </div>
                                    </div>
                                    <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded z-20">
                                        {video.duration}
                                    </span>
                                </div>
                                <div className="p-3 flex-1 flex flex-col">
                                    <h3 className="font-bold text-gray-800 text-sm leading-tight mb-2 line-clamp-2">{video.title}</h3>
                                    <div className="mt-auto pt-2 flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Eye size={12} /> {video.views.toLocaleString()}
                                        </div>
                                        <span>{video.uploadDate}</span>
                                    </div>
                                    <div className="mt-2">
                                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${CATEGORY_COLORS[video.category] || "bg-gray-100 text-gray-600"}`}>
                                            {video.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            <BottomNav />
        </div>
    );
}
