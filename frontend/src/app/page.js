"use client";
import { Cloud, Sun, MapPin, CloudRain, Wind, Home, Lightbulb, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomePage() {
    const pathname = usePathname();

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />
                        <span className="text-sm font-medium">Subang</span>
                    </div>
                </div>

                {/* Current Weather */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Sun className="text-yellow-500" size={48} />
                            <div>
                                <h1 className="text-4xl font-bold">32°C</h1>
                                <p className="text-gray-600">Cerah</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 7 Day Forecast */}
                <h2 className="font-bold text-lg mb-4">Prakiraan 7 Hari</h2>
                <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, idx) => (
                        <div key={day} className="flex-shrink-0 bg-white border rounded-xl p-4 w-20 text-center">
                            <p className="text-sm font-medium text-gray-500 mb-2">{day}</p>
                            {idx % 2 === 0 ? <Sun className="text-yellow-500 mx-auto mb-2" size={24} /> : <Cloud className="text-gray-400 mx-auto mb-2" size={24} />}
                            <p className="text-sm font-bold">35°/24°</p>
                        </div>
                    ))}
                </div>

                {/* Daily Tips */}
                <h2 className="font-bold text-lg mb-4">Tips Harian</h2>
                <div className="space-y-4">
                    <div className="bg-white border rounded-xl p-4 flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CloudRain className="text-red-500" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-1">Peringatan Pengendalian Hama</h3>
                            <p className="text-xs text-gray-500">Waspada serangan wereng pada fase generatif...</p>
                        </div>
                    </div>
                    <div className="bg-white border rounded-xl p-4 flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Wind className="text-green-500" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-1">Waktu Irigasi Optimal</h3>
                            <p className="text-xs text-gray-500">Gunakan sistem pengairan intermiten...</p>
                        </div>
                    </div>
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
