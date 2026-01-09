"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isLoading } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Safe pages that don't need auth
        const publicPaths = ['/welcome', '/auth'];
        
        if (publicPaths.includes(pathname)) {
            setIsChecking(false);
            return;
        }

        if (!isLoading) {
            if (!isAuthenticated) {
                // Redirect to Auth page (Login/Register)
                router.push("/auth");
            }
            setIsChecking(false);
        }
    }, [isAuthenticated, isLoading, pathname, router]);

    // Show loading state while checking
    if (isLoading || isChecking) {
        // Don't show loading on public pages
        if (['/welcome', '/auth'].includes(pathname)) return <>{children}</>;

        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-pulse flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-green-200 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-100 rounded"></div>
                </div>
            </div>
        );
    }

    // Render children if authenticated or on welcome page
    return <>{children}</>;
}
