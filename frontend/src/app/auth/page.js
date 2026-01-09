"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, MapPin, Leaf, CheckCircle, ArrowRight, Sprout, Lock, Phone as PhoneIcon, Eye, EyeOff, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link"; 

export default function AuthPage() {
    const router = useRouter();
    const { registerWithPassword, loginWithPassword } = useAuth();
    const [authMode, setAuthMode] = useState('register'); // 'register' or 'login'
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        telepon: "",
        nama: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        jenisTanaman: ""
    });
    
    // Login State
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    // Dynamic Location Data
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    
    const [selectedProvId, setSelectedProvId] = useState("");
    const [selectedRegencyId, setSelectedRegencyId] = useState("");

    // Fetch Provinces on Load
    useEffect(() => {
        fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            .then(res => res.json())
            .then(data => setProvinces(data))
            .catch(err => console.error(err));
    }, []);

    // Fetch Regencies when Province changes
    useEffect(() => {
        if (selectedProvId) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvId}.json`)
                .then(res => res.json())
                .then(data => setRegencies(data))
                .catch(err => console.error(err));
        } else {
            setRegencies([]);
        }
    }, [selectedProvId]);

    // Fetch Districts when Regency changes
    useEffect(() => {
        if (selectedRegencyId) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegencyId}.json`)
                .then(res => res.json())
                .then(data => setDistricts(data))
                .catch(err => console.error(err));
        } else {
            setDistricts([]);
        }
    }, [selectedRegencyId]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const success = await registerWithPassword(formData);
        if (success) {
            router.push("/");
        } else {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const success = await loginWithPassword(loginData.email, loginData.password);
        if (success) {
            router.push("/");
        } else {
            setIsLoading(false);
        }
    };

    const isValidRegister = formData.email && formData.username && formData.password.length >= 6 && formData.telepon && formData.nama && formData.provinsi && formData.kabupaten && formData.kecamatan && formData.jenisTanaman;
    const isValidLogin = loginData.email && loginData.password;

    const TANAMAN_DATA = ["Padi", "Jagung", "Cabai", "Bawang Merah", "Sayuran", "Buah-buahan", "Palawija"];

    return (
        <div className="min-h-screen bg-green-50 flex flex-col justify-center p-6">
            <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                
                {/* Header */}
                <div className="p-8 pb-0 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600">
                        <Sprout size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {authMode === 'register' ? 'Mulai Bertani Cerdas' : 'Selamat Datang Kembali'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        {authMode === 'register' ? 'Buat akun untuk akses penuh fitur Petani Maju.' : 'Masuk dengan Email dan Password Anda.'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="px-8 mt-6">
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button 
                            onClick={() => setAuthMode('register')}
                            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${authMode === 'register' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}
                        >
                            Daftar Baru
                        </button>
                        <button 
                            onClick={() => setAuthMode('login')}
                            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${authMode === 'login' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}
                        >
                            Masuk
                        </button>
                    </div>
                </div>

                <div className="p-8 pt-6">
                    {authMode === 'register' ? (
                        /* REGISTER FORM */
                        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                            
                            {/* Account Credentials */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-3.5 text-green-600" />
                                    <input 
                                        required
                                        type="email"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 pl-10 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="contoh@email.com"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Username <span className="text-red-500">*</span></label>
                                <input 
                                    required
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                    placeholder="Buat username unik (tanpa spasi)"
                                    value={formData.username}
                                    onChange={e => setFormData({...formData, username: e.target.value.toLowerCase().replace(/\s/g, '')})}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input 
                                        required
                                        type={showPassword ? "text" : "password"}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="Minimal 6 karakter"
                                        value={formData.password}
                                        onChange={e => setFormData({...formData, password: e.target.value})}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">No. Telepon <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <PhoneIcon size={16} className="absolute left-3 top-3.5 text-green-600" />
                                    <input 
                                        required
                                        type="tel"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 pl-10 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="08xxxxxxxxxx"
                                        value={formData.telepon}
                                        onChange={e => setFormData({...formData, telepon: e.target.value})}
                                    />
                                </div>
                            </div>

                             <div className="border-t border-gray-100 my-2"></div>

                            {/* Personal Details */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                                <input 
                                    required
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                    placeholder="Nama panggilan anda"
                                    value={formData.nama}
                                    onChange={e => setFormData({...formData, nama: e.target.value})}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Jenis Tanaman</label>
                                <select 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                    value={formData.jenisTanaman}
                                    onChange={e => setFormData({...formData, jenisTanaman: e.target.value})}
                                >
                                    <option value="" disabled>Pilih Tanaman...</option>
                                    {TANAMAN_DATA.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Lokasi</label>
                                <div className="space-y-3">
                                    <SearchableSelect 
                                        label="Provinsi"
                                        placeholder="Cari provinsi..."
                                        data={provinces}
                                        value={formData.provinsi}
                                        onChange={(item) => {
                                            setFormData({ ...formData, provinsi: item.name, kabupaten: "", kecamatan: "" });
                                            setSelectedProvId(item.id);
                                            setSelectedRegencyId("");
                                        }}
                                    />
                                    <SearchableSelect 
                                        label="Kabupaten/Kota"
                                        placeholder={selectedProvId ? "Cari kabupaten..." : "Pilih provinsi dulu"}
                                        data={regencies}
                                        value={formData.kabupaten}
                                        disabled={!selectedProvId}
                                        onChange={(item) => {
                                            setFormData({ ...formData, kabupaten: item.name, kecamatan: "" });
                                            setSelectedRegencyId(item.id);
                                        }}
                                    />
                                    <SearchableSelect 
                                        label="Kecamatan"
                                        placeholder={selectedRegencyId ? "Cari kecamatan..." : "Pilih kabupaten dulu"}
                                        data={districts}
                                        value={formData.kecamatan}
                                        disabled={!selectedRegencyId}
                                        onChange={(item) => {
                                            setFormData({ ...formData, kecamatan: item.name });
                                        }}
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={!isValidRegister || isLoading}
                                className={`w-full py-4 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all mt-4 ${
                                    isValidRegister 
                                        ? 'bg-green-700 hover:bg-green-800 text-white shadow-green-200 active:scale-95' 
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                }`}
                            >
                                {isLoading ? 'Mendaftarkan...' : <>Buat Akun <CheckCircle size={18} /></>}
                            </button>
                        </form>
                    ) : (
                        /* LOGIN FORM */
                        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                            
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-3.5 text-green-600" />
                                    <input 
                                        required
                                        type="email"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 pl-10 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="Email anda"
                                        value={loginData.email}
                                        onChange={e => setLoginData({...loginData, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3 top-3.5 text-green-600" />
                                    <input 
                                        required
                                        type={showPassword ? "text" : "password"}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 pl-10 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="Password anda"
                                        value={loginData.password}
                                        onChange={e => setLoginData({...loginData, password: e.target.value})}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={!isValidLogin || isLoading}
                                className={`w-full py-4 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all mt-6 ${
                                    isValidLogin 
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 active:scale-95' 
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                }`}
                            >
                                {isLoading ? 'Masuk...' : <>Masuk <ArrowRight size={18} /></>}
                            </button>
                        </form>
                    )}
                </div>
                
                <div className="bg-gray-50 p-4 text-center">
                    <Link href="/welcome" className="text-sm text-gray-500 hover:text-green-700 font-medium">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Reuse SearchableSelect (No changes needed)
function SearchableSelect({ label, placeholder, data, value, onChange, disabled }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    
    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (!value) setSearch("");
    }, [value]);

    return (
        <div className="relative">
            <div 
                className={`w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm flex justify-between items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={value ? "text-gray-800" : "text-gray-400"}>
                    {value || placeholder}
                </span>
                <span className="text-gray-400">▼</span>
            </div>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-hidden flex flex-col">
                    <input 
                        autoFocus
                        type="text"
                        className="p-3 border-b text-sm outline-none"
                        placeholder="Ketik untuk mencari..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="overflow-y-auto flex-1">
                        {filteredData.length > 0 ? (
                            filteredData.map(item => (
                                <div 
                                    key={item.id}
                                    className="p-3 hover:bg-green-50 text-sm cursor-pointer border-b border-gray-50 last:border-0"
                                    onClick={() => {
                                        onChange(item);
                                        setIsOpen(false);
                                        setSearch("");
                                    }}
                                >
                                    {item.name}
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-sm text-gray-400 text-center">Tidak ditemukan</div>
                        )}
                    </div>
                </div>
            )}
            
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsOpen(false)}></div>
            )}
        </div>
    );
}
