"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Lightbulb, User, MessageSquare } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? "text-green-700 font-bold" : "text-gray-400 font-medium";

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 pb-6 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
            <div className="flex justify-between items-center max-w-md mx-auto">
                <Link href="/" className={`flex flex-col items-center gap-1 ${isActive("/")}`}>
                    <Home size={20} />
                    <span className="text-xs">Beranda</span>
                </Link>
                <Link href="/tips" className={`flex flex-col items-center gap-1 ${isActive("/tips")}`}>
                    <Lightbulb size={20} />
                    <span className="text-xs">Tips</span>
                </Link>
                <Link href="/forum" className={`flex flex-col items-center gap-1 ${isActive("/forum")}`}>
                    <MessageSquare size={20} />
                    <span className="text-xs">Forum</span>
                </Link>
                <Link href="/profil" className={`flex flex-col items-center gap-1 ${isActive("/profil")}`}>
                    <User size={20} />
                    <span className="text-xs">Profil</span>
                </Link>
            </div>
        </div>
    );
}
