"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initial Auth Check
    useEffect(() => {
        const initAuth = async () => {
             // 1. Try to recover session from Supabase (Persistent)
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session?.user) {
                // Session exists, fetch profile
                await fetchProfile(session.user.id);
            } else {
                setIsLoading(false);
            }
        };
        initAuth();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                 if (!user || user.id !== session.user.id) {
                     await fetchProfile(session.user.id);
                 }
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setIsLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (data) {
                setUser({
                    id: userId,
                    username: data.username,
                    nama: data.nama,
                    telepon: data.telepon,
                    provinsi: data.provinsi,
                    kabupaten: data.kabupaten,
                    kecamatan: data.kecamatan,
                    jenisTanaman: data.jenis_tanaman,
                });
            } else {
                console.log("User auth but no profile found.");
            }
        } catch (err) {
            console.error("Profile fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithPassword = async (email, password) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;
            return true;

        } catch (error) {
            console.error("Login Error:", error);
            const msg = error.message === "Invalid login credentials" 
                ? "Email atau password salah." 
                : error.message;
            alert("Gagal masuk: " + msg);
            setIsLoading(false);
            return false;
        }
    };

    const registerWithPassword = async (formData) => {
        setIsLoading(true);
        try {
            // 1. Sign Up with Metadata
            const { data, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        username: formData.username,
                        nama: formData.nama,
                        telepon: formData.telepon
                    }
                }
            });

            if (authError) throw authError;

            // 2. Check Session & Auto Login
            let session = data.session;
            let user = data.user;

            if (!session && user) {
                console.log("No session after signup. Attempting auto-login...");
                const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                
                if (loginError) {
                    // If this still fails, likely Email Confirmation is still enforced.
                    if (loginError.message.includes("Email not confirmed")) {
                        throw new Error("Pendaftaran berhasil, tetapi Anda harus verifikasi email dulu sebelum login, ATAU matikan 'Email Confirm' di Supabase.");
                    }
                }
                session = loginData?.session;
                user = loginData?.user;
            }

            if (!user) throw new Error("Gagal membuat user.");

            // 3. Create/Update Profile
            const profilePayload = {
                id: user.id,
                username: formData.username, // Stored for display
                telepon: formData.telepon,
                nama: formData.nama,
                provinsi: formData.provinsi,
                kabupaten: formData.kabupaten,
                kecamatan: formData.kecamatan,
                jenis_tanaman: formData.jenisTanaman,
                updated_at: new Date().toISOString()
            };

            const { error: profileError } = await supabase
                .from('profiles')
                .upsert(profilePayload);
            
            if (profileError) {
                console.error("Profile creation failed:", profileError);
                // Don't throw here if we have a session, just warn. The trigger might have handled it essentially.
                // But better to alert so we know if manual sync failed.
            }

            // Optimistic update
            setUser({ ...profilePayload });
            return true;

        } catch (error) {
            console.error("Register Error:", error);
            alert("Gagal mendaftar: " + error.message);
            setIsLoading(false);
            return false;
        }
    };

    const updateProfile = async (updatedData) => {
        if (!user) return;
        try {
            // Map frontend keys to DB keys if needed
            const dbPayload = {
                id: user.id,
                nama: updatedData.nama,
                username: updatedData.username,
                telepon: updatedData.telepon,
                provinsi: updatedData.provinsi,
                kabupaten: updatedData.kabupaten,
                kecamatan: updatedData.kecamatan,
                jenis_tanaman: updatedData.tanaman || updatedData.jenisTanaman, // handle both casing
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('profiles')
                .update(dbPayload)
                .eq('id', user.id);

            if (error) throw error;

            // Update local state
            setUser(prev => ({ ...prev, ...updatedData }));
            await fetchProfile(user.id); // Refresh to be sure
            return true;
        } catch (err) {
            console.error("Update profile error:", err);
            alert("Gagal update profil: " + err.message);
            return false;
        }
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
            router.push('/welcome');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{
             user,
             isLoading,
             isAuthenticated: !!user,
             registerWithPassword,
             loginWithPassword,
             updateProfile,
             logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
