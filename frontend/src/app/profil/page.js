"use client";
import { User, MapPin, Phone, Mail, Settings, LogOut, Home, Lightbulb, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfilPage() {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-green-700 text-white p-8 rounded-b-3xl mb-6">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
                        <User size={48} />
                    </div>
                    <h1 className="text-xl font-bold">Pak Abid</h1>
                    <p className="text-white/80 text-sm">Petani Padi • Subang</p>
                </div>
            </div>

            <div className="px-6 space-y-6">
                {/* Info */}
                <div className="bg-white rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <MapPin size={18} className="text-green-700" />
                        <span>Ds. Cisalak, Kec. Cisarua, Subang</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Phone size={18} className="text-green-700" />
                        <span>+62 812-3456-7890</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Mail size={18} className="text-green-700" />
                        <span>abid.petani@email.com</span>
                    </div>
                </div>

                {/* Menu */}
                <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <Settings size={20} className="text-green-700" />
                            </div>
                            <span className="font-medium">Pengaturan Akun</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                    </div>
                    <div className="bg-white rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <ChevronRight size={20} className="text-green-700" />
                            </div>
                            <span className="font-medium">Bantuan & Dukungan</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                    </div>
                    <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                            <LogOut size={20} className="text-red-500" />
                        </div>
                        <span className="font-medium text-red-500">Keluar</span>
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
