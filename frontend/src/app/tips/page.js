"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, Filter, Leaf, ChevronRight, Calendar } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { TIPS_DATA, CATEGORIES } from "@/data/tipsData";

export default function TipsPage() {
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter Logic
    const filteredTips = TIPS_DATA.filter(tip => {
        const matchCategory = selectedCategory === "Semua" || tip.category === selectedCategory;
        const matchSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tip.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft size={24} className="text-gray-700" />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-800">Tips & Edukasi</h1>
                </div>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Cari tips bertani..." 
                        className="w-full bg-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                                selectedCategory === cat 
                                    ? "bg-green-600 text-white shadow-green-200 shadow-md" 
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Banner / Highlight (First item if no search) */}
            {!searchQuery && selectedCategory === "Semua" && TIPS_DATA.length > 0 && (
                <div className="px-4 mt-6">
                    <Link href={`/tips/${TIPS_DATA[0].id}`}>
                        <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg group">
                            <img 
                                src={TIPS_DATA[0].image} 
                                alt={TIPS_DATA[0].title} 
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                                <span className="bg-green-600 text-xs font-bold px-2 py-1 rounded w-fit mb-2">
                                    Rekomendasi
                                </span>
                                <h2 className="font-bold text-lg leading-tight mb-1">{TIPS_DATA[0].title}</h2>
                                <p className="text-xs opacity-90 line-clamp-1">{TIPS_DATA[0].summary}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            )}

            {/* List Content */}
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between pb-2">
                    <h3 className="font-bold text-gray-800 text-sm">
                        {searchQuery ? "Hasil Pencarian" : "Artikel Terbaru"}
                    </h3>
                    <span className="text-xs text-gray-500">{filteredTips.length} Artikel</span>
                </div>

                {filteredTips.length > 0 ? (
                    filteredTips.map(tip => (
                        <Link href={`/tips/${tip.id}`} key={tip.id}>
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3 hover:shadow-md transition-shadow active:scale-[0.99]">
                                {/* Thumbnail */}
                                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0 relative">
                                    <img 
                                        src={tip.image} 
                                        alt={tip.title} 
                                        className="w-full h-full object-cover" 
                                        onError={(e) => {e.target.src = "https://via.placeholder.com/150?text=No+Image"}}
                                    />
                                    <div className="absolute top-1 left-1 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-green-700">
                                        {tip.category.split(" ")[0]} 
                                    </div>
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2 mb-1">
                                            {tip.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                            {tip.summary}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Calendar size={12} className="text-gray-400" />
                                        <span className="text-[10px] text-gray-400">{tip.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                            <Leaf size={32} />
                        </div>
                        <h3 className="text-gray-800 font-bold mb-1">Tidak Ditemukan</h3>
                        <p className="text-sm text-gray-500">Coba kata kunci atau kategori lain.</p>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
