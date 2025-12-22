"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sprout, ArrowRight, MapPin, User, Leaf, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function WelcomePage() {
    const router = useRouter();
    const { saveUserData } = useAuth();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        nama: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        jenisTanaman: ""
    });

    // Dummy Data
    const PROVINSI_DATA = ["Jawa Barat", "Jawa Tengah", "Jawa Timur", "Banten", "DI Yogyakarta", "Sumatera Utara", "Lampung", "Sulawesi Selatan"];
    const KABUPATEN_DATA = ["Subang", "Bandung", "Garut", "Cirebon", "Indramayu", "Majalengka", "Bogor", "Sukabumi"];
    const KECAMATAN_DATA = ["Cisarua", "Pagaden", "Subang Kota", "Ciater", "Lembang", "Jalan Cagak"];
    const TANAMAN_DATA = ["Padi", "Jagung", "Cabai", "Bawang Merah", "Sayuran", "Buah-buahan", "Palawija"];

    const handleNext = () => {
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate small delay for UX
        await new Promise(resolve => setTimeout(resolve, 800));

        const success = saveUserData(formData);
        if (success) {
            router.push("/");
        } else {
            alert("Gagal menyimpan data. Silakan coba lagi.");
            setIsLoading(false);
        }
    };

    const isValidStep2 = formData.nama && formData.provinsi && formData.kabupaten && formData.kecamatan && formData.jenisTanaman;

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-50/50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

            {/* STEP 1: WELCOME SCREEN */}
            {step === 1 && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-32 h-32 bg-green-100 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-green-100/50 relative">
                        <div className="absolute inset-0 bg-green-200/30 rounded-3xl rotate-6"></div>
                        <Sprout size={64} className="text-green-600 relative z-10" />
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
                        Selamat Datang di <br />
                        <span className="text-green-700">PetaniMaju</span>
                    </h1>
                    
                    <p className="text-gray-500 mb-12 text-lg leading-relaxed max-w-xs mx-auto">
                        Sahabat setia petani Indonesia. Dapatkan info cuaca dan tips pertanian terpercaya.
                    </p>

                    <button 
                        onClick={handleNext}
                        className="w-full max-w-xs bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 flex items-center justify-center gap-2 text-lg transition-transform active:scale-95"
                    >
                        Mulai Sekarang <ArrowRight size={20} />
                    </button>
                </div>
            )}

            {/* STEP 2: FORM DATA */}
            {step === 2 && (
                <div className="flex-1 flex flex-col p-6 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-8 pt-4">
                        <button onClick={() => setStep(1)} className="text-sm text-gray-400 mb-4 font-medium">← Kembali</button>
                        <h2 className="text-2xl font-bold text-gray-800">Kenalan Dulu, Yuk!</h2>
                        <p className="text-gray-500">Isi data diri agar kami bisa memberi info yang sesuai.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-5">
                        <div className="space-y-4 flex-1 overflow-y-auto pb-4 custom-scrollbar">
                            
                            {/* Nama */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User size={16} className="text-green-600" /> Nama Lengkap
                                </label>
                                <input 
                                    required
                                    type="text"
                                    className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-base focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                                    placeholder="Contoh: Pak Budi"
                                    value={formData.nama}
                                    onChange={e => setFormData({...formData, nama: e.target.value})}
                                />
                            </div>

                            {/* Jenis Tanaman */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Leaf size={16} className="text-green-600" /> Jenis Tanaman Utama
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {TANAMAN_DATA.slice(0, 4).map(t => ( // Show top 4 as buttons
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setFormData({...formData, jenisTanaman: t})}
                                            className={`p-3 rounded-xl text-sm font-medium border transition-all ${
                                                formData.jenisTanaman === t 
                                                    ? 'bg-green-100 border-green-500 text-green-800 ring-1 ring-green-500' 
                                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                {/* Dropdown for more options if needed, simplified for now to just the grid or select */}
                                <select 
                                    className={`w-full bg-white border rounded-xl p-3.5 text-base mt-2 ${formData.jenisTanaman && !TANAMAN_DATA.slice(0, 4).includes(formData.jenisTanaman) ? 'border-green-500 ring-1 ring-green-500 text-green-800' : 'border-gray-200 text-gray-500'}`}
                                    value={formData.jenisTanaman}
                                    onChange={e => setFormData({...formData, jenisTanaman: e.target.value})}
                                >
                                    <option value="" disabled>Lainnya...</option>
                                    {TANAMAN_DATA.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            {/* Lokasi */}
                            <div className="space-y-3 pt-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <MapPin size={16} className="text-green-600" /> Lokasi Lahan
                                </label>
                                <select 
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-base focus:border-green-500 outline-none"
                                    value={formData.provinsi}
                                    onChange={e => setFormData({...formData, provinsi: e.target.value})}
                                >
                                    <option value="">Pilih Provinsi...</option>
                                    {PROVINSI_DATA.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>

                                <div className="grid grid-cols-2 gap-3">
                                    <select 
                                        required
                                        className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-base focus:border-green-500 outline-none"
                                        value={formData.kabupaten}
                                        onChange={e => setFormData({...formData, kabupaten: e.target.value})}
                                        disabled={!formData.provinsi}
                                    >
                                        <option value="">Kabupaten...</option>
                                        {KABUPATEN_DATA.map(k => <option key={k} value={k}>{k}</option>)}
                                    </select>
                                    <select 
                                        required
                                        className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-base focus:border-green-500 outline-none"
                                        value={formData.kecamatan}
                                        onChange={e => setFormData({...formData, kecamatan: e.target.value})}
                                        disabled={!formData.kabupaten}
                                    >
                                        <option value="">Kecamatan...</option>
                                        {KECAMATAN_DATA.map(k => <option key={k} value={k}>{k}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 pb-4 bg-white/80 backdrop-blur-sm sticky bottom-0">
                            <button 
                                type="submit"
                                disabled={!isValidStep2 || isLoading}
                                className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${
                                    isValidStep2 
                                        ? 'bg-green-700 hover:bg-green-800 text-white shadow-green-200 active:scale-95' 
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                }`}
                            >
                                {isLoading ? (
                                    <>Menyimpan...</>
                                ) : (
                                    <>Simpan & Lanjutkan <CheckCircle size={20} /></>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
