import { useState, useEffect } from 'react';

const INITIAL_PROFIL = {
    nama: "Petani Baru",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    tanaman: ""
};

export function useProfil() {
    const [profil, setProfil] = useState(INITIAL_PROFIL);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load data from localStorage on mount
        const savedProfil = localStorage.getItem('petaniMaju_profil');
        if (savedProfil) {
            try {
                setProfil(JSON.parse(savedProfil));
            } catch (e) {
                console.error("Failed to parse profile data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const updateProfil = (newProfil) => {
        setProfil(newProfil);
        localStorage.setItem('petaniMaju_profil', JSON.stringify(newProfil));
    };

    return { profil, updateProfil, isLoaded };
}
