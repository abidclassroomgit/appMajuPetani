"use client";
import { User, MapPin, Phone, Mail, Settings, LogOut, Home, Lightbulb, ChevronRight, Edit2, Save, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useProfil } from "@/hooks/useProfil";
import { useAuth } from "@/hooks/useAuth";
import BottomNav from "@/components/BottomNav";

export default function ProfilPage() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const { profil, updateProfil, isLoaded } = useProfil();
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nama: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        tanaman: ""
    });

    // Dummy Data for Dropdowns
    const PROVINSI_DATA = ["Jawa Barat", "Jawa Tengah", "Jawa Timur", "Banten", "DI Yogyakarta"];
    const KABUPATEN_DATA = ["Subang", "Bandung", "Garut", "Cirebon", "Indramayu", "Majalengka"];
    const KECAMATAN_DATA = ["Cisarua", "Pagaden", "Subang Kota", "Ciater", "Lembang"];
    const TANAMAN_DATA = ["Padi", "Jagung", "Cabai", "Bawang Merah", "Sayuran", "Buah-buahan"];

    useEffect(() => {
        if (isLoaded) {
            setFormData(profil);
            // If profile is empty (initial state), auto-open edit mode
            if (!profil.nama || profil.nama === "Petani Baru") {
                // Optional: setIsEditing(true); 
            }
        }
    }, [isLoaded, profil]);

    const handleSave = (e) => {
        e.preventDefault();
        updateProfil(formData);
        setIsEditing(false);
        alert("Profil berhasil disimpan!"); // Simple notification as requested
    };

    const handleCancel = () => {
        setFormData(profil);
        setIsEditing(false);
    };

    if (!isLoaded) return <div className="p-6 text-center">Memuat profil...</div>;

    const hasProfileData = profil.provinsi && profil.kabupaten;

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-green-700 text-white p-8 rounded-b-3xl mb-6 shadow-md relative">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 ring-4 ring-white/30">
                        <User size={48} />
                    </div>
                    {isEditing ? (
                        <h1 className="text-xl font-bold">Edit Profil</h1>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold">{profil.nama || "Nama Belum Diisi"}</h1>
                            <p className="text-white/80 text-sm">
                                {profil.tanaman ? `Petani ${profil.tanaman}` : "Jenis Tanaman Belum Diisi"} 
                                {profil.kabupaten ? ` • ${profil.kabupaten}` : ""}
                            </p>
                        </>
                    )}
                </div>
                
                {/* Edit Toggle Button (Only show in view mode) */}
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="absolute top-6 right-6 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                        <Edit2 size={20} />
                    </button>
                )}
            </div>

            <div className="px-6 space-y-6">
                
                {isEditing ? (
                    /* EDIT MODE: FORM */
                    <form onSubmit={handleSave} className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600">Nama Lengkap</label>
                            <input 
                                required
                                type="text"
                                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="Masukkan nama anda"
                                value={formData.nama}
                                onChange={e => setFormData({...formData, nama: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-600">Provinsi</label>
                                <select 
                                    required
                                    className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                    value={formData.provinsi}
                                    onChange={e => setFormData({...formData, provinsi: e.target.value})}
                                >
                                    <option value="">Pilih...</option>
                                    {PROVINSI_DATA.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-600">Kabupaten/Kota</label>
                                <select 
                                    required
                                    className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                    value={formData.kabupaten}
                                    onChange={e => setFormData({...formData, kabupaten: e.target.value})}
                                >
                                    <option value="">Pilih...</option>
                                    {KABUPATEN_DATA.map(k => <option key={k} value={k}>{k}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600">Kecamatan</label>
                            <select 
                                required
                                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                value={formData.kecamatan}
                                onChange={e => setFormData({...formData, kecamatan: e.target.value})}
                            >
                                <option value="">Pilih Kecamatan...</option>
                                {KECAMATAN_DATA.map(k => <option key={k} value={k}>{k}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600">Jenis Tanaman Utama</label>
                            <select 
                                required
                                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                value={formData.tanaman}
                                onChange={e => setFormData({...formData, tanaman: e.target.value})}
                            >
                                <option value="">Pilih Tanaman...</option>
                                {TANAMAN_DATA.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button 
                                type="button" 
                                onClick={handleCancel}
                                className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
                            >
                                <X size={18} /> Batal
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 py-3 bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-800 flex items-center justify-center gap-2"
                            >
                                <Save size={18} /> Simpan
                            </button>
                        </div>
                    </form>
                ) : (
                    /* VIEW MODE: INFO & MENU */
                    <>
                        {/* Info Card */}
                        <div className="bg-white rounded-xl p-4 space-y-4 shadow-sm">
                            <h2 className="font-bold text-gray-800 border-b pb-2">Informasi Lokasi</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin size={18} className="text-green-700 shrink-0" />
                                    <span className="text-gray-600">
                                        {hasProfileData 
                                            ? `Ds. (Input Desa), Kec. ${profil.kecamatan}, ${profil.kabupaten}, ${profil.provinsi}`
                                            : "Lokasi belum diatur"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone size={18} className="text-green-700 shrink-0" />
                                    <span className="text-gray-600">+62 812-3456-7890 (Dummy)</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail size={18} className="text-green-700 shrink-0" />
                                    <span className="text-gray-600">petani.maju@email.com (Dummy)</span>
                                </div>
                            </div>
                        </div>

                        {/* Menu */}
                        <div className="space-y-3">
                             <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                        <Settings size={20} className="text-green-700" />
                                    </div>
                                    <span className="font-medium text-gray-700">Pengaturan Akun</span>
                                </div>
                                <ChevronRight size={18} className="text-gray-300" />
                            </div>
                            <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                        <ChevronRight size={20} className="text-green-700" />
                                    </div>
                                    <span className="font-medium text-gray-700">Bantuan & Dukungan</span>
                                </div>
                                <ChevronRight size={18} className="text-gray-300" />
                            </div>
                            <div 
                                onClick={() => {
                                    if(confirm('Apakah Anda yakin ingin keluar?')) {
                                        logout();
                                    }
                                }}
                                className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm cursor-pointer hover:bg-red-50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200">
                                    <LogOut size={20} className="text-red-500" />
                                </div>
                                <span className="font-medium text-red-500">Keluar</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
