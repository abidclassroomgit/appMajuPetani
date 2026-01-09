"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Share2, Bookmark, Leaf, Calendar, User } from "lucide-react";
import { TIPS_DATA } from "@/data/tipsData";

export default function TipDetailPage() {
    const { id } = useParams();
    const [tip, setTip] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (id) {
            const foundTip = TIPS_DATA.find(t => t.id === parseInt(id));
            setTip(foundTip);
        }
    }, [id]);

    if (!tip) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <span className="text-green-600 animate-pulse font-medium">Memuat artikel...</span>
        </div>
    );

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: tip.title,
                text: tip.summary,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert("Link artikel disalin ke clipboard!");
            // navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="min-h-screen bg-white pb-10">
            {/* Header / Navbar */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-4 py-3 flex justify-between items-center shadow-sm">
                <Link href="/tips" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-gray-800" />
                </Link>
                <span className="text-sm font-bold text-gray-800 truncate px-4 max-w-[200px]">
                    Article
                </span>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-2 rounded-full transition-colors ${
                            isBookmarked ? "bg-green-50 text-green-600" : "hover:bg-gray-100 text-gray-600"
                        }`}
                    >
                        <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                    <button 
                        onClick={handleShare}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                    >
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-64 md:h-80 bg-gray-200">
                <img 
                    src={tip.image} 
                    alt={tip.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {e.target.src = "https://via.placeholder.com/800x400"}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="px-5 -mt-8 relative z-10">
                {/* Meta Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        {tip.category}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <Calendar size={12} /> {tip.date}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
                    {tip.title}
                </h1>

                {/* Author Info (Dummy) */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        PM
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-800">Tim Petani Maju</p>
                        <p className="text-xs text-gray-500">Editor Ahli Pertanian</p>
                    </div>
                </div>

                {/* Main Content */}
                <article 
                    className="prose prose-green prose-sm max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: tip.content }}
                />

                {/* Footer Section */}
                <div className="mt-10 pt-6 border-t border-gray-100">
                    <p className="text-sm font-bold text-gray-800 mb-3">Artikel Terkait</p>
                    <div className="space-y-3">
                        {TIPS_DATA.filter(t => t.id !== tip.id).slice(0, 2).map(related => (
                            <Link href={`/tips/${related.id}`} key={related.id} className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50">
                                <img src={related.image} className="w-16 h-16 object-cover rounded-lg bg-gray-200" alt={related.title} />
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 line-clamp-2">{related.title}</h4>
                                    <span className="text-xs text-green-600 mt-1 block">{related.category}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
