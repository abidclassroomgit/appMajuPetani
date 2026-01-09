"use client";
import { useState } from "react";
import { Search, Bug, ChevronRight } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useHama } from "@/hooks/useHama";

export default function HamaPage() {
    const { data: hamaList, isLoading } = useHama();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [activeSeverity, setActiveSeverity] = useState("Semua");

    const filteredData = hamaList.filter(item => {
        const matchesCategory = activeCategory === "Semua" || item.type === activeCategory || (activeCategory === "Hama" && item.type === "Hama") || (activeCategory === "Penyakit" && item.type === "Penyakit") || (activeCategory === "Gulma" && item.type === "Gulma");
        // Note: Logic adjustment needed because seeding mapped category->type. 
        // Let's assume database 'type' matches filter category, or do robust check.
        // Hama Dummy used 'category', DB schema uses 'type'.
        // Seed script: type: h.category. So database column is 'type'.
        
        const typeMatch = activeCategory === "Semua" || item.type === activeCategory;
        const severityMatch = activeSeverity === "Semua" || item.severity === activeSeverity;
        const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        return typeMatch && severityMatch && searchMatch;
    });

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-green-700 font-bold">Memuat data...</div>;
    }

    const getSeverityColor = (severity) => {
        switch (severity.toLowerCase()) {
            case 'tinggi': return 'bg-red-100 text-red-800';
            case 'sedang': return 'bg-yellow-100 text-yellow-800';
            case 'rendah': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryColor = (category) => {
        switch (category.toLowerCase()) {
            case 'hama': return 'bg-red-50 text-red-700';
            case 'penyakit': return 'bg-orange-50 text-orange-700';
            case 'gulma': return 'bg-green-50 text-green-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 shadow-sm">
                <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Bug className="text-green-700" size={24} />
                    Info Hama & Penyakit
                </h1>
                
                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari hama atau penyakit..."
                        className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {["Semua", "Hama", "Penyakit", "Gulma"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                activeCategory === cat ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredData.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            Tidak ditemukan hasil untuk pencarian ini.
                        </div>
                    ) : (
                        filteredData.map((item) => (
                            <Link href={`/hama/${item.id}`} key={item.id}>
                                <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                                    <div className="h-40 bg-gray-200 relative">
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2">
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${getSeverityColor(item.severity)}`}>
                                                {item.severity}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between mb-2">
                                            <span className={`px-2 py-1 rounded text-[10px] font-medium ${getCategoryColor(item.type)}`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                                        <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{item.description}</p>
                                        <div className="flex items-center text-green-600 text-xs font-semibold gap-1 mt-auto">
                                            Lihat Detail <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
