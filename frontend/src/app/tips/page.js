"use client";
import { Search, Home, Lightbulb, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function TipsPage() {
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");

    const tips = [
        { title: "Cara Memilih Pupuk Organik", category: "Pupuk", desc: "Pelajari kriteria penting..." },
        { title: "Teknik Tanam Padi Jajar Legowo", category: "Tanam", desc: "Sistem tanam jajar legowo..." },
        { title: "Mengatasi Hama Wereng", category: "Rawat", desc: "Tips pengendalian hama..." },
        { title: "Waktu Panen Padi yang Tepat", category: "Tanam", desc: "Kenali tanda-tanda padi siap panen..." },
    ];

    const filteredTips = tips.filter(tip => {
        const matchesCategory = activeCategory === "Semua" || tip.category === activeCategory;
        const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pb-20">
            <div className="p-6">
                <h1 className="text-xl font-bold text-center mb-6">Perpustakaan Tips</h1>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari tips pertanian"
                        className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="flex gap-3 overflow-x-auto pb-4 mb-4">
                    {["Semua", "Lahan", "Tanam", "Rawat", "Pupuk"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeCategory === cat ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Tips List */}
                <div className="space-y-4">
                    {filteredTips.map((tip, idx) => (
                        <div key={idx} className="bg-white border rounded-xl p-4">
                            <h3 className="font-bold text-sm mb-1">{tip.title}</h3>
                            <p className="text-xs text-gray-500">{tip.desc}</p>
                            <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{tip.category}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex items-center justify-around max-w-md mx-auto">
                <Link href="/" className={`flex flex-col items-center gap-1 ${pathname === "/" ? "text-green-700" : "text-gray-400"}`}>
                    <Home size={20} />
                    <span className="text-xs">Beranda</span>
                </Link>
                <Link href="/tips" className={`flex flex-col items-center gap-1 ${pathname === "/tips" ? "text-green-700" : "text-gray-400"}`}>
                    <Lightbulb size={20} />
                    <span className="text-xs">Tips</span>
                </Link>
                <Link href="/profil" className={`flex flex-col items-center gap-1 ${pathname === "/profil" ? "text-green-700" : "text-gray-400"}`}>
                    <User size={20} />
                    <span className="text-xs">Profil</span>
                </Link>
            </nav>
        </div>
    );
}
