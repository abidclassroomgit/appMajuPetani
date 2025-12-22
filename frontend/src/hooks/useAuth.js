import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user data on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        try {
            const savedUser = localStorage.getItem('petaniMaju_user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error reading auth data:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const saveUserData = (userData) => {
        try {
            const dataToSave = { ...userData, setupCompleted: true };
            localStorage.setItem('petaniMaju_user', JSON.stringify(dataToSave));
            setUser(dataToSave);
            
            // Also sync with profile data (legacy support if needed)
            const profileData = {
                nama: userData.nama,
                provinsi: userData.provinsi,
                kabupaten: userData.kabupaten,
                kecamatan: userData.kecamatan,
                tanaman: userData.jenisTanaman
            };
            localStorage.setItem('petaniMaju_profil', JSON.stringify(profileData));
            
            return true;
        } catch (error) {
            console.error("Error saving auth data:", error);
            return false;
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('petaniMaju_user');
            // Optional: Also clear profile? Maybe keep it for cache? 
            // For security/clean slate we usually clear it.
            localStorage.removeItem('petaniMaju_profil'); 
            setUser(null);
            router.push('/welcome');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        saveUserData,
        logout,
        checkAuth
    };
}
