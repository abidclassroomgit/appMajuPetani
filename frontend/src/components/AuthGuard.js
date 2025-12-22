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
        // Skip check for welcome page to prevent loops
        if (pathname === "/welcome") {
            setIsChecking(false);
            return;
        }

        if (!isLoading) {
            if (!isAuthenticated) {
                // If not authenticated, redirect to welcome
                router.push("/welcome");
            }
            setIsChecking(false);
        }
    }, [isAuthenticated, isLoading, pathname, router]);

    // Show loading state while checking
    if (isLoading || isChecking) {
        // Don't show loading on welcome page, just render children
        if (pathname === "/welcome") return <>{children}</>;

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
