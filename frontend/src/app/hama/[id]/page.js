"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Share2, Bookmark, CheckCircle2, AlertTriangle, Shield, Leaf, Bug, Pill } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { HAMA_PENYAKIT_DATA } from "@/data/hamaDummy";

export default function HamaDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        // Find data by ID
        const id = parseInt(params.id);
        const foundData = HAMA_PENYAKIT_DATA.find(item => item.id === id);
        
        if (foundData) {
            setData(foundData);
        } else {
            // Handle not found (optional redirect)
             // router.push('/hama'); 
        }

        // Check bookmark status
        const bookmarks = JSON.parse(localStorage.getItem('petaniMaju_bookmarks') || "[]");
        setIsBookmarked(bookmarks.includes(id));
    }, [params.id]);

    const toggleBookmark = () => {
        const bookmarks = JSON.parse(localStorage.getItem('petaniMaju_bookmarks') || "[]");
        let newBookmarks;
        
        if (isBookmarked) {
            newBookmarks = bookmarks.filter(bid => bid !== data.id);
        } else {
            newBookmarks = [...bookmarks, data.id];
        }

        localStorage.setItem('petaniMaju_bookmarks', JSON.stringify(newBookmarks));
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `PetaniMaju - ${data.nama}`,
                text: `Cek info tentang ${data.nama} di PetaniMaju!`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert("Fitur bagikan belum tersedia di browser ini.");
        }
    };

    if (!data) return <div className="p-10 text-center">Memuat data...</div>;

    const sections = [
        { 
            title: "Ciri-Ciri Serangan", 
            icon: <Bug className="text-red-500" size={20} />, 
            content: data.ciriCiri, 
            type: "list",
            bulletIcon: <CheckCircle2 size={16} className="text-red-500 mt-0.5" />
        },
        { 
            title: "Penyebab & Kondisi", 
            icon: <AlertTriangle className="text-orange-500" size={20} />, 
            content: data.penyebab, 
            type: "text"
        },
        { 
            title: "Cara Mengatasi (Organik)", 
            icon: <Leaf className="text-green-600" size={20} />, 
            content: data.solusi, 
            type: "numbered",
            highlight: true
        },
        { 
            title: "Pencegahan Dini", 
            icon: <Shield className="text-blue-500" size={20} />, 
            content: data.pencegahan, 
            type: "list",
            bulletIcon: <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
        }
    ];

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header Image Area */}
            <div className="relative h-64 bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                {/* Mock Image using Emoji if Url fails or as placeholder logic */}
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-9xl">
                    {data.thumbnail}
                </div>
                
                {/* Navbar Overlay */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
                    <button onClick={() => router.back()} className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex gap-2">
                         <button onClick={handleShare} className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                    <div className="flex gap-2 mb-2">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold border border-white/30">
                            {data.category}
                        </span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold text-black ${
                            data.severity === 'Tinggi' ? 'bg-red-200' : 
                            data.severity === 'Sedang' ? 'bg-yellow-200' : 'bg-green-200'
                        }`}>
                            Bahaya: {data.severity}
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold leading-tight">{data.nama}</h1>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-8">
                
                {/* Short Desc */}
                <p className="text-gray-600 italic border-l-4 border-green-500 pl-4 py-1">
                    "{data.shortDesc}"
                </p>

                {/* Tanaman Terserang - Pills */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Leaf size={16} className="text-green-600" /> Tanaman terdampak:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {data.tanamanTerserang.map(t => (
                            <span key={t} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Sections Loop */}
                {sections.map((section, idx) => (
                    <div key={idx} className={`space-y-3 ${section.highlight ? 'bg-green-50 -mx-6 px-6 py-6 border-y border-green-100' : ''}`}>
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            {section.icon} {section.title}
                        </h3>
                        
                        {section.type === "text" && (
                            <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                        )}

                        {section.type === "list" && (
                            <ul className="space-y-2">
                                {section.content.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-700 items-start">
                                        <span className="shrink-0 mt-0.5">{section.bulletIcon}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {section.type === "numbered" && (
                            <ol className="space-y-4">
                                {section.content.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-800 bg-white p-3 rounded-xl border border-green-100 shadow-sm">
                                        <span className="flex items-center justify-center bg-green-100 text-green-700 font-bold w-6 h-6 rounded-full text-xs shrink-0">
                                            {i + 1}
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                ))}

            </div>

            {/* Bottom Floating Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3 max-w-md mx-auto z-30">
                <button 
                    onClick={toggleBookmark}
                    className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                        isBookmarked 
                            ? "bg-gray-100 text-gray-600 border border-gray-200" 
                            : "bg-green-700 text-white shadow-lg shadow-green-200"
                    }`}
                >
                    <Bookmark size={20} className={isBookmarked ? "fill-gray-600" : ""} />
                    {isBookmarked ? "Tersimpan" : "Simpan"}
                </button>
            </div>
        </div>
    );
}
