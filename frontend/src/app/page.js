"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CloudSun, Cloud, CloudRain, Droplets, Wind, MapPin, ChevronRight, Bug, Calendar, PlayCircle, Leaf, MessageSquare } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { WEATHER_DUMMY } from "@/data/weatherDummy";
import { FORUM_POSTS } from "@/data/forumDummy";

// Dummy data for tips since we don't have a centralized tips store yet (using static from tips page for now as placeholder or reference)
const RECENT_TIPS = [
    {
        id: 1,
        title: "Cara Pemupukan Padi yang Tepat",
        category: "Padi",
        desc: "Panduan dosis dan waktu pemupukan untuk hasil maksimal."
    },
    {
        id: 2,
        title: "Mengatasi Hama Wereng Secara Alami",
        category: "Hama",
        desc: "Solusi organik untuk membasmi wereng tanpa pestisida kimia."
    }
];

export default function Home() {
    const { user } = useAuth();
    const [currentWeather, setCurrentWeather] = useState(WEATHER_DUMMY.current);
    const [forumHighlights, setForumHighlights] = useState([]);

    useEffect(() => {
        // Load recent forum posts
        setForumHighlights(FORUM_POSTS.slice(0, 2));
    }, []);

    // Helper to get greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 11) return "Selamat Pagi";
        if (hour < 15) return "Selamat Siang";
        if (hour < 18) return "Selamat Sore";
        return "Selamat Malam";
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-28"> 
            {/* Header */}
            <div className="bg-white p-6 pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">{getGreeting()},</p>
                        <h1 className="text-xl font-bold text-gray-900">{user?.name || "Petani Maju"}</h1>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                            <MapPin size={14} className="text-green-600" />
                            <span>{user?.kabupaten || "Lokasi Anda"}, {user?.kecamatan}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                
                {/* Weather Summary Card */}
                <Link href="/cuaca">
                    <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                        
                        <div className="flex justify-between items-center relative z-10">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <CloudSun size={24} className="text-yellow-300" />
                                    <span className="text-sm font-medium opacity-90">Cuaca Hari Ini</span>
                                </div>
                                <div className="text-5xl font-bold mb-1">{currentWeather.temp}°C</div>
                                <div className="text-sm font-medium opacity-90 flex items-center gap-2">
                                    {currentWeather.condition}
                                    <span className="w-1 h-1 rounded-full bg-white/60"></span>
                                    <span className="flex items-center gap-1"><Droplets size={12}/> {currentWeather.rainChance}% Hujan</span>
                                </div>
                            </div>
                            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                                <ChevronRight size={24} />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-xs opacity-80">
                            <span>Lihat prakiraan lengkap</span>
                            <span>Update: 10 menit yll</span>
                        </div>
                    </div>
                </Link>

                {/* Quick Access Grid */}
                <div>
                     <div className="grid grid-cols-2 gap-4">
                        <Link href="/cuaca" className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex flex-col items-center justify-center gap-2 aspect-square">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                <CloudSun size={32} />
                            </div>
                            <span className="text-sm font-bold text-gray-700">Cuaca</span>
                        </Link>
                        
                        <Link href="/hama" className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex flex-col items-center justify-center gap-2 aspect-square">
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                                <Bug size={32} />
                            </div>
                            <span className="text-sm font-bold text-gray-700">Info Hama</span>
                        </Link>

                        <Link href="/kalender" className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex flex-col items-center justify-center gap-2 aspect-square">
                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                <Calendar size={32} />
                            </div>
                            <span className="text-sm font-bold text-gray-700">Kalender</span>
                        </Link>

                        <Link href="/video" className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex flex-col items-center justify-center gap-2 aspect-square">
                            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                                <PlayCircle size={32} />
                            </div>
                            <span className="text-sm font-bold text-gray-700">Video</span>
                        </Link>
                     </div>
                </div>

                {/* Tips Section */}
                <div>
                    <div className="flex justify-between items-center mb-3 px-1">
                        <h2 className="text-sm font-bold text-gray-800">Tips Hari Ini</h2>
                        <Link href="/tips" className="text-xs text-green-700 font-bold">Lihat Semua</Link>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
                        {RECENT_TIPS.map(tip => (
                            <Link href={`/tips/${tip.id}`} key={tip.id} className="min-w-[240px] bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-700 shrink-0">
                                        <Leaf size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-800 leading-tight mb-1">{tip.title}</h3>
                                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">{tip.category}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Forum Highlights */}
                <div>
                     <div className="flex justify-between items-center mb-3 px-1">
                        <h2 className="text-sm font-bold text-gray-800">Diskusi Terbaru</h2>
                        <Link href="/forum" className="text-xs text-green-700 font-bold">Lihat Forum</Link>
                    </div>
                    <div className="space-y-3">
                        {forumHighlights.map(post => (
                            <Link href={`/forum/${post.id}`} key={post.id} className="block bg-white border border-gray-100 p-4 rounded-xl shadow-sm active:scale-[0.99] transition-transform">
                                <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-1">{post.title || "Postingan Baru"}</h3>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{post.content}</p>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                    <MessageSquare size={12} /> {post.commentsCount} Komentar
                                    <span>• {post.timestamp}</span>
                                </div>
                            </Link>
                        ))}
                        {forumHighlights.length === 0 && (
                             <div className="text-center py-4 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-xs text-gray-500">Belum ada diskusi terbaru.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            
            <BottomNav />
        </div>
    );
}
